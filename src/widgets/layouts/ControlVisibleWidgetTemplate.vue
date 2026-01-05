<template>
  <div v-show="isShow">
    <span>能支持“隐藏”和“打开”——可见性控制的Widget示例模版</span>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
onMounted(() => {});
/**
 * 对外暴露接口
 */
const isShow = ref(true);
function changeVisible(isVisible: boolean = false) {
  isShow.value = isVisible;
}
defineExpose({ changeVisible, isShow });
</script>
<style lang="scss" scoped></style>
