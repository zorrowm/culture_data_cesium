import type { Handler } from 'xframelib';
import { Global } from 'xframelib';

import StatusEvent from './modules/StatusEvent';

/**
 * 监听事件
 * @param sysEvent 事件名称
 * @param eventHanlder 事件处理函数
 */
export function OnEventHandler(sysEvent: string, eventHanlder: Handler) {
  Global.EventBus.on(sysEvent, eventHanlder);
}
/**
 *取消监听事件
 * @param sysEvent 事件名称
 * @param eventHanlder 事件处理函数
 */
export function OffEventHandler(sysEvent: string, eventHanlder: Handler) {
  Global.EventBus.off(sysEvent, eventHanlder);
}
/**
 * 发送其他全局信息
 * @param sysEvent 事件类型
 * @param data 数据信息
 */
export function EmitMsg(sysEvent: string, data: any) {
  Global.EventBus.emit(sysEvent, data);
}
/**
 * 发送状态栏的提示信息
 * @param data 状态信息
 */
export function EmitStatusMsg(data: string) {
  Global.EventBus.emit(StatusEvent.SatusMessage, data);
}
/**
 * 状态栏事件处理
 * @param eventHanlder
 */
export function OnStatusHandler(eventHanlder: Handler) {
  Global.EventBus.on(StatusEvent.SatusMessage, eventHanlder);
}

let finish = false;
export function EmitLoadingInfo(data: string = 'end') {
  if (data === 'end') {
    //移除进度条
    setTimeout(() => {
      document.getElementById('apploading')?.remove();
    }, 300);
    finish = true;
  } else if (data) {
    if (!finish) {
      const infoDIV = document.getElementById('app-loading-info');
      if (infoDIV) {
        infoDIV.innerHTML = `正在加载：${data}……`;
      }
    } else {
      //底部加载提示
      const info = `加载Widget：${data}……`;
      EmitStatusMsg(info);
    }
  }
}
