<template>
  <q-btn dense flat @click="$q.dark.toggle()">
    <Icon :icon="$q.dark.isActive ? 'material-symbols:light-mode' : 'material-symbols:dark-mode'" />
    <q-tooltip>{{ $q.dark.isActive ? '浅色模式' : '深色模式' }}</q-tooltip>
  </q-btn>
</template>

<script lang="ts" setup>
defineOptions({ name: 'DarkMode' });
</script>
