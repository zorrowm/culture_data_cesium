//https://floating-vue.starpad.dev/guide/directive
import { vClosePopper, vTooltip } from 'floating-vue';
import type { App } from 'vue';
import { setupDragDirective, setupRepeatDirective, setupWowDirective } from 'xframelib';

import { setupmediaDirective } from './mediaDirective';

export function setupGlobDirectives(app: App) {
  setupDragDirective(app);
  // setupLoadingDirective(app);
  setupWowDirective(app);
  setupRepeatDirective(app);
  setupmediaDirective(app);
  //指令
  app.directive('tooltip', vTooltip);
  app.directive('close-popper', vClosePopper);
}
