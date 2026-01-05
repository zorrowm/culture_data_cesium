<template><span /></template>
<script lang="ts">
import { EmitStatusMsg, OffEventHandler, OnEventHandler } from 'src/events';
import SystemsEvent from 'src/events/modules/SystemsEvent';
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { Global } from 'xframelib';
import {Cesium} from 'xgis-cesium';
export default defineComponent({
  name: 'RenderStatusWidget',
  components: {},
  setup() {
    let viewer: Cesium.Viewer;
    let latitude = '';
    let longitude = '';
    let height: number;
    let pitch = '';
    let heading = '';
    let roll = '';
    let latitudeMouse = '';
    let longitudeMouse = '';
    let eventOn = false;
    let frameRateValue: number = 0;
    //弧度转度
    const radianToDegree = 180 / Math.PI;
    let frameRateMonitor: Cesium.FrameRateMonitor; //FrameRateMonitor.fromScene
    let handler: Cesium.ScreenSpaceEventHandler;
    //获得当前视图
    function getViewer(): Cesium.Viewer | undefined {
      if (Global.CesiumViewer) {
        if (!viewer) viewer = <Cesium.Viewer>Global.CesiumViewer;
      }
      return viewer;
    }
    //获取帧监控对象
    function getRateMonitor(): Cesium.FrameRateMonitor {
      if (!frameRateMonitor) {
        const earthViewer = getViewer();
        if (earthViewer) {
          frameRateMonitor = Cesium.FrameRateMonitor.fromScene(earthViewer.scene);
        }
      }
      return frameRateMonitor;
    }
    /* 获取camera中心点坐标 */
    function getCenterPosition() {
      const myViewer = getViewer();
      if (!myViewer) return;
      const camera = myViewer.scene.camera;
      //获取高度
      height = Math.ceil(camera.positionCartographic.height);
      //直接使用经纬度坐标
      longitude = toDegree(camera.positionCartographic.longitude).toFixed(2);
      latitude = toDegree(camera.positionCartographic.latitude).toFixed(2);
      //通过三维坐标计算经纬度
      // const centerCartesian = camera.position;
      // const ellipsoid = myViewer.scene.globe.ellipsoid;
      // const curPosition = ellipsoid.cartesianToCartographic(centerCartesian);
      // longitude = (curPosition.longitude * radianToDegree).toFixed(2);
      // latitude = (curPosition.latitude * radianToDegree).toFixed(2);
      formatRenderStatus();
    }
    /**
     * 获取角度，高度方向角
     */
    function mouseOverHandler(movement) {
      const myViewer = getViewer();
      if (!myViewer) return;
      // console.log(movement.startPosition, movement.endPosition, "movement");
      const scene = myViewer.scene;
      const camera = scene.camera;
      //俯仰角
      pitch = toDegree(camera.pitch).toFixed(2);
      //方向
      heading = toDegree(camera.heading).toFixed(2);
      //翻滚角
      roll = toDegree(camera.roll).toFixed(2);

      //得到当前三维场景的椭球体
      const ellipsoid = scene.globe.ellipsoid;
      const startCartesian = camera.pickEllipsoid(movement.startPosition, ellipsoid);
      if (startCartesian) {
        //鼠标位置点
        //将笛卡尔坐标转换为地理坐标
        const cartographic0 = ellipsoid.cartesianToCartographic(startCartesian);
        //将弧度转为度的十进制度表示
        longitudeMouse = Cesium.Math.toDegrees(cartographic0.longitude).toFixed(4);
        latitudeMouse = Cesium.Math.toDegrees(cartographic0.latitude).toFixed(4);
      }
      formatRenderStatus();
    }
    function toDegree(radusNum: number): number {
      return radusNum * radianToDegree;
    }
    function formatRenderStatus() {
      let postion = '';
      if (longitudeMouse != '') {
        postion = `鼠标位置：${longitudeMouse}, ${latitudeMouse}`;
      }
      const status = `帧频：${frameRateValue}FPS 经度:${longitude}° 纬度:${latitude}° 高度:${height}米 偏航角:${heading}° 俯仰角:${pitch}°  翻转角:${roll}° ${postion}`;
      EmitStatusMsg(status); //发送消息
    }
    function frameRateHandler() {
      const myFrameMonitor = getRateMonitor();
      if (myFrameMonitor.lastFramesPerSecond === undefined) frameRateValue = 0;
      else frameRateValue = Math.ceil(myFrameMonitor.lastFramesPerSecond);
      formatRenderStatus();
    }
    function initHandler() {
      const myviewer = getViewer();
      if (myviewer) {
        //监控帧频变化
        myviewer.scene.postRender.addEventListener(frameRateHandler);
        handler = new Cesium.ScreenSpaceEventHandler(myviewer.scene.canvas);
        handler.setInputAction(mouseOverHandler, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        //镜头发生变化
        myviewer.camera.changed.addEventListener(getCenterPosition);
        getCenterPosition();
      }
      if (eventOn) {
        //事件初始化中
        // console.log("事件初始化中……");
        eventOn = false;
        OffEventHandler(SystemsEvent.CesiumWidgetLoaded, initHandler);
      }
    }
    onMounted(() => {
      const myviewer = getViewer();
      if (myviewer) {
        initHandler();
      } else {
        eventOn = true;
        OnEventHandler(SystemsEvent.CesiumWidgetLoaded, initHandler);
      }
    });
    //卸载
    function destroy() {
      if (frameRateMonitor) frameRateMonitor.destroy();
      if (handler) {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.destroy();
      }
      if (viewer) {
        viewer.scene.postRender.removeEventListener(frameRateHandler);
        viewer.camera.changed.removeEventListener(getCenterPosition);
      }
    }
    onUnmounted(() => {
      destroy();
      EmitStatusMsg('状态组件卸载了'); //发送消息
      console.warn('状态组件卸载了');
    });

    return {};
  },
  template: '',
});
</script>
