<template>
  <ModalContainer
    :width="modalWidthRef"
    :content="modalContentRef"
    :visible="modalVisibleRef"
    :extra="extraRef"
    :data="recordData"
  />
</template>

<script lang="ts">
import { loadModal } from 'src/components/ModalContainer';
import ModalContainer from 'src/components/ModalContainer/index.vue';
import { OffEventHandler, OnEventHandler } from 'src/events/index';
import WidgetsEvent from 'src/events/modules/WidgetsEvent';
import { defineComponent, onMounted, onUnmounted, ref, shallowRef } from 'vue';
import type { IModalEventData } from 'xframelib';

export default defineComponent({
  name: 'ModalContainerWidget',
  components: { ModalContainer },
  setup(props, context) {
    const modalWidthRef = ref(500);
    //#region 通用对话框的相关代码
    const recordData = ref();
    //窗体额外的参数
    const extraRef = ref<object>();
    //对话框可见性
    const modalVisibleRef = ref(false);
    //对话框内容
    const modalContentRef = shallowRef();
    /**
     * 加载弹框
     */
    function doLoadModal(data: IModalEventData) {
      const { modalID, extraData, rowData, width } = data;
      extraRef.value = undefined;
      extraRef.value = extraData;
      //对话框宽度
      modalWidthRef.value = width ?? 500;
      //必须有的
      modalVisibleRef.value = false;
      if (modalID) {
        recordData.value = rowData; //赋值数据
        loadModal(modalID).then((item) => {
          modalVisibleRef.value = true;
          modalContentRef.value = item;
        });
      }
    }
    //#endregion

    onMounted(() => {
      OnEventHandler(WidgetsEvent.ModalContainerWidget_LoadModal, doLoadModal);
    });
    onUnmounted(() => {
      OffEventHandler(WidgetsEvent.ModalContainerWidget_LoadModal, doLoadModal);
    });
    return {
      modalContentRef,
      modalVisibleRef,
      extraRef,
      recordData,
      modalWidthRef,
    };
  },
});
</script>
<style scoped lang="scss"></style>
