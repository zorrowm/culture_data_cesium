import type { _DeepPartial } from 'pinia';
import { defineStore } from 'pinia';
import projectSetting from 'src/settings/projectSetting';
import { nextTick } from 'vue';
import { deepMerge, H5Tool, Storage } from 'xframelib';

import type { MenuSetting, ProjectConfig } from '@/models/IConfig';

const PROJ_CONFIG_KEY = 'PROJ_SETTINGS_KEY';
const appStorage = new Storage('', sessionStorage);

const defaultObj: ProjectConfig = {
  ...projectSetting,
};

//定义Store函数
const appStore = defineStore('app', {
  state: () => {
    appStorage?.remove(PROJ_CONFIG_KEY);
    const cacheValue = appStorage.get(PROJ_CONFIG_KEY);
    const stateData: ProjectConfig = cacheValue || defaultObj;
    //初始化大小
    const headerHeight = stateData.headerSetting?.height ?? 64;
    const showFooter = stateData.showFooter;
    const footerHeight = showFooter ? stateData.footerHeight : 0;
    //内容高度
    stateData.layoutContentHeight = document.body.clientHeight - footerHeight - headerHeight;
    stateData.leftCollapsed = stateData.menuSetting?.collapsed;
    let asiderWidth = 0;
    if (stateData.leftCollapsed) {
      asiderWidth = stateData.menuSetting?.minWidth;
    } else asiderWidth = stateData.menuSetting?.menuWidth ?? 250;
    stateData.layoutContentWidth = document.body.clientWidth - asiderWidth;
    return stateData;
  },
  getters: {
    /**
     * 头部高度
     * @param state
     * @returns
     */
    layoutHeaderHeight(state): number {
      return state.headerSetting.height ?? 64;
    },
    /**
     * 底部高度
     * @param state
     * @returns
     */
    layoutFooterHeight(state): number {
      const showFooter = state.showFooter;
      const footerHeight = showFooter ? state.footerHeight : 0;
      return footerHeight;
    },
    /**
     * 左侧菜单宽度
     * @param state
     * @returns
     */
    layoutSiderWidth(state): number {
      if (!state.menuSetting) return 0;
      if (!state.menuSetting.show) return 0;
      if (state.menuSetting.collapsed) {
        return state.menuSetting.minWidth;
      } else return state.menuSetting.menuWidth ?? 250;
    },
  },
  actions: {
    async reloadPage(duration: number = 0) {
      this.reloadFlag = false;
      await nextTick();
      if (duration) {
        setTimeout(() => {
          this.reloadFlag = true;
        }, duration);
      } else {
        this.reloadFlag = true;
      }
    },
    //获取缓存
    getCacheStore() {
      let cacheValue = appStorage.get(PROJ_CONFIG_KEY);
      if (!cacheValue) cacheValue = defaultObj;
      return cacheValue;
    },
    //保存
    saveCacheStore() {
      appStorage.set(PROJ_CONFIG_KEY, this.$state);
    },
    /**
     * 清除
     */
    clear() {
      appStorage?.remove(PROJ_CONFIG_KEY);
    },
    //修改工程设置
    setProjectConfig(partialObj: _DeepPartial<ProjectConfig>): void {
      if (partialObj) {
        deepMerge(this.$state, partialObj);
        this.saveCacheStore();
      }
    },
    //修改菜单设置
    setMenuSetting(menuSetting: Partial<MenuSetting>): void {
      this.setProjectConfig({ menuSetting });
    },
    /**
     * 反转状态
     */
    toggleCollapse() {
      this.leftCollapsed = !this.leftCollapsed;
      this.menuSetting.collapsed = this.leftCollapsed;
      this.layoutContentWidth = document.body.clientWidth - this.layoutSiderWidth;
      this.saveCacheStore();
      //主动发起window事件
      const myEvent = new Event('resize');
      window.dispatchEvent(myEvent);
    },
    resizeHandler() {
      this.layoutContentWidth = document.body.clientWidth - this.layoutSiderWidth;
      this.layoutContentHeight =
        document.body.clientHeight - this.layoutFooterHeight - this.layoutHeaderHeight;
      this.saveCacheStore();
    },
  },
});
function resizeHandler() {
  const appState = appStore();
  appState.resizeHandler();
}
//监听变化
H5Tool.windowResizeHandler(resizeHandler);
export { appStore };
