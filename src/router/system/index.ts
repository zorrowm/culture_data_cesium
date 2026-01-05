import type { RouteRecordRaw } from 'vue-router';
import { recursiveRoutes } from 'xframelib';
const components = import.meta.glob('./*.ts', { eager: true, import: 'default' });
const routesCofig: Array<RouteRecordRaw> = recursiveRoutes(components);
export default routesCofig;
