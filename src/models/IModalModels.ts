import type { Component } from 'vue';
export declare type Lazy<T> = () => Promise<T>;
export interface IModalConfig {
  /**
   * 唯一ID,与组件名一致
   */
  id: string;
  /**
   * 说明信息
   */
  label?: string;
  /**
   * 动态加载的组件
   */
  component: Lazy<Component>;
}
//用于Modal窗体传递参数的
export interface IExtraProperty {
  title?: string; //标题
  footer?: string; //底部按钮，null为空,undefined为默认
  other?:number; //用于区分不同框体
}

/**
 * 用于显示对话框，传递参数数据
 * 针对：ModalContainerWidget_LoadModal事件
 */
export interface IModalEventData {
  /**
   * 对话框ID
   */
  modalID: string;
  /**
   * 对话框宽度，默认为500
   */
  width?: number;
  /**
   * 标题参数
   */
  extraData?: IExtraProperty;
  /**
   * 数据参数
   */
  rowData?: any;
}
