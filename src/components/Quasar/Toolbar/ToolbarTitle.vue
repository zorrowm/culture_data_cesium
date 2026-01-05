<template>
  <q-btn flat no-caps no-wrap>
    <img src="img/logo.png" alt="" style="width: 32px" />
    <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="text-weight-bold">
      {{ title }}
    </q-toolbar-title>
    <q-tooltip v-if="$q.screen.xs">{{ title }}</q-tooltip>
  </q-btn>
</template>

<script lang="ts" setup>
import { Global } from 'xframelib';
defineOptions({ name: 'ToolbarTitle' });
withDefaults(defineProps<{ title?: string }>(), {
  title: Global.Config.UI?.SiteTitle,
});
</script>
