import { bussinessRoutes } from 'src/router';
import functionSettings from 'src/settings/functionSetting';
import widgetMenuSetting from 'src/settings/widgetMenuSetting';
import widgetConfigMap from 'src/settings/widgetSetting';
import { userStore } from 'src/stores';
import type { RouteRecordRaw } from 'vue-router';
import type { IWidgetMenu } from 'xframelib';
import type { IWidgetConfig } from 'xframelib';
import {
  getFunctions,
  getRoutes,
  getRouteURL,
  getWidgetConfigMap,
  getWidgetMenus,
  Global,
} from 'xframelib';

let functionList;

/**
 * 获取用户最大角色等级
 * @returns
 */
export function getDefaultMaxRoleLevel(): number {
  const userState = userStore();
  //是否是超级管理员
  return userState.DefaultMaxRoleLevel;
}
/**
 * 清除权限
 */
export function clearRight() {
  functionList = undefined;
}
/**
 * 判断是否有权限
 * @param funcID 功能标识
 * @returns
 */
export function hasFunction(funcID: string): boolean {
  if (isNoRightVerify()) return true;
  if (!functionList) functionList = getFunctions(functionSettings, getDefaultMaxRoleLevel());
  if (!functionList || functionList.length === 0) return false;
  return functionList.findIndex((item) => item.id === funcID) >= 0;
}

/**
 * 不对权限验证，只验证用户
 */
export function isNoRightVerify() {
  return Global.Config.UI.IsNoLogin || Global.Config.UI.OnlyUserVerify;
}

/**
 * 获取授权的路由菜单
 * @returns
 */
export function getRightRoutes(): Array<RouteRecordRaw> | undefined {
  const rightRoutes = isNoRightVerify()
    ? bussinessRoutes
    : getRoutes(bussinessRoutes, getDefaultMaxRoleLevel());
  if (!Global.Config.UI.IsNoLogin && !Global.CorrectRoute) {
    //解决redirect还保留默认值的问题
    rightRoutes?.forEach((it) => {
      if (it.children && it.children.length > 0) {
        it.redirect = getRouteURL(it.children[0].path, it.path);
      }
    });
    //修正Route
    Global.CorrectRoute = true;
    //获取一次widgetSetting配置20250601
    getRightWidgetConfig();
  }
  return rightRoutes;
}

/**
 * 获取默认路由
 * @returns
 */
export function getDefaultRouteBase(layoutRouterName: string): RouteRecordRaw | undefined {
  const rightRoutes = isNoRightVerify()
    ? bussinessRoutes
    : getRoutes(bussinessRoutes, getDefaultMaxRoleLevel());
  if (rightRoutes) {
    const currentRoutes = rightRoutes?.find((p) => p.name === layoutRouterName);
    if (currentRoutes) return currentRoutes;
    else return rightRoutes[0];
  } else return undefined;
}

/**
 * 获取授权的Widget菜单列表
 */

export function getRightWidgetMenus(): Array<IWidgetMenu> | undefined {
  return isNoRightVerify()
    ? widgetMenuSetting
    : getWidgetMenus(widgetMenuSetting, getDefaultMaxRoleLevel());
}

/**
 * 白名单数组
 */
const resultWhiteList: Map<string, IWidgetConfig[]> = new Map();
/**
 * 获取不需要登录时，白名单
 * Layouts对应的WidgetConfig数组
 * @returns
 */
function getWhiteListWidgetConfig() {
  const layoutIDwhiteList = ['portalLayout', 'bigScreenLayout'];

  if (resultWhiteList.size == 0) {
    layoutIDwhiteList.forEach((key) => {
      if (widgetConfigMap.has(key)) {
        const tmp = widgetConfigMap.get(key);
        if (tmp) resultWhiteList.set(key, tmp);
      }
    });
  }
  return resultWhiteList;
}

/**
 * 获取授权的Widget组件列表
 * @returns
 */
export function getRightWidgetConfig(): Map<string, IWidgetConfig[]> | undefined {
  let result: Map<string, IWidgetConfig[]> | undefined = undefined;
  if (isNoRightVerify()) {
    result = widgetConfigMap;
  } else {
    const level = getDefaultMaxRoleLevel();
    if (level === -1) {
      result = getWhiteListWidgetConfig();
    } else {
      result = getWidgetConfigMap(widgetConfigMap, level);
      if (!result || result.size === 0) {
        result = getWhiteListWidgetConfig();
      } else if (level != 0) {
        const tmpMap = getWhiteListWidgetConfig();
        for (const [key, value] of tmpMap) {
          if (!result.has(key)) result.set(key, value);
        }
      }
    }
  }
  Global.RightWidgetConfigMap = result;
  // console.log('widget列表00000000', result);
  return result;
}
