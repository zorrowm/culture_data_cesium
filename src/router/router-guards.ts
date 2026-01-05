import NProgress from 'nprogress'; // progress bar
import { getrig, getRightRoutes } from 'src/permission';
import { asyncRouteStore, breadcrumbsStore, userStore } from 'src/stores';
import { getSystemID } from 'src/utils/sysTool';
import type { Router, RouteRecordRaw } from 'vue-router';
import { isNavigationFailure } from 'vue-router';
import { checkAddDefaultRoute, Global, logout } from 'xframelib';
import {
  checkDoRefreshToken,
  clearRight,
  getCurrentSystemRight,
  getLocalToken,
  getSystemRoleRight,
} from 'xframelib';

import doTokenCheck from '../permission/tokenCheck';
import { bussinessRoutes, common } from './index';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const loginRoutePath = '/login';
const defaultRoutePath = '/';

function getPageTitle(pageTitle) {
  const title = Global.Config.UI?.SiteTitle;
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
/**
 * 是否是系统路由
 * @param routeName
 * @returns
 */
function isSystemRoute(routeName: string): boolean {
  if (routeName === 'NotFound') return false;
  return filterSysRoute(common, routeName);
}

function filterSysRoute(routes: RouteRecordRaw[], routeName: string): boolean {
  let exist = false;
  const len = routes.length;
  for (let i = 0; i < len; i++) {
    const tmpRoute = routes[i];
    exist = tmpRoute.name == routeName;
    if (exist) break;
    else if (tmpRoute.children) {
      exist = filterSysRoute(tmpRoute.children, routeName);
      if (exist) break;
    }
  }
  return exist;
}
/**
 * 检查：路由是否有效
 */
function filterValidRoute(
  routes: RouteRecordRaw[],
  routePath: string,
  parent: string = '',
): boolean {
  let exist = false;
  const len = routes.length;
  for (let i = 0; i < len; i++) {
    const tmpRoute = routes[i]!;
    let currentPath = tmpRoute.path;
    if (currentPath.startsWith('/')) {
      exist = currentPath == routePath;
    } else {
      currentPath = `${parent}/${currentPath}`;
      exist = currentPath == routePath;
    }
    if (exist) break;
    else if (routePath.startsWith(currentPath)) {
      if (tmpRoute.children) {
        exist = filterValidRoute(tmpRoute.children, routePath, currentPath);
        if (exist) break;
      }
    }
  }
  return exist;
}

export function createRouterGuards(router: Router) {
  let toPath = '';
  const breadcrumbsState = breadcrumbsStore();
  router.beforeEach((to, from, next) => {
    NProgress.start();
    const toName = to.name as string;
    toPath = to.path;
    const userState = userStore();
    //WM:20241030 修复错误路由跳转错误
    if (toName === 'NotFound') {
      //检查是否是有效的业务路由
      const isValid = filterValidRoute(bussinessRoutes, toPath);
      console.log('检查是否是有效的业务路由', toPath, isValid);
      if (!isValid) {
        next({ path: '/error', query: { url: to.path } });
        return;
      }
    }

    //获取
    const tokenInfo = getLocalToken();
    if (tokenInfo) {
      const systemRight: any = getCurrentSystemRight();
      //WM:解决刷新路径时，无法启动定时刷新任务的问题
      if (!Global.User && userState.id) {
        checkDoRefreshToken();
        //刷新用户的角色权限
        if (toName === 'NotFound') {
          //判断是否加入过权限控制的路由
          if (
            Global.Config.UI.OnlyUserVerify ||
            (systemRight && systemRight.routes && systemRight.routes.length > 0)
          ) {
            const rightRoutes = getRightRoutes();
            if (rightRoutes) {
              //确保获取到路由权限后，赋值全局变量
              Global.User = userState.id;
              let first: RouteRecordRaw;
              rightRoutes.forEach((item) => {
                if (!first) {
                  first = item;
                }
                router.addRoute(item);
              });
              if (first) checkAddDefaultRoute(router, first);
              //WM:必须的,解决默认名为NotFound
              to.name = undefined;
              next(to);
            }
            return;
          }
        }
      }

      if (toName === 'login') {
        next({ path: defaultRoutePath });
        NProgress.done();
      } else {
        const hasRoute = router.hasRoute(toName);

        // 在免登录名单，直接进入
        if (isSystemRoute(toName) || hasRoute) {
          if (!systemRight && toName === 'NotFound') {
            //退出登录,当前无法获取到系统权限时
            logout();
            clearRight();
            //跳转到——》登录界面
            next({
              path: loginRoutePath,
              query: { redirect: to.fullPath },
              replace: true,
            });
          } else {
            // Global.Logger().info(isSystemRoute(toName)+':'+toName);
            // initSystemList();
            next();
            breadcrumbsState.setBreadcurmbs(to.matched, to.query);
          }
          NProgress.done();
        } else {
          const tokenLocal = tokenInfo.token;
          if (tokenLocal)
            doTokenCheck(tokenLocal).then((checkResult) => {
              if (checkResult) {
                initSystemList();
                //WM:请求获取授权，以加载权限模块
                const sysID = getSystemID();
                //是否是超级管理员
                const isSuperLevel = userState.DefaultMaxRoleLevel === 0;
                //获取系统角色权限
                // getSystemRoleRight(sysID, isSuperLevel)
                //   .then(() => {
                const rightRoutes = getRightRoutes();
                if (rightRoutes) {
                  let first: RouteRecordRaw | undefined = undefined;
                  rightRoutes.forEach((item) => {
                    if (!first) first = item;
                    router.addRoute(item);
                  });
                  if (first) checkAddDefaultRoute(router, first);
                  //WM:20241021 支持token跳转验证
                  if (to.query.redirect) {
                    const redirectURL = to.query.redirect as string;
                    if (redirectURL.startsWith('http')) {
                      window.open(redirectURL, '_self');
                    } else {
                      next({ path: redirectURL });
                    }
                  } else {
                    next({ path: to.path });
                  }

                  return;
                }
                // })
                // .catch(() => {
                //   Global.Message.warn('获取用户功能权限失败！');
                //   next();
                // });
              }
            });
        }
      }
    } else {
      const tokenValue = to.query?.tk?.toString();
      if (tokenValue) {
        //登录验证token
        doTokenCheck(tokenValue).then((checkResult) => {
          if (checkResult) {
            initSystemList();
            //WM:请求获取授权，以加载权限模块
            const sysID = getSystemID();
            //是否是超级管理员
            const isSuperLevel = userState.DefaultMaxRoleLevel === 0;
            //获取系统角色权限
            getSystemRoleRight(sysID, isSuperLevel)
              .then(() => {
                const rightRoutes = getRightRoutes();
                if (rightRoutes) {
                  let first: RouteRecordRaw | undefined = undefined;
                  rightRoutes.forEach((item) => {
                    if (!first) first = item;
                    router.addRoute(item);
                  });
                  if (first) checkAddDefaultRoute(router, first);
                  //WM:20241021 支持token跳转验证
                  if (to.query.redirect) {
                    const redirectURL = to.query.redirect as string;
                    if (redirectURL.startsWith('http')) {
                      window.open(redirectURL, '_self');
                    } else {
                      console.log('99999999', redirectURL);
                      next({ path: redirectURL });
                    }
                  } else {
                    next({ path: to.path });
                  }

                  return;
                }
              })
              .catch(() => {
                Global.Message.warn('获取用户功能权限失败！');
                next();
              });
          } else {
            Global.Logger().debug('验证外部的tk参数失败！');
            const rebackURL = Global.Config.ServiceURL.UILoginURL;
            if (rebackURL) {
              //统一登录界面
              const tofullPath = document.URL;
              window.open(rebackURL + '?redirect=' + tofullPath, '_self');
            } else {
              //内部登录
              let redirectURL2 = to.fullPath;
              if (to.query.redirect) {
                redirectURL2 = to.query.redirect as string;
              }
              //#region 登录界面
              next({
                path: loginRoutePath,
                query: { redirect: redirectURL2 },
                replace: true,
              });
              //#endregion
            }
            NProgress.done();
          }
        });
      } else {
        // not login
        if (isSystemRoute(toName)) {
          // 在免登录名单，直接进入
          next();
          breadcrumbsState.setBreadcurmbs(to.matched, to.query);
        } else {
          //#region 统一登录验证界面
          //跳转到主网站登录页面
          const rebackURL = Global.Config.ServiceURL.UILoginURL;
          if (rebackURL) {
            const tofullPath = document.URL;
            window.open(rebackURL + '?redirect=' + tofullPath, '_self');
          } else {
            //#region 登录界面
            next({
              path: loginRoutePath,
              query: { redirect: to.fullPath },
              replace: true,
            });
            //#endregion
          }

          NProgress.done();
          //#endregion
        }
      }
    }
  });

  router.afterEach((to, from, failure) => {
    const asyncRouteStoreState = asyncRouteStore();
    //设置网页Title
    document.title = getPageTitle(to.meta.title);
    if (isNavigationFailure(failure)) {
      Global.Logger().debug('failed navigation', failure);
      return;
    }
    // 在这里设置需要缓存的组件名称
    const keepAliveComponents = asyncRouteStoreState.keepAliveComponents;
    const currentComName = to.matched.find((item) => item.name == to.name)?.components?.default
      .name;
    if (currentComName && !keepAliveComponents?.includes(currentComName) && to.meta?.keepAlive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName);
    } else if (!to.meta?.keepAlive || to.name == 'Redirect') {
      // 不需要缓存的组件
      const index = asyncRouteStoreState.keepAliveComponents.findIndex(
        (name) => name == currentComName,
      );
      if (index != -1) {
        keepAliveComponents?.splice(index, 1);
      }
    }
    // store.commit('asyncRoute/setKeepAliveComponents', keepAliveComponents);
    NProgress.done(); // finish progress bar
  });

  router.onError((error) => {
    Global.Logger().debug(error, '路由错误');
    Global.Message.warn('加载视图错误:' + error.message);
    //注销:出错时会循环输出
    // router.push({path:'/error/404'});
  });
}
