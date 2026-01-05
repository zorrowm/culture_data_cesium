import type { IWidgetConfig } from 'xframelib';
import { LayoutContainerEnum } from 'xframelib';

/**
 * 组件配置项
 */
const defaultWidgetCofig: Array<IWidgetConfig> = [
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'cesiumWidget',
    container: LayoutContainerEnum.centerBack,
    component: () => import('src/widgets/cesiumWidgets/CesiumViewerWidget.vue'),
    preload: false,
  },
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'renderStatusWidget',
    container: LayoutContainerEnum.centerBack,
    afterid: 'cesiumWidget',
    component: () => import('src/widgets/cesiumWidgets/RenderStatusWidget.vue'),
    preload: true,
  },
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'compassWidget',
    label: '导航球',
    container: LayoutContainerEnum.centerBack,
    afterid: 'cesiumWidget',
    component: () => import('src/widgets/cesiumWidgets/CompassZoomWidget.vue'),
    preload: true,
  },
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'distanceLegendWidget',
    container: LayoutContainerEnum.centerBack,
    afterid: 'cesiumWidget',
    component: () => import('src/widgets/cesiumWidgets/DistanceLegendWidget.vue'),
    preload: true,
  },
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'layerControlMenuWidget',
    label: '图层管理菜单',
    container: LayoutContainerEnum.centerBack,
    afterid: 'cesiumWidget',
    component: () => import('src/widgets/cesiumWidgets/LayerControlMenuWidget.vue'),
    preload: true,
  },
  //三维地图菜单---示例
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'keyControlWidget',
    label: '键盘控制',
    container: LayoutContainerEnum.centerFront,
    afterid: 'cesiumWidget',
    component: () => import('src/widgets/cesiumWidgets/KeyControlWidget.vue'),
    preload: false
  },
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'timelineWidget',
    label: '时间轴',
    container: LayoutContainerEnum.centerBack,
    afterid: 'cesiumWidget',
    component: () => import('src/widgets/cesiumWidgets/TimelineWidget.vue'),
    preload: true,
  },
  
];

export default defaultWidgetCofig;
