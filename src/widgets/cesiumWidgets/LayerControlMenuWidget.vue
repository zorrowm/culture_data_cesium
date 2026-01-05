<template>
  <div class="xgis_layercontrol_menu">
      <Icon icon = "bi:layers-half" v-tooltip.right="'基础图层'" width="24"  height="24" color="#fff" @click="changeBasePanel"/>
      <!-- <Icon icon = "gala:layer" v-tooltip.right="'图层管理'"  width="24"  height="24" color="#fff" @click="changeLayerPanel"/> -->
      <Icon icon = "bi:arrow-up-left-circle" v-tooltip.right="'点位查询'"  width="24"  height="24" color="#fff" @click="enableSearchPosition"/>
  </div>
</template>

<script setup lang="ts">
import { Global } from 'xframelib';
import type { XViewer} from 'xgis-cesium';
import {Cesium} from 'xgis-cesium';

function changeBasePanel()
{
  Global.LayoutManager?.loadWidget('imageBaseLayerWidget');
}
function changeLayerPanel()
{
Global.LayoutManager?.loadWidget('LayerManageWidget');

}
let handler:Cesium.ScreenSpaceEventHandler;
function enableSearchPosition()
{
if(handler)
{
  handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
  return;
}
const viewer=Global.CesiumViewer as XViewer;
if(viewer)
{
  if(!handler)
  handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function(movement) {
      const pickedPosition = viewer.scene.pickPosition(movement.position);
      if (Cesium.defined(pickedPosition)) {
          const cartographic = Cesium.Cartographic.fromCartesian(pickedPosition);
          const longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
          const latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
          const heightString = cartographic.height.toFixed(2);
          const info='经度: ' + longitudeString + '° 纬度: ' + latitudeString + '° 高度: ' + heightString + 'm';
          if(Global.Message)
          {
            Global.Message.info(info);
          }
          else
          console.log(info);
      }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
}

</script>

<style scoped lang="scss">
.xgis_layercontrol_menu
{
  display: flex;
  flex-direction: column;
  width: 32px;
  height: 80px;
  justify-items: center;
  justify-content:space-evenly;
  align-items: center;
  position: absolute;
  left: 10px;
  bottom: 50px;
//   background:#f00;
  svg:hover
  {
    background-color: #36f;
  }
}
</style>
