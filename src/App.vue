<template>
  <router-view />
</template>

<script lang="ts">
import { OffEventHandler, OnEventHandler } from 'src/events';
import { defineComponent, onBeforeMount, onMounted, onUnmounted, watch } from 'vue';
import { Global, H5Tool, LockState, onLockListener, SysEvents, unLockListener } from 'xframelib';

import WidgetsEvent from './events/modules/WidgetsEvent';

export default defineComponent({
  name: 'App',
  setup() {
    function requestErrorHandler(errData: any) {
      if (!errData.isExceptionInfo) {
        const errInfo = `${errData.message}\n$${errData.result}`;
        Global.Message.warn(errInfo);
      }
      Global.Logger().warn(errData, '请求错误');
    }
    onBeforeMount(() => {
      Global.Loading('App.vue');
    });

    watch(
      () => LockState.isLock,
      (value) => {
        Global.Logger().debug('监听状态变化', value);
      },
    );

    onMounted(() => {
      onLockListener(); //长时间不操作退出
      //统一捕捉处理Axios请求异常
      OnEventHandler(SysEvents.AxiosRequestErrorEvent, requestErrorHandler);
      OnEventHandler(WidgetsEvent.WidgetClosed, doUnloadWidgetHandler);
      //IP查询
      // getIPAddress();
    });
    /**
     * 统一卸载Widget
     * @param widgetID
     */
    function doUnloadWidgetHandler(widgetID: string) {
      if (widgetID) {
        const currentLayoutManager = Global.getLayoutManager(widgetID);
        if (currentLayoutManager) {
          currentLayoutManager.unloadWidget(widgetID);
        }
      }
    }

    onUnmounted(() => {
      unLockListener();
      Global.Logger().debug('卸载了000000000');
      OffEventHandler(SysEvents.AxiosRequestErrorEvent, requestErrorHandler);
      OffEventHandler(WidgetsEvent.WidgetClosed, doUnloadWidgetHandler);
    });
  },
});
</script>
