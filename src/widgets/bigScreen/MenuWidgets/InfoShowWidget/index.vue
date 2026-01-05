<template>
  <div></div>
</template>
<script setup lang="ts">
import { EmitMsg } from "src/events";
import { OffEventHandler, OnEventHandler } from "src/events";
import SystemsEvent from "src/events/modules/SystemsEvent";
import WidgetsEvent from "src/events/modules/WidgetsEvent";
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { getLocalToken, Global, XWindow, XWindowManager } from "xframelib";
import { Cesium, XViewer } from "xgis-cesium";

import { airportStore } from "@/stores/index";
const airportState = airportStore();

import { color } from "echarts";

import { Popup } from "./popup.js";

let viewer: XViewer;
let eventOn: boolean = false;
let popup;
let pointEntity;

const dataModel = reactive({
  name: "",
  x: 0,
  y: 0,
  height: 0,
});
const urlModel = ref("");

const layers = {
  szzsyx: "数字正射影像",
  dkky: "低空空域",
  dkhx: "低空航线",
  sfky: "无人机适飞空域",
  hlhx: "航路航线",
  dhss: "导航设施",
  qygzq: "区域管制区",
  xzq: "限制区、危险区、禁区、防空识别区",
  tyjc: "通用机场",
  tyjcky: "通用机场空域",
  myysjc: "民用运输机场",
  zaw: "障碍物",
  thjcss: "通航基础设施",
  fxqbq: "飞行情报区",
  zdgzq: "终端管制区和进近管制区",
};

