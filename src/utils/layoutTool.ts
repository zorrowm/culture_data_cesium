import { appStore } from 'src/stores/index';

/**
 * 用于布局计算的辅助工具
 */
export default class LayoutTool {
  static appStoreState = appStore();
  /**
   * 左侧栏宽度
   */
  static getAsiderWidth(): number {
    if (LayoutTool.appStoreState.menuSetting?.collapsed) {
      return LayoutTool.appStoreState.menuSetting?.minWidth;
    } else return LayoutTool.appStoreState.menuSetting?.menuWidth ?? 250;
  }
  /**
   * 顶部高度
   * @returns
   */
  static getHeaderHeight(): number {
    return LayoutTool.appStoreState.headerSetting?.height ?? 64;
  }
  /**
   * 底部高度
   * @returns
   */
  static getFooterHeight(): number {
    if (LayoutTool.appStoreState) {
      const showFooter = LayoutTool.appStoreState.showFooter;
      const footerHeight = showFooter ? LayoutTool.appStoreState.footerHeight : 0;
      return footerHeight;
    }
    return 0;
  }

  /**
   * 视图内容高度
   * @param marginDetHeight 上下空余边界，默认为0px;
   * @returns
   */
  static getContentHeight(marginDetHeight: number = 0): number {
    const headerHeight = LayoutTool.getHeaderHeight();
    const footerHight = LayoutTool.getFooterHeight();
    const contentHeight = document.body.clientHeight - footerHight - headerHeight - marginDetHeight;
    return contentHeight;
  }

  /**
   * 获得内容的宽度
   * @param marginDetWidth
   * @returns
   */
  static getContentWidth(marginDetWidth: number = 0): number {
    const contentWidth = document.body.clientWidth - LayoutTool.getAsiderWidth() - marginDetWidth;
    return contentWidth;
  }

  /**
   * 是否显示底部栏
   * @returns
   */
  static isFooterShow(): boolean {
    let isShow = true;

    if (LayoutTool.appStoreState) isShow = LayoutTool.appStoreState.showFooter;
    return isShow;
  }
}
