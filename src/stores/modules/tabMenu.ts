import { defineStore } from 'pinia';
import { getDefaultRouteBase } from 'src/permission/index';
import type { RouteData } from 'xframelib';
import { getTabRouteData } from 'xframelib';

export const tabMenuStore = defineStore('tabMenu', {
  state: () => ({
    tabMenus: [] as RouteData[] | undefined,
    currentTab: {},
    base: undefined as RouteData | undefined,
  }),
  actions: {
    //设置默认首页
    SetTabBase(routerName: string) {
      const tempRoute = getDefaultRouteBase(routerName);
      if (!tempRoute) {
        this.base = undefined;
        return;
      }
      const routedata = getTabRouteData(tempRoute);

      if (!this.base) this.base = routedata;
      else {
        this.base = routedata;
        this.DestroyTabMenu();
      }
    },
    AddTabMenu(tab?: any) {
      // pass it
      if (this.base && this.tabMenus) {
        if (this.tabMenus.length === 0) {
          this.tabMenus.push(this.base);
          this.currentTab = this.base;
        }
        if (tab) {
          const tabData = getTabRouteData(tab);

          const exist = this.tabMenus.findIndex((item) => item.name === tabData.name);
          if (exist < 0) {
            this.tabMenus.push(tabData);
            this.currentTab = tabData;
          }
          // console.log(tabData,exist, this.tabMenus,'8888888888')
        }
      }
    },
    ChangeCurrentTab(tab) {
      this.currentTab = tab;
    },
    RemoveTab(tab) {
      const removeIndex = this.tabMenus.indexOf(tab);
      this.tabMenus.splice(removeIndex, 1);
      this.currentTab = this.tabMenus[removeIndex - 1];
    },
    RemoveRightTab(tab) {
      const removeIndex = this.tabMenus.indexOf(tab);
      this.tabMenus = this.tabMenus.slice(0, removeIndex + 1);
    },
    RemoveLeftTab(tab) {
      const removeIndex = this.tabMenus.indexOf(tab);
      const rightMenu = this.tabMenus.slice(removeIndex);
      this.tabMenus = [this.base].concat(rightMenu);
    },
    DestroyTabMenu() {
      this.currentTab = '';
      this.tabMenus = [];
    },
  },
});
