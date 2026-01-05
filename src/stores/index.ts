import { createPinia } from 'pinia';
import { EmitLoadingInfo } from 'src/events/index';

import { defineStore } from '#q-app/wrappers';

/*
 * When adding new properties to stores, you should also
 * extend the `PiniaCustomProperties` interface.
 * @see https://pinia.vuejs.org/core-concepts/plugins.html#Typing-new-store-properties
 */
declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface PiniaCustomProperties {
    // add your custom properties here, if any
  }
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default defineStore((/* { ssrContext } */) => {
  EmitLoadingInfo('PiniaStore');
  const pinia = createPinia();

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  return pinia;
});

export * from './modules/airportStore';
export * from './modules/app';
export * from './modules/asyncRoute';
export * from './modules/bigScreen';
export * from './modules/breadcrumbs';
export * from './modules/fileViewer';
export * from './modules/flightAnalyzeStore';
export * from './modules/markdownStore';
export * from './modules/otherStore';
export * from './modules/sysMenuStore';
export * from './modules/tabMenu';
export * from './modules/user';