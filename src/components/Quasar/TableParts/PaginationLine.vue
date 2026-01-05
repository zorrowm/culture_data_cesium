<template>
  <div class="q-pa-none row items-center">
    <div class="row justify-center items-center">
      <div class="infoLine">总共 {{ rowsNumber }} 条</div>
      <q-select
        borderless
        v-model="pageSize"
        :options="pageSizeOptions"
        option-value="value"
        option-label="label"
      />
    </div>
    <q-pagination v-model="page" :max="pages" :max-pages="6" ellipsess :direction-links="true">
    </q-pagination>
    <div class="infoLine">转到</div>
    <input class="inputPage" type="number" v-model="page" :max="pages" min="1" />
    <div class="infoLine">页</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { number } from 'vue-types';

const props = defineProps({
  rowsNumber: number().isRequired,
  pageSize: number().def(10),
  pages: number().def(0),
  page: number().def(0),
});
const emit = defineEmits(['update:page', 'update:pageSize']);
const pageSizeOptions = ref([
  {
    label: '10条/页',
    value: 10,
  },
  {
    label: '20条/页',
    value: 20,
  },
  {
    label: '30条/页',
    value: 30,
  },
  {
    label: '50条/页',
    value: 50,
  },
  {
    label: '80条/页',
    value: 80,
  },
  {
    label: '100条/页',
    value: 100,
  },
]);

const page = ref(props.page);
const pageSize = ref({
  label: props.pageSize + '条/页',
  value: props.pageSize,
});
watch(
  () => props.page,
  (val) => {
    page.value = val;
  },
);
watch(
  () => page.value,
  (val) => {
    console.log('当前page页0000', val);
    emit('update:page', val);
  },
);
watch(
  () => pageSize.value,
  (val) => {
    console.log('page页面大小00000', val.value);
    emit('update:pageSize', val.value);
  },
);
</script>

<style scoped lang="scss">
.inputPage {
  line-height: 24px;
  height: 24px;
  font-size: 14px;
  border: unset;
  text-align: center;
}
.infoLine {
  margin-right: 10px;
  height: 24px;
  font-size: 14px;
}
:deep(.q-btn) {
  line-height: unset;
  font-size: 12px;
}
:deep(.q-field__control) {
  min-height: unset;
  height: 30px;
}
:deep(.q-field__native) {
  min-height: unset;
  height: 30px;
}
:deep(.q-field__marginal) {
  min-height: unset;
  height: 30px;
}
</style>
