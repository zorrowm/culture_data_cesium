import type { IWidgetConfig } from 'xframelib';
import { LayoutContainerEnum } from 'xframelib';

/**
 * 组件配置项
 */
const defaultWidgetCofig: Array<IWidgetConfig> = [
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'SyncCesiumWidget',
    container: LayoutContainerEnum.right,
    label: '分屏三维组件',
    component: () => import('src/widgets/cesiumWidgets/CesiumViewerSyncWidget.vue'),
    preload: false,
  },
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'Sync3DWidget',
    container: LayoutContainerEnum.right,
    label: '同步组件',
    afterid: 'SyncCesiumWidget',
    component: () => import('src/widgets/cesiumWidgets/Sync3DWidget.vue'),
    preload: false,
  },
];

export default defaultWidgetCofig;
