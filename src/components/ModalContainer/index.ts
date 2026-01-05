import modalsConfigArray from 'src/settings/modalSetting';
import type { DefineComponent } from 'vue';
import { Global } from 'xframelib';

import ModalContainer from './index.vue';
type VueComponent = DefineComponent; //DefineComponent<{}, {}, any>;
//容器
const modalMap: Map<string, VueComponent> = new Map();
/**
 * 加载对话框模块
 * @param modalID Modal模块ID
 * @returns
 */
async function loadModal(modalID: string) {
  if (modalMap.has(modalID)) {
    return modalMap.get(modalID);
  }
  const modalTarget = modalsConfigArray.find((p) => p.id === modalID);
  if (modalTarget) {
    const modalObj = await modalTarget.component().catch((ex) => {
      Global.Message.warn('加载Modal模块失败：' + modalTarget.id);
    });
    if (modalObj) {
      modalMap.set(modalID, modalObj.default);
      return modalObj.default;
    } else return undefined;
  } else {
    Global.Message.warn(`Modal模块不存在：${modalID}`);
    return undefined;
  }
}
/**
 * 释放路由
 * @param modalVuePath
 */
async function disposeModal(modalID: string) {
  if (modalMap.has(modalID)) {
    const modalObj = modalMap.get(modalID);
    modalMap.delete(modalID);
    //卸载
    if (modalObj != undefined) modalObj.unmounted();
  }
}

export { disposeModal, loadModal,ModalContainer,ModalContainer as ModalTemplate };
