import { bussinessRoutes } from 'src/router';
import functionList from 'src/settings/functionSetting';
import widgetMenuConfig from 'src/settings/widgetMenuSetting';
import widgetConfigMap from 'src/settings/widgetSetting';
import { getSystemPKG } from 'src/utils/sysTool';
import fs from 'vite-plugin-fs/browser';
import type { ISysRightOptions } from 'xframelib';
import { exportSystemRights, Global, serialize } from 'xframelib';

import { defineBoot } from '#q-app/wrappers';

export default defineBoot(async ({ app }) => {
  //如果是开发环境下，执行
  if (import.meta.env.DEV) {
    Global.Logger().info('开发环境下，输出MenuRoutes.json……');
    const bRoutes = [...bussinessRoutes];
    // translateTitle(bRoutes);
    const widgetConfig = [];
    for (const [key, value] of widgetConfigMap) {
      widgetConfig.push(value);
    }
    const options: ISysRightOptions = {
      bussinessRoutes: bRoutes,
      widgetConfig,
      functionList,
      widgetMenuConfig,
      pkgObject: getSystemPKG(),
    };
    const data = exportSystemRights(options);
    await fs.writeFile('public/MenuRoutes.json', JSON.stringify(data));

    //增加输出Widget列表对象
    // const widgetsList:any=[]
    // widgetConfig.forEach(item => {
    //   let value = item.component.toString();
    //   value = value.slice(value.indexOf('"') + 1)
    //   value = value.slice(0, value.indexOf('"'));
    //   const tmp = {
    //     layoutID:item.layoutID,
    //     label:item.label,
    //     id:item.id,
    //     path:value
    //   };
    //   if (tmp) widgetsList.push(tmp);
    // });
    // fs.writeFile('public/widgetsList.txt', serialize(widgetsList));
  }
});
