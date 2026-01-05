import { getRightWidgetConfig } from 'src/permission';
import type { Component } from 'vue';
import type { IWidgetConfig } from 'xframelib';
import type { IWidgetMenu } from 'xframelib';
import { Global, LayoutManager } from 'xframelib';
/**
 * 过滤查找目标菜单的Widget
 * @param menuCofig
 * @param menuPath
 * @returns
 */
export function findMenuConfig(
  menuCofig: Array<IWidgetMenu>,
  menuPath: string,
): IWidgetMenu | undefined {
  let result: IWidgetMenu | undefined;
  for (const menuItem of menuCofig) {
    if (menuItem.path === menuPath) {
      result = menuItem;
      break;
    } else if (menuItem.children) {
      const childResult = findMenuConfig(menuItem.children, menuPath);
      if (childResult) {
        result = childResult;
        break;
      }
    }
  }
  return result;
}
/**
 * 通过菜单名找到菜单项（针对分组情况）
 * @param menuCofig
 * @param menuName
 * @returns
 */
export function findMenuItem(menuCofig: Array<IWidgetMenu>, menuName: string): IWidgetMenu {
  let result: IWidgetMenu;
  for (const menuItem of menuCofig) {
    if (menuItem.name === menuName) {
      result = menuItem;
      break;
    } else if (menuItem.children) {
      const childResult = findMenuItem(menuItem.children, menuName);
      if (childResult) {
        result = childResult;
        break;
      }
    }
  }
  return result;
}

let rotateCameraHandler: (...params: any[]) => any;

/**
 * 获取所有的Widget组件VUE
 */
const widgetComponents = import.meta.glob<boolean, string, Component>('./**/*.vue');
/**
 * 加载正确的widget
 * @param idName
 * @param layoutName
 * @returns
 */
export function loadRightWidget(idName: string, layoutName: string): () => Promise<Component> {
  const keyPath = `./${layoutName}/${idName}.vue`;
  return widgetComponents[keyPath];
}
// /**
//  * 自动生成widget配置
//  * @param widgetSettings
//  * @param currentLayout
//  * @param layoutDirectory
//  */
// export function produceWidgetSettings(widgetSettings:any[],currentLayout:string,layoutDirectory:string):Array<IWidgetConfig>
// {
//   const result:Array<IWidgetConfig>=[];
//   widgetSettings.forEach(item=>{
//     const cpItem:any={...item};
//     const itemName=item.name??item.id;
//     if(item.directory)
//     {
//       cpItem['component']=loadRightWidget(itemName,item.directory);
//       delete cpItem['directory'];
//     }
//     else
//      cpItem['component']=loadRightWidget(itemName,layoutDirectory);
//      if(!cpItem.layoutID)
//      {
//       cpItem.layoutID=currentLayout;
//      }
//      result.push(cpItem);
//   });
//   return result;
// }
