import { EmitLoadingInfo } from 'src/events/index';
//默认路由结构
import bigScreenLayout from 'src/router/bigScreen/index';
//添加路由模块
import system from 'src/router/system/index';
import type { RouteRecordRaw } from 'vue-router';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { Global } from 'xframelib';

import { defineRouter } from '#q-app/wrappers';

import { createRouterGuards } from './router-guards';



EmitLoadingInfo('Router路由');
// 当前业务视图路由，用于动态获取业务路由;portalPrivateRoute为需要权限的路由
export const bussinessRoutes: Array<RouteRecordRaw> = [
  bigScreenLayout,
]; //
//用于初始化，只加载系统的路由
//IsNoLogin: true, 无需登录时，初始化全部路由
export const common: Array<RouteRecordRaw> = [
  ...system,
];
export const systemRoutes: Array<RouteRecordRaw> = Global.Config.UI.IsNoLogin
  ? [...bussinessRoutes, ...common]
  : common; //全部路由

//  console.log(Global.Config.UI.IsNoLogin, common, systemRoutes, '44444444444');
export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;
  //WM:20241101
  //  //修正没有默认首页时，自动添加映射
  //  let existDefault=false;
  //  systemRoutes.forEach(it=>{
  //   if(it.path==='/')
  //   {
  //     existDefault=true;
  //   }
  // });
  // // const first=systemRoutes[0];
  // //  if(first.path!='/'&&!existDefault)
  // //  {
  // //   systemRoutes.unshift({
  // //     path:'/',
  // //     redirect:first.path
  // //   })
  // //  }
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),

    //系统路由
    routes: systemRoutes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });
  // 创建路由守卫
  if (!Global.Config.UI?.IsNoLogin) createRouterGuards(Router);
  return Router;
});
