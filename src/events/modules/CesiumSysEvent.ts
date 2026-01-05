//Cesium 业务管理相关事件
export default {
  //#region 根据需要注册事件类型
  /**
   * 底图改变
   */
  BasicLayerChanged:"BasicLayerChanged",
  /**
   * 地形改变
   */
  TerrainLayerChanged:"TerrainLayerChanged",


  /**
   * 图层被添加事件
   */
  LayerAdded:"LayerAdded",

  /**
   * 图层被移除事件
   */
  LayerRemoved:"LayerRemoved",

  /**
   * 树的右键菜单点击
   */
  TreeContextMenuClicked:"TreeContextMenuClicked",

  //#endregion

  //#region 天气图层控制

  /**
   * 风点位图层-可见性控制
   */
  WindPointLayerShow:'WindPointLayerShow',
  /**
   * 天气图层——主题切换
   */
  WeatherLayerThemeChange:'WeatherLayerThemeChange'
  
  //#endregion

};
