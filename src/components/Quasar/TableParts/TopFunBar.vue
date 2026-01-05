<template>
  <div class="row no-wrap full-width justify-center items-center">
    <slot name="left">
      <div class="toptitle">{{ title }}</div>
    </slot>
    <q-space />
    <div class="q-gutter-xs row no-wrap items-center">
      <slot name="right">
        <q-input clearable outlined dense placeholder="请输入关键字搜索" debounce="300" v-model="searchValue"
          @update:model-value="doClick('searchWord')">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-select class="inputSize" v-if="typeOptions && typeOptions.length" outlined v-model="typeValue"
          :options="typeOptions" option-value="value" option-label="label" label="数据类型" dense emit-value map-options
          @update:model-value="doClick('searchWord')" style="width: 150px"></q-select>

        <q-input class="inputSize" outlined v-model="dateValue" mask="date" dense readonly placeholder="开始日期">
          <template v-slot:append>
            <q-icon name="close" @click="ClearData(0)" class="cursor-pointer" />
          </template>
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="dateValue" minimal @update:model-value="doClick('searchWord')"></q-date>
          </q-popup-proxy>
        </q-input>
        <q-input class="inputSize" outlined v-model="endDateValue" mask="date" dense readonly placeholder="结束日期">
          <template v-slot:append>
            <q-icon name="close" @click="ClearData(1)" class="cursor-pointer" />
          </template>
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="endDateValue" minimal @update:model-value="doClick('searchWord')"></q-date>
          </q-popup-proxy>
        </q-input>
        <q-btn color="white" outline @click="handleReset">重置</q-btn>

        <div class="funBtn" v-tooltip="'新建'" @click="doClick('creatNew')">
          <Icon icon="ant-design:plus-outlined" />
        </div>
        <div class="funBtn" v-tooltip="'批量删除'">
          <Icon v-if="batch" icon="ant-design:delete-outlined" disabled />
          <Icon v-else icon="ant-design:delete-outlined" @click="deleteConfirm" />
        </div>
        <div class="funBtn" v-tooltip="'刷新'">
          <Icon icon="ant-design:sync-outlined" @click="doClick('refresh')" />
        </div>
        <slot name="rightAppend"></slot>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { Global } from 'xframelib';
const $q = useQuasar();

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  target: {
    type: Object,
    required: true
  },
  batch: {
    type: Boolean,
    required: true
  },
  typeOptions: {
    type: Array
  },
  typeDafaultValue: {}
});
const emit = defineEmits(['topBarClick']);

const searchValue = ref('');
function deleteConfirm() {
  const confirmMsg = `确认删除选中记录吗？`;
  $q.dialog({
    title: '批量删除',
    message: confirmMsg,
    cancel: true,
    persistent: true
  })
    .onOk(() => {
      doClick('batchDelete');
    })
    .onCancel(() => { });
}
//点击事件
const doClick = (val: string) => {
  if (val === 'searchWord') {
    if (dateValue.value && endDateValue.value) {
      if (dateValue.value > endDateValue.value) {
        Global.Message.info('后选日期必须大于前选日期');
        endDateValue.value = '';
        return;
      }

      emit('topBarClick', val, searchValue.value, typeValue.value, dateValue.value, endDateValue.value);
    } else {
      emit('topBarClick', val, searchValue.value, typeValue.value);
    }
  } else {
    emit('topBarClick', val);
  }
};

//类型
const typeValue = ref(props.typeDafaultValue);

//日期
const dateValue = ref();
const endDateValue = ref();
function ClearData(type = 0) {
  if (type == 0) {
    dateValue.value = '';
  } else {
    endDateValue.value = '';
  }
  doClick('searchWord');
}

function handleReset() {
  dateValue.value = '';
  endDateValue.value = '';
  searchValue.value = ''; 
  typeValue.value = '';
  doClick('searchWord');
}
</script>
<style lang="scss" scoped>
.toptitle {
  font-weight: bold;
  line-height: 100%;
}

.funBtn {
  padding: 5px;
  margin: 0 5px;

  &:hover {
    // background-color: #ddd;
    cursor: pointer;
  }
}

.inputSize {
  width: 150px;
}
</style>
