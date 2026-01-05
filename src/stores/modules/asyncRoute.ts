import { defineStore } from 'pinia';

interface IAsyncrouteState {
  menus: RouteRecordRaw[];
  keepAliveComponents: string[];
}

//定义Store函数
export const asyncRouteStore = defineStore('asyncRoute', {
  state: () => {
    const stateData: IAsyncrouteState = {
      menus: [],
      keepAliveComponents: [],
    };
    return stateData;
  },
  getters: {},
  actions: {
    setRoutes(routers: RouteRecordRaw[]) {
      this.menus = routers;
    },
  },
});
