import fs from 'vite-plugin-fs/browser';
import { Global } from 'xframelib';

import { defineBoot } from '#q-app/wrappers';

export default defineBoot(async ({ app }) => {
  //如果是开发环境下，执行
  if (import.meta.env.DEV) {
    Global.Logger().info('开发环境下，输出BDGrid.json……');


    // const data=BDGridTool.initGrid3DMesh();
    // await fs.writeFile('public/BDGrid.json', JSON.stringify(data));

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
