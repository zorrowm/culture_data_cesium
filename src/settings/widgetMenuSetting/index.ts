import type { IWidgetMenu } from 'xframelib';
import { globFilterObjects } from 'xframelib';

const components = import.meta.glob('./*.ts', { eager: true, import: 'default' });
const menuCofig: Array<IWidgetMenu> = globFilterObjects<IWidgetMenu>(components, true);
export default menuCofig;
