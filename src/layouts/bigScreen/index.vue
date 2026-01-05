<template>
  <div class="dc-container">
    <LayoutContainer :widgetConfig="configRef" :layoutID="layoutIDRef" @containerLoaded="loadedHandler" />
  </div>
</template>

<script lang="ts">
import { EmitMsg, OffEventHandler, OnEventHandler } from 'src/events/index';
import SystemsEvent from 'src/events/modules/SystemsEvent';
import { getRightWidgetConfig } from 'src/permission';
import { appStore } from 'src/stores';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { Global, H5Tool, LayoutContainer } from 'xframelib';

export default defineComponent({
  name: 'bigScreenLayout',
  components: {
    LayoutContainer
  },
  setup(props, { attrs, slots, emit }) {
    const widgetCofig = getRightWidgetConfig();
    const configRef = ref(widgetCofig?.get('bigScreenLayout'));
    const layoutIDRef = ref('bigScreenLayout');
    const appState = appStore();
    const mainDivLeft = ref<any>(0);
    const mainDivSize = ref('100%');

    //windowType:0,三维 1，二维 2：二三维
    function changeCenterDivSizeStyle(windowType: number = 2) {
      switch (windowType) {
        case 0:
          mainDivLeft.value = 0;
          mainDivSize.value = '100%';
          break;
        case 1:
          mainDivLeft.value = '100%';
          mainDivSize.value = "0";
          break;
        case 2:
          mainDivLeft.value = '50%';
          mainDivSize.value = '50%';
          break;
      }
    }
    onMounted(() => {
      Global.Loading('end');
      OnEventHandler(SystemsEvent.System_WindowHalfSize, changeCenterDivSizeStyle);
      //是否显示头部栏
      const isShowHeader = appState.headerSetting.show;
      const topheight = isShowHeader ? appState.headerSetting.height : 0;
      H5Tool.setCssVar('--header-top-height', topheight + 'px');

      // 是否显示底部栏
      H5Tool.setCssVar('--bottom-height', 30 + 'px');
      // else H5Tool.setCssVar('--bottom-height', 0 + 'px');

    });
    function loadedHandler(evt: any) {
      //判断加载
      // console.log('加载bigScreenLayout',evt.layoutManager);
      Global.LayoutManager = evt.layoutManager;
    }

    onUnmounted(() => {
      OffEventHandler(SystemsEvent.System_WindowHalfSize, changeCenterDivSizeStyle);
    });

    return {
      configRef,
      layoutIDRef,
      loadedHandler,
      mainDivSize,
      mainDivLeft
    };
  }
});
</script>

<style lang="scss" scoped>
.dc-container {
  :deep(.topContainer) {
    height: var(--header-top-height);
    // border-bottom: solid 1px #eee;
  }
  :deep(.centerdiv) {
    top: var(--header-top-height);
    left:0;
    // left: v-bind(mainDivLeft);
    width: v-bind(mainDivSize);
     height: calc(100vh - var(--header-top-height));
  }
  :deep(.rightContainer) {
    top: var(--header-top-height);
    width: v-bind(mainDivLeft) !important;
    height: calc(100vh - var(--header-top-height));
  }

}
</style>
<style>
.topbtn {
  background: #23D0D9;
  color: white;
}
</style>