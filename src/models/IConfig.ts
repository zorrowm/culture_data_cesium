import type { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum';
export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko';

/**
 * 左侧菜单
 */
export interface MenuSetting {
  // fixed: boolean;
  collapsed: boolean;
  // canDrag: boolean;
  // show: boolean;
  // hidden: boolean;
  // split: boolean;
  minWidth: number; //最小宽度
  menuWidth: number;
  accordion: boolean;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
}

// export interface MultiTabsSetting {
//   cache: boolean;
//   show: boolean;
//   showQuick: boolean;
//   canDrag: boolean;
//   showRedo: boolean;
//   showFold: boolean;
// }
/**
 * 头部的配置
 */
export interface HeaderSetting {
  fixed: boolean;
  //是否显示头部栏
  show: boolean;
  //Header Default Height
  height: number;
  //居中显示Title
  centerTitle: boolean;
  // Turn on full screen
  showFullScreen: boolean;
  //是否显示收缩按钮
  showCollapseIcon: boolean;
  // Show message center button
  showNotice: boolean;
}

export interface ProjectConfig {
  //左侧抽屉-菜单状态
  leftDrawerOpen: boolean;
  //刷新页面
  reloadFlag: boolean;
  //显示TabMenu
  showTabMenu: boolean;
  TabMenuHeight: number;
  //显示breadcrumbs
  showBreadCrumbs: boolean;
  //#region 新增的，根据业务需要进行增加
  //是否收缩，默认收缩(左侧)
  leftCollapsed: boolean;
  //是否浮动起来(左侧菜单)
  overlayMenu: boolean;
  // 针对后台类布局的设置
  //右侧-主内容高度
  layoutContentHeight: number;
  //右侧-主内容宽度
  layoutContentWidth: number;
  //#endregion

  //#region  未启用配置字段（备用）
  // 是否显示SettingButton
  showSettingButton: boolean;
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean;
  // Use error-handler-plugin
  useErrorHandle: boolean;
  //#endregion

  // Whether to display the logo
  showLogo: boolean;
  // Whether to show the global footer
  showFooter: boolean;
  //底部栏的高度
  footerHeight: number;
  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting;
  // menuSetting
  menuSetting: MenuSetting;
}
