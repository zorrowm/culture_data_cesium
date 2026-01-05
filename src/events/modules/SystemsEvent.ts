//系统视图相关事件
export default {
  //#region 根据需要注册事件类型
  System_RefreshList: 'System_RefreshList',
  System_Search: 'System_Search',
  System_Detail: 'System_Detail',
  System_ReListAside: 'System_ReListAside',
  CesiumWidgetLoaded: 'CesiumWidgetLoaded',
  //#endregion
  UserLoginSuccess: 'UserLoginSuccess', //门户的用户登录成功
  //弹框处理事件
  System_Modal_Show: 'System_Modal_Show',
  //取消上传
  System_Abort_Upload: 'System_Abort_Upload',
  //文件树节点被选中
  FileTree_Node_Selected: 'FileTree_Node_Selected',
  //文件树节点刷新
  FileTree_Node_Refresh: 'FileTree_Node_Refresh',
    /**
   * 分屏事件
   */
    System_WindowHalfSize:'System_WindowHalfSize',

    Init_Default_Handler: 'Init_Default_Handler',
    Remove_Default_Handler: 'Remove_Default_Handler',
    //飞行点位置
    Flight_Position_Changed:'Flight_Position_Changed'
  };
