<template>
  <div>
    <q-tooltip anchor="bottom middle" self="top middle">{{ props.value }}</q-tooltip>
    <span>
      {{ ellipsis(props.value, props.length) }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'EllipsisValue' });
const props = defineProps({
  value: {
    type: String,
    required: false,
  },
  length: {
    type: Number,
    required: false,
    default: 25,
  },
});
function ellipsis(value, vlength = 25) {
  if (!value) {
    return '';
  }
  if (value.length > vlength) {
    return `${value.slice(0, vlength)}...`;
  }
  return value;
}
</script>
