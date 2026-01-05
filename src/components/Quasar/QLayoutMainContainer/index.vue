<template>
  <q-layout view="hHh lpR fFf" class="mainContainerQLayout">
    <q-page-container class="mainContainerPageContent">
      <slot>
        <router-view />
      </slot>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
//用于LayoutContainer的mainContainer容器的router-view页面切换
defineOptions({ name: 'QLayoutMainContainer' });
</script>

<style scoped lang="scss">
.mainContainerQLayout {
  min-height: unset !important;
  height: 100%;

  .mainContainerPageContent {
    width: 100%;
    height: 100%;
    background-color: rgb(41,50,64);

    > main {
      width: 100%;
      pointer-events: auto;
      min-height: unset !important;
    }
  }
}
</style>
