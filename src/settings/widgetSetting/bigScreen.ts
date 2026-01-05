import type { IWidgetConfig } from 'xframelib';
import { LayoutContainerEnum } from 'xframelib';

/**
 * 组件配置项
 */
const defaultWidgetCofig: Array<IWidgetConfig> = [
    {
    layoutID: 'bigScreenLayout', //归属组
    id: 'ModalContainerWidget',
    label: '弹框容器',
    container: LayoutContainerEnum.top,
    component: () => import('src/widgets/layouts/ModalContainerWidget.vue'),
    preload: true,
  },
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'headerTitleWidget',
    label: '头部栏',
    container: LayoutContainerEnum.top,
    component: () => import('src/widgets/bigScreen/HeaderTitleWidget.vue'),
    preload: true,
  },
  // {
  //   layoutID: 'bigScreenLayout', //归属组
  //   id: 'statusWidget',
  //   container: LayoutContainerEnum.bottom,
  //   component: () => import('src/widgets/bigScreen/StatusWidget.vue'),
  //   preload: true,
  // },
  //菜单栏widget
  {
      layoutID: 'bigScreenLayout', //归属组
      id: 'menuBarWidget',
      container: LayoutContainerEnum.centerBack,
      component: () => import('src/widgets/bigScreen/MenuBarWidget/MainMenuBarWidget.vue'),
      preload: false
  },
  //菜单栏widget
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'linkMenuWidget',
    label:'左侧地图工具栏',
    container: LayoutContainerEnum.centerBack,
    component: () => import('src/widgets/bigScreen/MenuBarWidget/index.vue'),
    afterid: 'cesiumWidget',
    preload: true
  },
  // {
  //   layoutID: 'bigScreenLayout', //归属组
  //   id: 'RightButtonGroup',
  //   label:'图层控制',
  //   container: LayoutContainerEnum.centerBack,
  //   component: () => import('src/widgets/bigScreen/RightButtonGroup.vue'),
  //   afterid: 'cesiumWidget',
  //   preload: false
  // },
  // {
  //   layoutID: 'bigScreenLayout', //归属组
  //   id: 'BaseLayerWidget',
  //   label:'底图地形控制',
  //   container: LayoutContainerEnum.centerBack,
  //   component: () => import('src/widgets/bigScreen/BaseLayerWidget.vue'),
  //   afterid: 'cesiumWidget',
  //   preload: false
  // },
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'InfoShowWidget',
    label:'弹框组件',
    container: LayoutContainerEnum.centerBack,
    component: () => import('src/widgets/bigScreen/MenuWidgets/InfoShowWidget/index.vue'),
    afterid: 'cesiumWidget',
    preload: true
  },
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'MeasuringWidget',
    label:'量测',
    container: LayoutContainerEnum.centerFront,
    component: () => import('src/widgets/bigScreen/MenuWidgets/MeasuringWidget.vue'),
    afterid: 'cesiumWidget',
    preload: false
  },
  // {
  //   layoutID: 'bigScreenLayout', //归属组
  //   id: 'AirportSearchPanelWidget',
  //   label:'通用机场资料查询',
  //   container: LayoutContainerEnum.centerFront,
  //   component: () => import('src/widgets/layouts/AirportSearchPanelWidget.vue'),
  //   preload: false
  // },
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'imageBaseLayerWidget',
    label:'底图管理',
    container: LayoutContainerEnum.centerFront,
    afterid: 'cesiumWidget',
    component: () => import('src/widgets/cesiumWidgets/ImageBaseLayerWidget.vue'),
    preload: false
  },
];

export default defaultWidgetCofig;
