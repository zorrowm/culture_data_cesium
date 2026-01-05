<!-- 坐标定位 -->
<template>
    <XWindow :isDark="true" top="46px" left="73px" nWidth="455px" nHeight="356px" title="坐标拾取"
        pid="LocationWidget" @loaded="loadedHandle" @close="doClosePanel">
        <div class="q-pa-sm panelCls">
            <div class="q-pb-md titleTypeCls row">
                <div class="col-4" v-for="(item, index) in types" :key="index">
                    <q-radio v-model="type" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :label="item.label"
                        :val="index" dense @update:model-value="changeCoorType()" />
                </div>
            </div>
            <div class="contentCls row justify-center items-center q-col-gutter-sm">
                <template v-if="type == 0">
                    <div class="col-3">
                        经度:
                    </div>
                    <div class="col-9">
                        <q-input outlined v-model.number="dataModel.x" dense @update:model-value="changeValue()" />
                    </div>
                    <div class="col-3">
                        纬度:
                    </div>
                    <div class="col-9">
                        <q-input outlined v-model.number="dataModel.y" dense @update:model-value="changeValue()" />
                    </div>
                    <div class="col-3">
                        高程:
                    </div>
                    <div class="col-9">
                        <q-input outlined v-model.number="dataModel.height" dense @update:model-value="changeValue()" />
                    </div>
                </template>
                <template v-else-if="type == 1">
                    <div class="col-3">
                        经度:
                    </div>
                    <div class="col-9 row justify-between">
                        <q-input class="inputCls" outlined v-model.number="dataModel.xdeg" dense
                            @update:model-value="changeValue()">
                            <template v-slot:append>
                                <span>度</span>
                            </template>
                        </q-input>
                        <q-input class="inputCls" outlined v-model.number="dataModel.xmin" dense
                            @update:model-value="changeValue()">
                            <template v-slot:append>
                                <span>分</span>
                            </template>
                        </q-input>
                        <q-input class="inputCls" outlined v-model.number="dataModel.xsec" dense
                            @update:model-value="changeValue()">
                            <template v-slot:append>
                                <span>秒</span>
                            </template>
                        </q-input>
                    </div>
                    <div class="col-3">
                        纬度:
                    </div>
                    <div class="col-9 row justify-between">
                        <q-input class="inputCls" outlined v-model.number="dataModel.ydeg" dense
                            @update:model-value="changeValue()">
                            <template v-slot:append>
                                <span>度</span>
                            </template>
                        </q-input>
                        <q-input class="inputCls" outlined v-model.number="dataModel.ymin" dense
                            @update:model-value="changeValue()">
                            <template v-slot:append>
                                <span>分</span>
                            </template>
                        </q-input>
                        <q-input class="inputCls" outlined v-model.number="dataModel.ysec" dense
                            @update:model-value="changeValue()">
                            <template v-slot:append>
                                <span>秒</span>
                            </template>
                        </q-input>
                    </div>
                    <div class="col-3">
                        高程:
                    </div>
                    <div class="col-9">
                        <q-input outlined v-model.number="dataModel.height" dense @update:model-value="changeValue()" />
                    </div>
                </template>
                <template v-else-if="type == 2">
                    <!-- <div class="col-3">
                        分带:
                    </div>
                    <div class="col-9 row justify-between">
                        <div class="col-4" v-for="(item, index) in zoneTypes" :key="index">
                            <q-radio v-model="dataModel.zoneType" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                                :label="item.label" :val="index" dense />
                        </div>
                    </div> -->
                    <div class="col-3">
                        纵坐标:
                    </div>
                    <div class="col-9 ">
                        <q-input outlined v-model.number="dataModel.zonex" dense @update:model-value="changeValue()" />
                    </div>
                    <div class="col-3">
                        横坐标:
                    </div>
                    <div class="col-9 ">
                        <q-input outlined v-model.number="dataModel.zoney" dense @update:model-value="changeValue()" />
                    </div>
                    <div class="col-3">
                        高度值:
                    </div>
                    <div class="col-9 ">
                        <q-input outlined v-model.number="dataModel.height" dense />
                    </div>
                </template>
            </div>
            <div class="footerCls q-pt-md row justify-between">
                <q-btn class="btnCls" color="primary" label="图上拾取" @click="ClickPoint()" />
                <q-btn class="btnCls" color="primary" label="坐标定位" @click="ZoomTo()" />
            </div>
        </div>
    </XWindow>
