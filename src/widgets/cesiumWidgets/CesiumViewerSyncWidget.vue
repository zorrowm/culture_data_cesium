<template>
  <div id="cesiumContainer2" class="xgisViewerContainer"></div>
</template>
<script lang="ts">
//xgis-cesium样式
import 'xgis-cesium/dist/index.css';

import { EmitMsg } from 'src/events/index';
import SystemsEvent from 'src/events/modules/SystemsEvent';
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { Global } from 'xframelib';
import { Cesium, LabelMassiveLayer, Position, TerrainFactory, Tiles3DLoader, XViewer } from 'xgis-cesium';

export default defineComponent({
  setup() {
    // Cesium.Ion.defaultAccessToken = Global.Config.MapKeys?.CesiumKey;
    //初始化地球
     function initCesiumViewer() {
      try {
        //https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions
        const viewer = new XViewer('cesiumContainer2');
        viewer.clock.currentTime = Cesium.JulianDate.fromDate(new Date());
        // 开启帧率
        // viewer.scene.debugShowFramesPerSecond = true;
        // 深度监测
        viewer.scene.globe.depthTestAgainstTerrain = true;

        //设置相机视角参数，优化性能
        //参考：https://blog.csdn.net/m0_57344393/article/details/148769089
        // viewer.scene.camera.frustum.far = 6000000; // 根据实际需求调整
        // viewer.scene.camera.frustum.near= 1;

        return viewer;
      } catch (error) {
        Global.Message.err('Cesium Viewer初始化失败！');
        Global.Logger().error('Cesium Viewer初始化失败', error);
      }
      return undefined;
    }
    function initMapExtent(viewer: XViewer) {
      if (!Global.Config.MapExtent || !viewer) return;
      const extent: [number, number, number, number] = Global.Config.MapExtent;
      const rect = Cesium.Rectangle.fromDegrees(extent[0], extent[1], extent[2], extent[3]);
      Cesium.Camera.DEFAULT_VIEW_FACTOR = 0.5;
      Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rect;
      viewer.camera.setView({
        destination: rect,
        orientation: {
          heading:  Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-90),
          roll: 0,
        },
      });
    }

    onMounted(() => {
      Global.SyncCesiumViewer =  initCesiumViewer();
      if (Global.SyncCesiumViewer) {
        Global.LayoutManager?.loadWidget('Sync3DWidget');
        const xviewer = Global.SyncCesiumViewer as XViewer;
        if(Global.Config.enableCache)
        xviewer.enableOfflineCache();
        //初始化定位
        // initMapExtent(xviewer);
        //   const terrain = TerrainFactory.createUrlTerrain({
        // url: 'http://data.marsgis.cn/terrain',
        // requestWaterMask: true, // 请求水面遮罩
        // requestVertexNormals: true // 请求法线以获得更好的光照效果
        // });
        //地形
        // xviewer.setTerrain(terrain);
        //默认单张图片，作为底图
        xviewer.setBasicLayer('ARCGIS_IMG');
        const tileset3DURL='https://3dtiles.gis.digsur.com/model/4a811ae1-322a-4ccd-bd47-ac1cae5809a5/tileset.json'
        Tiles3DLoader.load3DTilesLayer(tileset3DURL,xviewer,'九眼楼长城-冬季','倾斜摄影',false);
      }
      //已经加载成功
      // EmitMsg(SystemsEvent.CesiumWidgetLoaded, 'CesiumWidgetLoaded');
    });

    onUnmounted(()=>{
              Global.LayoutManager?.unloadWidget('Sync3DWidget');
    })
  },
});
</script>
<style lang="scss" scoped>
// 减少CPU参与渲染，GPU负载提升30%‌
// #cesiumContainer
// {
//   transform: translateZ(0);  /* 触发GPU渲染层 */
//   will-change: transform;     /* 预声明变化属性 */
// }
.xgisViewerContainer {
  width: 100%;
  height: 100%;
}
</style>
