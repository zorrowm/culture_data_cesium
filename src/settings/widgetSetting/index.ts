import type { IWidgetConfig } from 'xframelib';
import { globFilterLayoutWidgetConfig } from 'xframelib';
/**
 * 组件配置项
 */
const components = import.meta.glob('./*.ts', { eager: true, import: 'default' });

//导出widgetConfig字典
const widgetCofigMap: Map<string, Array<IWidgetConfig>> = globFilterLayoutWidgetConfig(
  components,
  import.meta.env.PROD,
);
export default widgetCofigMap;
