<template>
  <div :id="keyRef">
    <ChildMenuBar v-show="isShow" :menuData="childMenus" :layoutID="layoutIDRef" class="currentChildMenu" @itemClick="doItemClick" />
  </div>
</template>

<script setup lang="ts">
import './menuBarStyle.scss';

import ChildMenuBar from 'src/components/WidgetMenuBar/index.vue';
import { EmitMsg } from 'src/events/index';
import SystemsEvent from 'src/events/modules/SystemsEvent';
import MenuSettings from 'src/settings/widgetMenuSetting/index';
import { findMenuConfig } from 'src/widgets/WidgetUtils';
import { getCurrentInstance, onMounted, ref } from 'vue';

const childMenus = ref([]);
//修改以下变量 :key="keyRef"
const layoutIDRef = ref('');
const instance = getCurrentInstance();
const wid = instance?.proxy?.$options.id;
const layoutid = instance?.proxy?.$options.layoutID;
const keyRef = ref(wid);
console.log(wid, 'jiazaile');
onMounted(() => {
const  menuData = MenuSettings;

  layoutIDRef.value = layoutid;
  const targetMenu = findMenuConfig(menuData, wid);
  if (targetMenu) {
    childMenus.value.push(...targetMenu.children);
  }
});

let xmapSelected=false;
function doItemClick(menuItem)
{
  if(menuItem.path==='SyncCesiumWidget')//XMapContainerWidget
  {
      xmapSelected=!xmapSelected;
      if(xmapSelected)
      {
        //二三维分屏
         EmitMsg(SystemsEvent.System_WindowHalfSize, 2);
      }
      else
      {
        //只显示三维
        EmitMsg(SystemsEvent.System_WindowHalfSize, 0);
      }

    
  }
}
/**
 * 对外暴露接口
 */
const isShow = ref(true);
function changeVisible(isVisible: boolean = false) {
  isShow.value = isVisible;
}
defineExpose({ changeVisible, isShow });
</script>
