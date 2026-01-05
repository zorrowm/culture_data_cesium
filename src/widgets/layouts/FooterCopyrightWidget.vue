<template>
  <div class="footerWidget">
    <PageFooter />
    <div class="msginfo" :style="getMsginfoStyle">{{ statusInfo }}</div>
  </div>
</template>

<script lang="ts" setup>
import PageFooter from 'src/components/PageFooter.vue';
import { OnStatusHandler } from 'src/events';
import { appStore } from 'src/stores';
import type { CSSProperties } from 'vue';
import { computed, onMounted, ref } from 'vue';
defineOptions({ name: 'FooterCopyrightWidget' });

const appState = appStore();
const statusInfo = ref(''); //提示：正在加载中……
const getMsginfoStyle = computed((): CSSProperties => {
  const footerHeight = appState.footerHeight + 'px';
  return { marginTop: `-${footerHeight}` };
});
const footerHeight = computed(() => {
  const footerHeight1 = appState.footerHeight + 'px';
  return footerHeight1;
});

onMounted(() => {
  //监听：全局提示信息
  OnStatusHandler((data:any) => {
    statusInfo.value = '提示：' + data;
  });
});
</script>

<style lang="scss" scoped>
.footerWidget {
  position: absolute;
  background-color: var(--footer-bg-color);
  bottom: 0px;
  width: 100%;
  font-size: 12px;
  color: var(--footer-copyright-fontcolor);
  height: v-bind(footerHeight);
}
.msginfo {
  margin-left: 5px;
  color: var(--footer-info-fontcolor);
  margin-top: -20px;
}

.copyright {
  position: relative;
  text-align: center;
  bottom: 0px;
}
</style>
