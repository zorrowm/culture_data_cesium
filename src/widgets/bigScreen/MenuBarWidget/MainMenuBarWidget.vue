<template>
  <div v-show="isShow" class="menuBarWidget">
    <WidgetMenuBar layoutID="bigScreenLayout" iconColor="#333" iconSize="50" />
  </div>
</template>

<script setup lang="ts">
import WidgetMenuBar from 'src/components/WidgetMenuBar/index.vue';
import { ref } from 'vue';
/**
 * 对外暴露接口
 */
const isShow = ref(true);
function changeVisible(isVisible: boolean = false) {
  isShow.value = isVisible;
}
defineExpose({ changeVisible, isShow });
</script>

<style lang="scss" scoped>
.menuBarWidget {
  position: absolute;
  top:0;
  left: 10px;
  z-index:2;
  width:40px;
  :deep(.menuBar) {
    width:100%;
    flex-direction: column;
    align-items: start;
    background-color: transparent;
    cursor: pointer;
    pointer-events: none;
    > *{
      pointer-events: all;
    }
  }
  :deep(.menuBarItem) {
    // background-color: transparent;
    background-color: #3c6698;
    margin-bottom: 0;
    // border-radius: 0;
    height: 40px;
    width: 40px;
    // span{
    //         display: inline-block;
    //         line-height: 34px;
    //   }
  }
  :deep(.active) {
    background-color: #3deffc !important;
  }
  :deep(.iconify) {
    width: 20px;
    height: 20px;
    vertical-align:center;
    color:#fff !important;
  }
}
</style>
