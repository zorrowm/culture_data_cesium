import 'xframelib/dist/index.css';
import 'floating-vue/dist/style.css';

import { addAPIProvider, Icon } from '@iconify/vue';
//floating-vue 用于浮动tooltip  https://floating-vue.starpad.dev/guide/installation
//, Menu, Tooltip
import { Dropdown, Menu, Tooltip } from 'floating-vue';
import { EmitLoadingInfo } from 'src/events/index';
import { getRightWidgetConfig } from 'src/permission';
import { message } from 'src/utils/MessageNotify';
//封装的消息提示
import { getSystemID, getSystemPKG } from 'src/utils/sysTool';
import { autoRefresh, Global, init } from 'xframelib';

import { defineBoot } from '#q-app/wrappers';
function preInit() {
  if (window.global === undefined) {
    window.global = globalThis;
  }
  //系统ID,唯一标识
  const sysID = getSystemID();
  //分组名，工程名
  const sysGroup = getSystemPKG().name;
  init(message, sysID, sysGroup);
  //挂载进度通知方法
  Global.Loading = EmitLoadingInfo;
  //注册自己的IconAPIProvider
  if (Global.Config.ServiceURL.IconServiceURL)
    addAPIProvider('', {
      resources: [Global.Config.ServiceURL.IconServiceURL],
    });
  //免登录或只登录不验证功能
  getRightWidgetConfig();
}

export default defineBoot(({ app }) => {
  EmitLoadingInfo('XFramelib库');
  //初始化Xframelib
  preInit();
  //启动热更新监测
  if (!import.meta.env.DEV) autoRefresh();
  // 创建pinia 实例——20240221这里不需要了，在src/stores/index.ts里挂接的
  // const pinia = createPinia();
  // app.use(pinia);
  //注册全局组件
  app.component('Icon', Icon);
  app.component('FVDropdown', Dropdown);
  app.component('FVMenu', Menu);
  app.component('FVTooltip', Tooltip);

  //开发时,全局注册tiny组件
  // if (import.meta.env.DEV) {
  //   // import('@opentiny/vue').then((it) => {
  //   //   const TinyVue = it.default;
  //   //   app.use(TinyVue);
  //   // });
  // }
  Global.Logger().trace('环境变量', process.env);
  //绑定全局变量，需参考链接：https://blog.csdn.net/m0_51223745/article/details/133993048
  //保存网站根地址
  app.config.globalProperties.$AppURL = process.env.APP_URL;
  app.provide('$AppURL', process.env.APP_URL);
});
