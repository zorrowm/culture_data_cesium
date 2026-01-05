<template>
  <div class="compassZoomPanel">
  <CompassControl :viewer="viewerRef"></CompassControl> 
  <ZoomControl :viewer="viewerRef"></ZoomControl>
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Global } from 'xframelib';
import { CompassControl, ZoomControl } from 'xgis-cesium';

const viewerRef = ref(Global.CesiumViewer);
onMounted(() => {
  viewerRef.value = Global.CesiumViewer;
});
</script>

<style  lang="scss" scoped>
.compassZoomPanel
{
  :deep(.xgis_compass)
  {
    bottom:230px;
  }
  :deep(.xgis_zoom_bar)
  {
    height:90px;
    bottom:130px;
  }

}
</style>
