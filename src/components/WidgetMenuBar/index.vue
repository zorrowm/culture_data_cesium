<template>
  <ul class="menuBar">
    <li v-for="(item, idx) in menuData" :key="idx" :class="getClass(item)">
      <span v-tooltip.bottom="item.name" @click="itemClick(item)">
        <Icon v-if="item.icon" :icon="item.icon" :color="iconColor" />
        <img v-else-if="item.img" class="item-img" :src="item.img" />
        <template v-else>{{ item.name }}</template>
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import * as ActionTool from 'src/actions';
import { OffEventHandler, OnEventHandler } from 'src/events/index';
import MenuSettings from 'src/settings/widgetMenuSetting/index';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { IWidgetMenu, LayoutManager } from 'xframelib';
import { Global, MenuItemEnum, SysEvents } from 'xframelib';

const props = defineProps({
  layoutID: {
    type: String,
    default: 'default',
  },
  menuData: {
    type: Array<IWidgetMenu>,
    default: MenuSettings,
  },
  iconColor: {
    type: String,
    default: '#fff',
  },
  itemSize: {
    type: String,
    default: '50px',
  },
});
const emit=defineEmits(['itemClick'])
const itemLength = ref(MenuSettings.length);
const router = useRouter();
const selectedMapList = new Map<string, boolean>();
const selectedMap = ref<Map<string, boolean>>(selectedMapList);
function itemClick(menuItem: IWidgetMenu) {
  emit('itemClick',menuItem);
  switch (menuItem.type) {
    case MenuItemEnum.URL:
      window.open(menuItem.path, '_blank');
      break;
    case MenuItemEnum.Route:
      if (menuItem.blank) {
        if (menuItem.path) {
          const routeData = router.resolve({
            path: menuItem.path,
          });
          window.open(routeData.href, '_blank'); //新标签打开
        }
      } else {
        if (menuItem.path) router.push({ path: menuItem.path }); //本地跳转
      }
      break;
    case MenuItemEnum.Action:
      const method = menuItem.path;
      if (method && ActionTool[method]) {
        ActionTool[method](menuItem);
        if (menuItem.selected != undefined) {
          menuItem.selected = !menuItem.selected;
          //保存当前记录
          selectedMap.value.set(menuItem.name, menuItem.selected);
        }
      }
      break;
    case MenuItemEnum.Widget:
      if (menuItem.path) {
        const layoutManager = Global.LayoutMap.get(props.layoutID);
        if (!layoutManager) {
          Global.Message.warn(`LayoutID:${props.layoutID}的Manager不存在`);
          return;
        }
         console.log('00000000000',menuItem.selected )
        //控制加载或可见性
        controlMenuWidget(layoutManager, menuItem);
        // console.log('0000000011000',menuItem.selected )
        menuItem.selected = !menuItem.selected;

      //  console.log('000000001111',menuItem.selected )
        //保存当前记录
        // if(!menuItem.selected)
        // {
        //   selectedMap.value.delete(menuItem.name);
        //   console.log('0000000022222',selectedMap.value )
        // }
        // else
        selectedMap.value.set(menuItem.name, menuItem.selected);
      } else {
        Global.Message.warn(`加载${menuItem.name} Widget:缺少WidgetID!`);
      }
      break;
  }
}
function controlMenuWidget(layoutManager: LayoutManager, menuItem: IWidgetMenu) {
  if (!menuItem.path) return;
  if (!menuItem.selected) {
    const isExist = layoutManager.isWidgetLoaded(menuItem.path);
    if (!isExist) {
      layoutManager.loadWidget(menuItem.path);
      console.log('加载Widget：' + menuItem.path);
    } else {
      console.log('显示widget: ' + menuItem.path);
      layoutManager.changeWidgetVisible(menuItem.path, true);
    }
  } else {
    if (menuItem.unload) {
      console.log('卸载widget: ' + menuItem.path);
      layoutManager.unloadWidget(menuItem.path);
    } else {
      console.log('隐藏widget: ' + menuItem.path);
      layoutManager.changeWidgetVisible(menuItem.path, false);
    }
    //联动修改子菜单
    if (menuItem.children) {
      menuItem.children.forEach((childItem) => {
        if (childItem.selected) {
          console.log(`递归控制${menuItem.path}的子Widget:` + childItem.path);
          controlMenuWidget(layoutManager, childItem);
          childItem.selected = !childItem.selected;
        }
      });
    }
  }
}

function getClass(item: IWidgetMenu) {
  if (selectedMap.value?.has(item.name) && selectedMap.value.get(item.name)) {
    return 'menuBarItem active';
  } else {
    return 'menuBarItem';
  }
}

function unloadWidgetHandler(evt) {
  if (evt.layoutID === props.layoutID) {
    const widgetID = evt.widgetID;
    const target = props.menuData.find((item) => {
      return item.type === 0 && item.path === widgetID && item.unload != false;
    });
    if (target) {
      target.selected = false;
      //保存当前记录
      selectedMap.value.delete(target.name);
    }
  }
}
onMounted(() => {
  OnEventHandler(SysEvents.WidgetUnLoadedEvent, unloadWidgetHandler);
  // console.log(props.menuData, 'menuData');
});

onUnmounted(() => {
  OffEventHandler(SysEvents.WidgetUnLoadedEvent, unloadWidgetHandler);
});
</script>

<style lang="scss" scoped>
.menuBar {
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  align-content: space-around;
  justify-content: space-around;
  width: calc(v-bind(itemSize + 10) * v-bind(itemLength));
  // background-color: #fff;
  padding: 5px;
}
.menuBarItem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: #aaa;
  border-radius: 10%;
  width: v-bind(itemSize);
  height: v-bind(itemSize);
  margin-bottom: 5px;
  span {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover {
    background-color: #f00;
  }
  .item-img {
    width: 30px;
  }
}
.active {
  background-color: #00f !important;
}
</style>
