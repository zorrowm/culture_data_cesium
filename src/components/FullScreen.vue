<template>
  <Icon
    v-if="!isFullscreen"
    icon="ant-design:fullscreen-outlined"
    :color="color"
    v-tooltip.right="getTitle"
    @click="toggle"
  />
  <Icon
    v-else
    icon="ant-design:fullscreen-exit-outlined"
    :color="color"
    v-tooltip.right="getTitle"
    @click="toggle"
  />
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { object, string } from 'vue-types';
import { H5Tool } from 'xframelib';
export default defineComponent({
  name: 'FullScreen',
  props: {
    target: object<Element | any>(),
    color: string(),
  },
  setup(props) {
    function toggle() {
      if (isFullscreen.value) {
        H5Tool.exitFullScreen();
        isFullscreen.value = false;
      } else {
        H5Tool.requestFullScreen(props.target);
        isFullscreen.value = true;
      }
    }
    const isFullscreen = ref(false); //computed(() => H5Tool.isFullScreen());
    const getTitle = computed(() => {
      return isFullscreen.value ? '退出全屏' : '全屏';
    });
    return {
      getTitle,
      isFullscreen,
      toggle,
    };
  },
});
</script>
<style scoped>
svg:hover {
  background-color: #36f;
}
</style>