</template>
 
<script lang="ts" setup>
import proj4 from "proj4";
import { EmitMsg } from 'src/events';
import WidgetsEvent from 'src/events/modules/WidgetsEvent';
import { onMounted, onUnmounted,ref } from 'vue';
import { Global, XWindow, XWindowManager } from 'xframelib';
import {Cesium} from 'xgis-cesium';

//#region 窗体操作
let widgetID = 'LocationWidget';
let windowID = '';
let viewer: Cesium.Viewer;

function loadedHandle(panelData) {
    windowID = panelData.id;
}

function doClosePanel(panelData) {
    widgetID = panelData.pid;
    if (panelData.pid) {
        EmitMsg(WidgetsEvent.WidgetClosed, widgetID);
    }
}

/**
 * 对外暴露接口
 */
const isShow = ref(true);
function changeVisible(isVisible: boolean = false) {
    isShow.value = isVisible;
    if (windowID && isVisible) XWindowManager.openWindowPanel(windowID);
}
defineExpose({ changeVisible, isShow });
//#endregion

const types = ref([
    {
        label: '十进制',
        status: true
    },
    {
        label: '度分秒',
        status: false
    },
    {
        label: '平面坐标',
        status: false
    }
]);

const zoneTypes = ref([
    {
        label: '三度带',
        status: true
    },
    {
        label: '六度带',
        status: false
    }
]);
const type = ref(0);
//数据模型
const dataModel = ref({
    x: 0,
    y: 0,

    xdeg: 0,
    xmin: 0,
    xsec: 0,
    ydeg: 0,
    ymin: 0,
    ysec: 0,

    zoneType: 0,
    zonex: 0,
    zoney: 0,

    height: 0
})

let pointEntity;
// 初始化获取当前中心点的经纬度坐标
function getCurrentCenter(viewer: Cesium.Viewer) {
    const camera = viewer.camera;
    const ellipsoid = viewer.scene.globe.ellipsoid;
    const position = camera.position;
    const direction = camera.direction;

    let cartesian3Center = new Cesium.Cartesian3();
    cartesian3Center = Cesium.Cartesian3.add(position, direction, cartesian3Center);

    const cartographicCenter = ellipsoid.cartesianToCartographic(cartesian3Center);
    dataModel.value.x = Cesium.Math.toDegrees(cartographicCenter.longitude);
    dataModel.value.y = Cesium.Math.toDegrees(cartographicCenter.latitude);
    dataModel.value.height = 200;
    CreateUpdatePointEntity();
}

//类型变换
function changeCoorType() {
    if (type.value == 1) {
        convertDegMinSec();
    } else if (type.value == 2) {
        convertZone();
    }
}

//值变化
function changeValue() {
    switch (type.value) {
        case 0:
            CreateUpdatePointEntity();
            break;
        case 1:
            convertDegMinSec(true);
            CreateUpdatePointEntity();
            break;
        case 2:
            convertZone(true);
            CreateUpdatePointEntity();
            break;
        default:
            break;
    }
}

//经纬度转换度分秒
function convertDegMinSec(isreplac = false) {
    if (!isreplac) {
        dataModel.value.xdeg = Math.floor(dataModel.value.x);
        dataModel.value.xmin = Math.floor((dataModel.value.x - dataModel.value.xdeg) * 60);
        dataModel.value.xsec = Math.floor(((dataModel.value.x - dataModel.value.xdeg) * 60 - dataModel.value.xmin) * 60);

        dataModel.value.ydeg = Math.floor(dataModel.value.y);
        dataModel.value.ymin = Math.floor((dataModel.value.y - dataModel.value.ydeg) * 60);
        dataModel.value.ysec = Math.floor(((dataModel.value.y - dataModel.value.ydeg) * 60 - dataModel.value.ymin) * 60);
    } else {
        dataModel.value.x = dataModel.value.xdeg + dataModel.value.xmin / 60 + dataModel.value.xsec / 3600;
        dataModel.value.y = dataModel.value.ydeg + dataModel.value.ymin / 60 + dataModel.value.ysec / 3600;
    }
}

