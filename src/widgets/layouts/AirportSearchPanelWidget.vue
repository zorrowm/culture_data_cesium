<template>
  <XWindow
    v-show="isShow"
    :isDark="true"
    left="73px"
    top="46px"
    nWidth="455px"
    :nHeight="windowHeightRef"
    :pid="pidRef"
    title="通用机场资料查询"
    @loaded="loadedHandle"
    @close="doClosePanel"
  >
    <template #default>
      <q-scroll-area class="fit">
        <div class="column q-ma-md justify-center items-start">
          <div class="row justify-center items-center searchLine">
            <q-input
              class="inputSearch"
              outlined
              v-model="keywordRef"
              placeholder="输入名称模糊查询"
              :dense="true"
            />
            <div class="searchBtn q-ml-sm" @click="doSearch">
              <Icon icon="ep:search"></Icon> 搜索
            </div>
          </div>
          <div class="typeListPanel">
            <div class="typeLine q-mb-sm">
              <q-checkbox left-label v-model="allSelect" label="全部" />
            </div>
            <div class="typeLine q-mb-sm">
              <div>级别：</div>
              <q-btn-toggle v-model="levelModelRef" toggle-color="info" :options="levelOptions" />
            </div>

            <div class="typeLine">
              <div>类型：</div>
              <q-btn-toggle v-model="typeModelRef" toggle-color="info" :options="typeOptions" />
            </div>
            <!-- <div class="typeLine">
                            <div>飞行规则：</div>
                            <q-btn-toggle v-model="flyModelRef" toggle-color="primary" :options="flyOptions" />
                        </div> -->
          </div>
          <div class="resultTable">
            <q-table
              class="fit sticky-header-table"
              v-model:selected="selected"
              :dense="$q.screen.lt.md"
              separator="cell"
              flat
              bordered
              :rows="rows"
              :filter="filter"
              :columns="columns"
              row-key="name"
              :visible-columns="visibleColumns"
              v-model:pagination="pagination"
              @row-click="rowClickSelect"
            >
              <template v-slot:bottom>
                <div class="full-width row justify-end">
                  <PaginationLine
                    :rows-number="rowSum"
                    v-model:page="page"
                    v-model:pageSize="pageSize"
                    :pages="pagesNumber"
                  >
                  </PaginationLine>
                </div>
              </template>
            </q-table>
          </div>
        </div>
      </q-scroll-area>
    </template>
  </XWindow>
</template>

<script lang="ts" setup>
import { columns, visibleColumns } from 'src/models/AirportTabColumns';
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue';
import { Global, XWindow, XWindowManager } from 'xframelib';

import { GetAirportInfo } from '@/api/MultiSourceManageSystem';
import PaginationLine from '@/components/Quasar/TableParts/PaginationLine.vue';
import { airportStore } from '@/stores/index';

const instance = getCurrentInstance();
const wid = instance?.proxy?.$options.id;
const layoutid = instance?.proxy?.$options.layoutID;
const pidRef = ref(wid);
const airportState = airportStore();
const windowHeightRef = ref(530);

const levelModelRef = ref(null);
const levelOptions = ref([
  { label: 'A1', value: 'A1' },
  { label: 'A2', value: 'A2' },
  { label: 'A3', value: 'A3' },
  { label: 'B', value: 'B' },
]);
const typeOptions = ref([
  { label: '跑道型机场', value: '跑道型机场' },
  { label: '直升机场', value: '直升机场' },
]);
const typeModelRef = ref(null);

// const flyOptions = ref([
//     { label: 'VFR', value: 'VFR' },
// ]);
// const flyModelRef = ref(null);
//是否全部
const allSelect = computed({
  get: () => {
    return typeModelRef.value === null && levelModelRef.value === null;
  },
  set: (value) => {
    typeModelRef.value = null;
    levelModelRef.value = null;
    doSearch();
  },
});
watch(
  () => typeModelRef.value,
  (value) => {
    if (value) doSearch();
  },
);
watch(
  () => levelModelRef.value,
  (value) => {
    if (value) doSearch();
  },
);
const pagination = ref({
  sortBy: 'id',
  descending: false,
  rowsPerPage: 0, //不限制，由外部决定
});
//关键字
const keywordRef = ref('');
//总记录数
const rowSum = ref(0);
const page = ref(1);
const pageSize = ref(10);
const pagesNumber = computed(() => {
  return Math.ceil(rowSum.value / pageSize.value);
});
const filter = ref<string>('');
const selected = ref([]);

//页码发生变化
watch(
  () => page.value,
  (val) => {
    query();
  },
);
watch(
  () => pageSize.value,
  (val) => {
    page.value = 1;
    query();
  },
);

function doSearch() {
  const keyword = keywordRef.value;
  page.value = 1;
  //接入
  query();
}

const rows = ref<any>([]);
async function query(data: { page?: number; pageSize?: number } = undefined) {
  if (data) {
    if (data.page) {
      page.value = data.page;
    }

    if (data.pageSize) {
      pageSize.value = data.pageSize;
    }
  }
  const res = await GetAirportInfo(
    levelModelRef.value,
    typeModelRef.value,
    null,
    page.value,
    pageSize.value,
    keywordRef.value,
  );
  if (res && res.response?.status == 200) {
    rowSum.value = res.data.totalCount;
    rows.value = res.data.datas;
  }
  //获取总记录数
  if (page.value > pagesNumber.value && pagesNumber.value != 0) page.value = pagesNumber.value;
}

let widgetID;
let windowID;
function loadedHandle(panelData) {
  windowID = panelData.id;
}
function doClosePanel(panelData) {
  widgetID = panelData.pid;
  if (panelData.pid) {
    // EmitMsg(WidgetsEvent.WidgetClosed, widgetID);
    const currentLayoutManager = Global.LayoutMap.get(layoutid);
    if (currentLayoutManager) {
      currentLayoutManager.unloadWidget(widgetID);
    }
  }
}

async function rowClickSelect(evt, row: any, index) {
  console.log('新选中行：', row, index);
  //保存新选中行记录
  Global.AirportNewSelected = row;
  //存储机场名称
  airportState.name = row.name;
  const currentLayoutManager = Global.LayoutMap.get(layoutid);
  if (currentLayoutManager) {
    currentLayoutManager.loadWidget('AirportInfoPanelWidget');
  }
}

onMounted(() => {
  doSearch();
});

/**
 * 对外暴露接口
 */
const isShow = ref(true);
function changeVisible(isVisible: boolean = false) {
  isShow.value = isVisible;
  if (windowID && isVisible) XWindowManager.openWindowPanel(windowID);
}
defineExpose({ changeVisible, isShow });
</script>

<style lang="scss" scoped>
.searchLine {
  width: 100%;

  .inputSearch {
    flex-grow: 1;
  }

  .searchBtn {
    // background-color: #1657A3;
    background-image: url('/img/window/windowBtn.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 40px;
    width: 70px;
    line-height: 40px;
    border-radius: 5px;
    padding: 0 5px;
  }
}

.typeListPanel {
  width: 100%;
  // height: 120px;
  // background-color: #f00;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  padding: 10px;
}

.typeLine {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
.resultTable {
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
}
</style>
<style lang="scss">
.typeListPanel {
  .q-btn-item {
    min-width: 80px;
    border-bottom: 1px solid #a3b4cc;
  }
  .bg-info {
    background: url('/img/active_bg.png') !important;
    background-size: 100% 100% !important;
    background-repeat: no-repeat !important;
  }
}
</style>