// 定义点击事件监听器
let handler;
const origin = {
  color: "",
  scale: "",
  id: "",
  class: "",
  type: "",
};
function addClickEventListener() {
  handler = Global.CesiumViewer.screenSpaceEventHandler.setInputAction(
    function (movement) {
      const pick = viewer.scene.pick(movement.position);
      if (pick?.id) {
        const properDetailsValue = pick.id.properties;
        if (!properDetailsValue) return;
        const header = layers[properDetailsValue.id];
        const cartesian2 = movement.position;
        const cartesian3 = viewer.scene.pickPosition(cartesian2);
        console.log(`pick: `, pick);
        if (header) {
          setTimeout(() => {
            if (Cesium.defined(pick) && pick.id instanceof Cesium.Entity) {
              popup.closeAll();

              let popupContent = "";

              const propertyNames = properDetailsValue._propertyNames;
              propertyNames.forEach((item) => {
                if (
                  item != "id" &&
                  item != "OBJECTID" &&
                  item != "ID" &&
                  item != "SHAPE_Length" &&
                  item != "SHAPE_Area"
                )
                  popupContent =
                    popupContent +
                    `<div><sapn>${item}</sapn>:<span>${properDetailsValue[item]._value}</span></div>`;
              });

              popup.add({
                geometry: cartesian3,
                content: {
                  header,
                  content: popupContent,
                },
                isclose: true,
              });
            }
          }, 50);

          // 高亮选中实体
          // 取消前一个实体高亮
          if (origin.id) {
            const dataSource = viewer.dataSources.getByName(origin.class)[0];
            const lastEntity = dataSource.entities.getById(origin.id);
            const originColor = new Cesium.Color(
              origin.color.red,
              origin.color.green,
              origin.color.blue,
              origin.color.alpha,
            );
            switch (origin.type) {
              case "polygon":
                lastEntity.polygon.material = originColor;
                break;
              case "polyline":
                lastEntity.polyline.material = originColor;
                break;
              case "point":
                lastEntity.point.color = originColor;
                break;
              case "billboard":
                lastEntity.billboard.scale = origin.scale;
                break;
              default:
                break;
            }
          }
          // 高亮当前选中实体
          switch (properDetailsValue.id._value) {
            case "dkky":
            case "sfky":
            case "tyjcky":
            case "zdgzq":
            // case "hlhx":
            // case "qygzq":
            // case "xzq":
            // case "fxqbq":
              origin.color = pick.id.polygon.material.color._value;
              origin.id = pick.id.id;
              origin.class = properDetailsValue.id._value;
              origin.type = "polygon";
              pick.id.polygon.material = Cesium.Color.CYAN.withAlpha(0.4);
              break;

            case "dkhx":
            case "qygzq":
            case "xzq":
            case "fxqbq":
            case "hlhx":
              origin.color = pick.id.polyline.material.color._value;
              origin.id = pick.id.id;
              origin.class = properDetailsValue.id._value;
              origin.type = "polyline";
              pick.id.polyline.material = Cesium.Color.CYAN;
              break;

            // case 'dhss':
            // case 'thjcss':
            //   origin.color = pick.id.point.color._value;
            //   origin.id = pick.id.id;
            //   origin.class = properDetailsValue.id._value;
            //   origin.type = 'point';
            //   pick.id.point.color = Cesium.Color.CYAN;
            //   break;

            case "dhss":
            case "thjcss":
            case "tyjc":
            case "myysjc":
              origin.scale = pick.id.billboard.scale._value;
              origin.id = pick.id.id;
              origin.class = properDetailsValue.id._value;
              origin.type = "billboard";
              pick.id.billboard.scale = 0.2;
              break;

            case "zaw":
              break;
            default:
              break;
          }
        }

        // 通用机场、民用机场信息页加载
        if (
          properDetailsValue.id._value === "tyjc" ||
          properDetailsValue.id._value === "myysjc"
        ) {
          airportState.name = properDetailsValue["名称"]._value;
          Global.LayoutManager?.loadWidget("AirportInfoPanelWidget");
        }
      } else {
        // 点击空白处取消前一个实体高亮
        if (origin.id) {
          const dataSource = viewer.dataSources.getByName(origin.class)[0];
          const lastEntity = dataSource.entities.getById(origin.id);
          const originColor = new Cesium.Color(
            origin.color.red,
            origin.color.green,
            origin.color.blue,
            origin.color.alpha,
          );
          switch (origin.type) {
            case "polygon":
              lastEntity.polygon.material = originColor;
              break;
            case "polyline":
              lastEntity.polyline.material = originColor;
              break;
            case "point":
              lastEntity.point.color = originColor;
              break;
            case "billboard":
              lastEntity.billboard.scale = origin.scale;
              break;
            default:
              break;
          }
        }
      }
    },
    Cesium.ScreenSpaceEventType.LEFT_CLICK,
  );
}

function initHandler() {
  popup = new Popup({
    viewer: viewer,
    className: "bx-popup-ctn2",
  });

  // 添加点击事件监听器
  addClickEventListener();
  if (eventOn) {
    eventOn = false;
    OffEventHandler(SystemsEvent.CesiumWidgetLoaded, initHandler);
  }
}

function removeHandler() {
  viewer.screenSpaceEventHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_CLICK,
    handler,
  );
}

onMounted(() => {
  if (Global.CesiumViewer) {
    viewer = Global.CesiumViewer;
    // 开启帧率
    viewer.scene.debugShowFramesPerSecond = true;

    initHandler();
  } else {
    eventOn = true;
    OnEventHandler(SystemsEvent.CesiumWidgetLoaded, initHandler);
  }
  OnEventHandler(SystemsEvent.Init_Default_Handler, initHandler);
  OnEventHandler(SystemsEvent.Remove_Default_Handler, removeHandler);
});

onUnmounted(() => {
  if (Global.CesiumViewer) {
    // Global.CesiumViewer.entities.removeAll();
    popup.closeAll();
    OffEventHandler(SystemsEvent.Init_Default_Handler, initHandler);
    OffEventHandler(SystemsEvent.Remove_Default_Handler, removeHandler);
  }
});
</script>

<style lang="scss" scoped>
.toolbar {
  display: inline-flex;
  width: 60px;
  margin-left: 50px;

  span > svg:hover {
    border: #1b9de8 2px solid;
  }
}

