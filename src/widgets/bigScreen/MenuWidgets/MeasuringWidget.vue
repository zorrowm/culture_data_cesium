<template>
  <XWindow
    v-show="isShow"
    :isDark="true"
    left="73px"
    top="46px"
    nWidth="320px"
    nHeight="300px"
    title="图上量算"
    icon=""
    :pid="pidRef"
    @loaded="loadedHandle"
    @close="doClosePanel"
  >
    <template #title>
      <span class="paneltitle">图上量算</span>
      <div class="toolbar">
        <span title="清空" @click="deactivate">
          <Icon icon="ant-design:clear-outlined" />
        </span>
      </div>
    </template>
    <q-scroll-area style="height: 100%">
      <div class="row q-mt-md">
        <div class="col-3 q-mb-sm" v-for="(item, index) in measurementOptions" :key="index">
          <q-card flat class="cardContent column items-center" @click="selectItem(item)">
            
            <div :class="getSelectedStyle(item)" >
              <Icon :icon="item.icon" class="measureIconStyle"/>
            </div>
            <div class="text-center textContent">
              {{ item.label }}
            </div>
          </q-card>
        </div>
      </div>
    </q-scroll-area>
  </XWindow>
</template>

<script lang="ts" setup>
import { EmitMsg } from 'src/events';
import WidgetsEvent from 'src/events/modules/WidgetsEvent';
import { getCurrentInstance,onMounted, onUnmounted, ref } from 'vue';
import { Global, XWindow, XWindowManager } from 'xframelib';
import type { XViewer } from 'xgis-cesium';
import { Measure } from 'xgis-cesium';

const measurementOptions = [
  {
    id: 'calcDistance',
    label: '空间测距',
    icon: 'ph:ruler-thin'
  },
  {
    id: 'calcArea',
    label: '空间面积',
    icon: '33862:chicun'
  },
  {
    id: 'calcAngle',
    label: '角度',
    icon: 'carbon:angle'
  },
  {
    id: 'calcHeight',
    label: '高度',
    icon: '33862:gaodu'
  },
  {
    id: 'distanceSurface',
    label: '贴地测距',
    icon: 'tabler:ruler-measure'
  },
  {
    id: 'areaSurface',
    label: '贴地面积',
    icon: 'demo:105-duomian'
  },
  {
    id: 'calcModelAngle',
    label: '贴物角度',
    icon: 'iconoir:angle-tool'
  },
  {
    id: 'calcModelHeight',
    label: '贴物高度',
    icon: 'ant-design:column-height-outlined'
  },
  {
    id: 'calcModelTriangleHeight',
    label: '贴物三角',
    icon: 'whh:triangle'
  }
];

const currentId = ref()
function selectItem(item) {
  currentId.value = item.id
  if (!measure) return;
  switch (item.id) {
    case 'calcDistance':
      calcDistance();
      break;
    case 'calcArea':
      calcArea();
      break;
    case 'calcAngle':
      calcAngle();
      break;
    case 'calcHeight':
      calcHeight();
      break;
    case 'distanceSurface':
      distanceSurface();
      break;
    case 'areaSurface':
      areaSurface();
      break;
    case 'calcModelAngle':
      calcModelAngle();
      break;
    case 'calcModelHeight':
      calcModelHeight();
      break;
    case 'calcModelTriangleHeight':
      calcModelTriangleHeight();
      break;
  }
}

/**
 * 空间测距
 */
function calcDistance() {
  // 深度检测
  viewer.scene.globe.depthTestAgainstTerrain = false;
  measure.distance({ disableDepthTestDistance: Number.POSITIVE_INFINITY });
}

/**
 * 空间面积
 */
function calcArea() {
  // 深度检测
  viewer.scene.globe.depthTestAgainstTerrain = false;
  measure.area();
}

/**
 * 角度
 */
function calcAngle() {
  measure.angle();
}

/**
 * 高度
 */
function calcHeight() {
  measure.height();
}

/**
 * 贴地测距
 */
function distanceSurface() {
  // 深度检测
  viewer.scene.globe.depthTestAgainstTerrain = true;
  measure.distanceSurface({ disableDepthTestDistance: Number.POSITIVE_INFINITY });
}

/**
 * 贴地面积
 */
function areaSurface() {
  // 深度检测
  viewer.scene.globe.depthTestAgainstTerrain = true;
  measure.areaSurface({ disableDepthTestDistance: Number.POSITIVE_INFINITY });
}

/**
 * 贴物角度
 */
function calcModelAngle() {
  measure.angle({
    clampToModel: true
  });
}

/**
 * 贴物高度
 */
function calcModelHeight() {
  measure.height({
    clampToModel: true
  });
}

/**
 * 贴物三角
 */
function calcModelTriangleHeight() {
  measure.triangleHeight({
    clampToModel: true
  });
}

function deactivate() {
  currentId.value = null
  measure.deactivate();
}

const instance = getCurrentInstance();
const wid = instance?.proxy?.$options.id;
const layoutid = instance?.proxy?.$options.layoutID;
const pidRef = ref(wid);
let widgetID;
let windowID;
function loadedHandle(panelData) {
  windowID = panelData.id;
}
function doClosePanel(panelData) {
  widgetID = panelData.pid;
  if (panelData.pid) {
    // EmitMsg(WidgetsEvent.WidgetClosed, widgetID);
    const currentLayoutManager = Global.LayoutMap.get(layoutid);
    if (currentLayoutManager) {
      currentLayoutManager.unloadWidget(widgetID);
    }
  }
}

function getSelectedStyle(item) {
  if (currentId.value && item.id === currentId.value) return 'iconLine iconLine-Active';
  else return 'iconLine';
}

let measure: Measure;
let viewer: XViewer;
onMounted(() => {
  //加载时处理
  if (Global.CesiumViewer) {
    viewer = Global.CesiumViewer as XViewer;
    // 深度检测
    viewer.scene.globe.depthTestAgainstTerrain = false;
    measure = new Measure(viewer);
  }
});

onUnmounted(() => {
  if (measure) {
    // 深度检测
    viewer.scene.globe.depthTestAgainstTerrain = true;
    deactivate();
  }
});

/**
 * 对外暴露接口
 */
const isShow = ref(true);
function changeVisible(isVisible: boolean = false) {
  isShow.value = isVisible;
  if (windowID && isVisible) XWindowManager.openWindowPanel(windowID);
}
defineExpose({ changeVisible, isShow });
</script>

<style lang="scss" scoped>
.toolbar {
  position: absolute;
  top: 0;
  right: 80px;

  span > svg:hover {
    border: #1b9de8 2px solid;
    cursor: pointer;
  }
}
.cardContent {

  color: white;
  font-size: 12px;
  cursor: pointer;

  .iconLine
  {
  
    width:60px;
    height:40px;
    @include flex;
    &:hover {
      // color: #1b9de8;
      border: 1px solid #76c4f1;
    }
  }
  .measureIconStyle
  {
    width:25px;
    height:25px;
  }

  .textContent {
    width: 60px;
    padding: 3px 0 4px 0;
    border-top-style: none !important;
    margin-bottom: 6px;
  }
}

</style>
