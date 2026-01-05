<template>
  <PositionStatusControl v-if="viewerRef" :viewer="viewerRef"></PositionStatusControl>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Global } from 'xframelib';
import { PositionStatusControl } from 'xgis-cesium';

const viewerRef = ref(null);
onMounted(() => {
  viewerRef.value = Global.CesiumViewer;
});
</script>

<style scoped lang="scss">
.xgis_postion_info
{
  left:5px !important;
  bottom:2px !important;
}
</style>