//分带转换  -> 转成墨卡托
function convertZone(isreplac = false) {
    if (!isreplac) {
        const point = proj4('EPSG:4326', 'EPSG:3857', [dataModel.value.x, dataModel.value.y]);
        if (point) {
            dataModel.value.zonex = point[0];
            dataModel.value.zoney = point[1];
        }
    } else {
        const point = proj4('EPSG:3857', 'EPSG:4326', [dataModel.value.zonex, dataModel.value.zoney]);
        if (point) {
            dataModel.value.x = point[0];
            dataModel.value.y = point[1];
        }
    }
}

//创建或更新点位标记
function CreateUpdatePointEntity() {
    if (!pointEntity) {
        pointEntity = viewer.entities.add({
            name: "localDemo",
            position: Cesium.Cartesian3.fromDegrees(dataModel.value.x, dataModel.value.y, dataModel.value.height),
            point: {
                pixelSize: 10,
                color: Cesium.Color.BLUE,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2,
            },
        });
    } else {
        pointEntity.position = Cesium.Cartesian3.fromDegrees(dataModel.value.x, dataModel.value.y, dataModel.value.height);
    }
}
//点位定位
async function ZoomTo() {
    if (pointEntity) {
        viewer.zoomTo(pointEntity);
    }
}
let handler: Cesium.ScreenSpaceEventHandler | undefined;
//地图点击事件
function ClickPoint() {
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    //let cesiumContainer = document.getElementById('cesiumContainer');
    // console.log(`cesiumContainer`,cesiumContainer);
    // if (cesiumContainer) {
    //     cesiumContainer.style.cursor = 'pointer'
    // }

    handler.setInputAction(function (evt) {

        const cartesian = viewer.scene.pickPosition(evt.position);
        if (Cesium.defined(cartesian)) {
            const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            dataModel.value.x = Cesium.Math.toDegrees(cartographic.longitude);
            dataModel.value.y = Cesium.Math.toDegrees(cartographic.latitude);

            const height = cartographic.height;
            if (height > 0) {
                dataModel.value.height = Math.floor(height * 100) / 100
            } else {
                dataModel.value.height = 0;
            }
            if (type.value == 1) {
                convertDegMinSec();
            } else if (type.value == 2) {
                convertZone();
            }
            CreateUpdatePointEntity();
            if (handler) {
                handler.destroy();
                handler = undefined;
            }
            // if (cesiumContainer) {
            //     cesiumContainer.style.cursor = 'default'
            // }
        }

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

onMounted(() => {
    //加载时处理
    if (Global.CesiumViewer) {
        viewer = Global.CesiumViewer;
        getCurrentCenter(viewer);
    } else {
        Global.Message.info("未获取到地图")
    }
})
onUnmounted(() => {
    //卸载时处理
    if (handler) {
        handler.destroy();
        handler = undefined;
    }
    if (pointEntity) {
        viewer.entities.remove(pointEntity)
    }
})
</script>
<style lang="scss" scoped>
.panelCls {

    color: white;
    font-size: 14px;

    .contentCls {}

    .btnCls {
        width: 48%;
        min-height: 0;
    }

    .inputCls {
        width: 30%;
    }

    :deep(.q-field--dense .q-field__control) {
        height: 30px;
        background-color: rgb(40, 40, 40);
        // color: white;
    }

    :deep(.q-field--dense .q-field__marginal) {
        height: 30px;
        font-size: 14px;
        color: white;
    }

    :deep(.q-field__native) {
        color: white;
    }
}
</style>