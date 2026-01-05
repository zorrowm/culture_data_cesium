<template>
  <div class="row q-gutter-sm container">
    <div class="base-item" :class="isOpen ? 'active' : ''" v-tooltip.top="'地形'" @click="toggleTerrain">
      <img src="/img/terrain.png" alt="" />
    </div>
    <div class="base-item" v-tooltip.top="'影像'" :class="baseLayer === 'IMG' ? 'active' : ''" @click="toggleBaseLayer('IMG')">
      <img src="/img/GD_IMG.png" alt="" />
    </div>
    <div class="base-item" v-tooltip.top="'矢量'" :class="baseLayer === 'VEC' ? 'active' : ''" @click="toggleBaseLayer('VEC')">
      <img src="/img/GD_VEC.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { OffEventHandler, OnEventHandler } from 'src/events/index';
import SystemsEvent from 'src/events/modules/SystemsEvent';
import { onMounted, onUnmounted, ref } from 'vue';
import { Global } from 'xframelib';
import { Cesium, XViewer } from 'xgis-cesium';

const isOpen = ref(false);
async function toggleTerrain() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    const terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(Global.Config.TerrainUrl, {
      requestWaterMask: false,
      requestVertexNormals: true,
    });

    viewer.terrainProvider = terrainProvider;
  } else viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
}

const baseLayer = ref('IMG');

function toggleBaseLayer(layer) {
  baseLayer.value = layer;
  //清理图层
  viewer.clearBasicLayer();
  switch (layer) {
    case 'IMG':
      if (Global.Config.BaseImageUrl) {
        viewer.addBaseLayer(GetImageryProviderByUrl(Global.Config.BaseImageUrl));
        return;
      }
      viewer.setBasicLayer('GD_IMG');
      break;
    case 'VEC':
      if (Global.Config.BaseVectorUrl) {
        viewer.addBaseLayer(GetImageryProviderByUrl(Global.Config.BaseImageUrl));
        return;
      }
      viewer.setBasicLayer('GD_VEC');
      break;
    default:
      break;
  }
}

function GetImageryProviderByUrl(url) {
  const promise = new Promise<Cesium.UrlTemplateImageryProvider>((resolve, reject) => {
    const xyzProvider = new Cesium.UrlTemplateImageryProvider({
      url:url,
      maximumLevel: 18,
    });
    resolve(xyzProvider);
  });
  return promise;
}

function InitData() {
  viewer = Global.CesiumViewer as XViewer;
  toggleBaseLayer('IMG');
  setTimeout(() => {
    toggleTerrain();
  }, 1000);
}

let viewer: XViewer;
onMounted(async () => {
  if (Global.CesiumViewer) {
    InitData();
  } else {
    // Global.Message.info('未获取到地图');
    OnEventHandler(SystemsEvent.CesiumWidgetLoaded, InitData);
  }
});

onUnmounted(() => {
  OffEventHandler(SystemsEvent.CesiumWidgetLoaded, InitData);
});
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 9;

  .base-item {
    width: 50px;
    height: 50px;
    background-color: #fff;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .active {
    border: 2px solid #ffce46;
  }
}
</style>
