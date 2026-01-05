<template>
  <div class="popoverInfo">
    <VDropdown placement="top" :distance="10" :triggers="[]" :shown="isShown" :autohide="autoHide">
      <template #popper>
        <slot name="content"></slot>
      </template>
    </VDropdown>
  </div>
</template>

<script setup lang="ts">
import { bool, string } from 'vue-types';
defineProps({
  isShown: bool().def(false), //是否可见
  leftX: string().def('0px'),
  topY: string().def('0px'),
  autoHide: bool().def(false), //默认是不自动隐藏
});
</script>

<style scoped>
.popoverInfo {
  position: absolute;
  left: v-bind(leftX);
  top: v-bind(topY);
}
</style>
