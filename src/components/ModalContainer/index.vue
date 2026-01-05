<template>
  <q-dialog v-model="visibleRef" :maximized="isFullscreen" transition-show="slide-up" transition-hide="slide-down">
    <q-card :style="cardStyle">
      <q-card-section class="row items-center justify-center  q-py-sm">
        <div class="text-h6">{{ titleRef }}</div>
        <q-space />
        <div class="q-mx-sm">
          <Icon v-if="!isFullscreen" icon="gg:maximize" v-tooltip.right="getTitle" @click="toggle" />
          <Icon v-else icon="gg:minimize" v-tooltip.right="getTitle" @click="toggle" />
        </div>
        <q-btn v-close-popup icon="close" flat round dense />
      </q-card-section>
      <q-card-section>
        <slot name="default">
          <component v-if="visibleRef" :is="content" ref="contentRef" :extra="extra" :data="dataRef"></component>
        </slot>
      </q-card-section>
      <template v-if="footerRef">
        <q-separator />
        <q-card-actions v-if="footerRef" align="right">
          <q-btn flat label="取消" color="primary" @click="handleCancel" />
          <q-btn flat label="确定" color="primary" @click="handleOk" />
        </q-card-actions>
      </template>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { EmitMsg, OffEventHandler, OnEventHandler } from 'src/events';
import WidgetsEvent from 'src/events/modules/WidgetsEvent';
import {IsFullModal} from 'src/utils/index';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { bool, number, object, oneOfType } from 'vue-types';
import type { IExtraProperty } from 'xframelib';
import { Global } from 'xframelib';

const name = 'ModalContainer';
//对外属性
const props = defineProps({
  width: number().def(400),
  visible: bool().def(false),
  isMax:bool().def(false),//是否最大化窗体
  hideFooter:bool().def(false),//是否有底部栏,默认为false
  content: object<any>(),
  //支持数据为多类型
  data: oneOfType([String, Number, Boolean, Array, Object]),
  extra: object<IExtraProperty>()
});

const visibleRef = ref<boolean>(props.visible);
const dataRef = ref(props.data);
const contentRef = ref();
watch(
  () => props.visible,
  (newVal, oldVal) => {
    visibleRef.value = newVal;
    if (props.visible)
      //必须的
      dataRef.value = props.data;
  }
);
//解决：不可见时仍旧传值
watch(
  () => props.data,
  () => {
    if (visibleRef.value) {
      dataRef.value = props.data;
    }
  }
);
//标题
const titleRef = computed(() => {
  if (props.extra?.title) return props.extra?.title;
  else if (props.content) return props.content.title;
  else return '对话框';
});

//底部按钮栏(默认是有)
const footerRef = computed(() => {
  if(props.hideFooter)
  {
    return false;
  }
  else
  {
    const pextra=props.extra;
    if (pextra&&(pextra.footer ==='false')) return false;
    else return true;
  }
});

//确定
const handleOk = (e: MouseEvent) => {
  const formChild = props.content;
  const validate = formChild?.validateForm || contentRef.value?.validateForm;
  if (validate) {
    validate().then((res) => {
      //校验成功
      if (res) {
        visibleRef.value = false;
        EmitMsg(formChild.name, true);
      }
      else {
        visibleRef.value = true;
      }
    })
      .catch((ex) => {
        console.log(`表单校验失败！`, ex);
        visibleRef.value = true;
        Global.Message.err('表单校验失败！');
      });
  }
  else {
    visibleRef.value = false;
    if(formChild)
    EmitMsg(formChild.name, true);
  }
};
//取消
const handleCancel = (e: MouseEvent) => {
  visibleRef.value = false;
  if (props.content) EmitMsg(props.content.name, false);
};

function closeModal(data) {
  visibleRef.value = false;
}
onMounted(() => {
  OnEventHandler(WidgetsEvent.ModalContainerWidget_CloseModal, closeModal);
});
onUnmounted(() => {
  OffEventHandler(WidgetsEvent.ModalContainerWidget_CloseModal, closeModal);
});

const cardStyle = computed(() => {
  if (isFullscreen.value)
    return `overflow-y:hidden`;
  else
    return `width: ${props.width}px;overflow-y:hidden`;
});
function toggle() {
  if (isFullscreen.value) {
    isFullscreen.value = false;
  } else {

    isFullscreen.value = true;
  }
}
/**
 * 是否全屏
 */
const isfull = ref(props.isMax);
const isFullscreen = computed({
  get() {
    return isfull.value || (!!IsFullModal.value);
  },
  set(value: boolean) {
    isfull.value = value;
  }
});
const getTitle = computed(() => {
  return isFullscreen.value ? '退出全屏' : '全屏';
});


/*****************************对外暴露接口************************************** */

/**
 * 改变：可见性
 * @param isVisible 
 */
function changeVisible(isVisible: boolean = false) {
  visibleRef.value = isVisible;
}
function getContentRef()
{
  return contentRef;
}
defineExpose({ changeVisible, getContentRef });
</script>