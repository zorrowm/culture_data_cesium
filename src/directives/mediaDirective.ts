import { Screen } from 'quasar';
import type { App, Directive, DirectiveBinding } from 'vue';
import { H5Tool } from 'xframelib';

/**
 * 可拖拽命令
 */
const mediaDirective: Directive = {
  mounted(el: Element | any, binding: DirectiveBinding<string>) {
    const value = binding.value;
    const oldClassList = Object.assign({}, el.classList);
    const classNamesList = value.split(' ');
    const dealStyle = () => {
      if (classNamesList && classNamesList.length > 0) {
        classNamesList.forEach((item) => {
          const idx = item.indexOf('.');
          if (idx > 0) {
            const clsName = item.substring(0, idx);
            const condition = item.substring(idx + 1);
            if (condition) {
              const codArray = condition.split('.');
              if (codArray && codArray.length > 0) {
                let condItem = Screen;
                codArray.forEach((it) => {
                  condItem = condItem[it];
                });
                if (!condItem) {
                  //移除
                  if (!oldClassList?.contains || !oldClassList?.contains(clsName)) {
                    el.classList.remove(clsName);
                  }
                } else {
                  el.classList.add(clsName);
                }
              }
            }
          }
        });
      }
    };
    dealStyle();
    H5Tool.windowResizeHandler(dealStyle);
  },
};
export function setupmediaDirective(app: App) {
  app.directive('media', mediaDirective);
}
export default mediaDirective;
