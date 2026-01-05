<template>
  <div class="row justify-center items-end dc-page-footer" :style="getWrapStyle">
    {{ copyinfo }}
  </div>
</template>

<script setup lang="ts">
import { appStore } from 'src/stores';
import type { CSSProperties } from 'vue';
import { computed, ref } from 'vue';
import { Global } from 'xframelib';
defineOptions({ name: 'PageFooter' });

const appState = appStore();
const copyinfo = ref(Global.Config.UI.CopyRight);

const getWrapStyle = computed((): CSSProperties => {
  const footerHeight = appState.footerHeight + 'px';
  return {
    height: footerHeight,
    lineHeight: footerHeight,
  };
});
</script>

<style scoped>
.dc-page-footer {
  height: 20px;
  font-size: 10px;
  background: rgba(#000000, 0) !important;
}
</style>
