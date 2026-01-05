//参考：https://quasar.dev/vue-components/table#defining-the-columns
import { date } from 'quasar';
import { ref } from 'vue';

/**
 * 定义表列——数组
 */
const columns = [
  // { name: 'id', align: 'center', label: '索引', field: 'id', sortable: true },
  { name: 'name', align: 'center', label: '名称', field: 'name',  style: 'width:200px',  headerStyle: 'width: 200px', },
  { name: 'area', align: 'center', label: '地区', field: 'region' },
  { name: 'level', align: 'center', label: '级别', field: 'category', sortable: true },
  { name: 'rule', align: 'center', label: '规则', field: 'flyingType' },
];

/**
 * 默认可见列名——数组
 */
const visibleColumns = ref<string[]>([]);
columns.forEach(({ name }) => {
  visibleColumns.value.push(name);
});

export { columns, visibleColumns };
