import type { IModalConfig } from 'xframelib';
import { globFilterObjects } from 'xframelib';

/**
 * modal窗体配置项
 */
const components = import.meta.glob('./*.ts', { eager: true, import: 'default' });
const modalsConfig: Array<IModalConfig> = globFilterObjects<IModalConfig>(components, false);
export default modalsConfig;