.point-list-panel {
  padding: 10px 15px;
  color: #fff;
  font-size: 14px;
  .list-title {
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: bold;
    color: #7ee6fa;
  }
  .point-item {
    display: flex;
    justify-content: space-between;
    line-height: 28px;
    .item-text:hover {
      color: yellow;
    }
    .btn-group {
      margin-left: 20px;
      .q-icon {
        margin-left: 4px;
        cursor: pointer;
      }
    }
  }
  .q-icon {
    margin-left: 4px;
    cursor: pointer;
  }

  .top-group {
    margin-top: -35px;
  }

  .content-main {
    padding-top: 5px;
  }
  .content-item {
    margin-top: 10px;
    display: flex;
  }
  .item-label {
    width: 50px;
  }
  .item-content {
    width: calc(100% - 50px);
  }
  .position-panel {
    border: 1px dashed #ccc;
    border-radius: 4px;
    padding: 0 10px 10px;
  }

  .btnCls {
    width: 48%;
    height: 28px;
    min-height: 28px;
    margin-top: -15px;
    padding: 0 10px;
  }
}
</style>

<style lang="scss">
.point-list-panel {
  .q-field--dense .q-field__control,
  .q-field--dense .q-field__marginal {
    height: 30px;
  }
  .q-field--auto-height.q-field--dense .q-field__control,
  .q-field--auto-height.q-field--dense .q-field__native {
    min-height: 30px;
  }
}

.bx-popup-ctn2 {
  position: absolute;
  z-index: 999;
  color: #fff;
  /* margin: -80px 0 0; */
  margin: 0 0 0 0;
  transform: translate(-50%, -100%);
}

.bx-popup-ctn2 .divpoint-wrap {
  padding: 0;
  width: max-content;
}

.bx-popup-ctn2 .divpoint-center {
  background: linear-gradient(
    45deg,
    #4f869d,
    rgba(18, 93, 120, 0.65),
    40%,
    rgba(30, 127, 162, 0.65)
  );
  border: 1px solid #40aee2;
  border-radius: 5px;
  box-shadow: 0 0 10px 2px #29baf1;
}

.bx-popup-ctn2 .bx-popup-tip {
  width: 17px;
  background: #fff;
  height: 17px;
  padding: 1px;
  margin: -10px auto 0;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.bx-popup-ctn2 .bx-popup-header-ctn {
  background: rgba(0, 173, 255, 0.49);
  color: #fff;
  font-size: 15px;
  padding: 4px;
}

.bx-popup-ctn2 .bx-popup-close {
  position: absolute;
  top: 4px;
  right: 2px;
  width: 26px;
  height: 26px;
  cursor: pointer;
}

.bx-popup-ctn2 .bx-popup-content-ctn {
  padding: 10px;
}

.bx-popup-ctn2 .directional {
  bottom: 0;
  left: 0;
  width: 2px;
  height: 40px;
  background-color: #28bbf0;
  transform: none;
  margin: 0 0 0px 50%;
}

.bx-popup-ctn2 .divpoint-border {
  transition: 0.3s ease-in;
  background:
    linear-gradient(0, #8cdee5 2px, #8cdee5 0) no-repeat,
    linear-gradient(-90deg, #8cdee5 2px, #8cdee5 0) no-repeat,
    linear-gradient(-180deg, #8cdee5 2px, #8cdee5 0) no-repeat,
    linear-gradient(-270deg, #8cdee5 2px, #8cdee5 0) no-repeat;
  background-size:
    0 2px,
    2px 0,
    0 2px,
    2px 0;
  background-position:
    0 0,
    100% 0,
    100% 100%,
    0 100%;
}

.bx-popup-ctn2 .divpoint-border:hover {
  background-size:
    100% 2px,
    2px 100%,
    100% 2px,
    2px 100%;
}
</style>

<style lang="scss">
.point-list-panel {
  .text-primary {
    color: #fff !important;
  }
}
</style>
