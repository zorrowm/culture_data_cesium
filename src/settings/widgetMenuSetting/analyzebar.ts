import type { IWidgetMenu } from 'xframelib';
import { MenuItemEnum } from 'xframelib';
const menuCofig: Array<IWidgetMenu> = [
  {
    name: '工具栏',
    index: 1,
    icon: 'ant-design:tool-twotone',
    path: 'linkMenuWidget',
    type: MenuItemEnum.Widget,
    selected: false,
    children: [
      // {
      //   name: '图层管理',
      //   icon: "eos-icons:cluster-management-outlined",
      //   path: 'LayerManageWidget',
      //   type: MenuItemEnum.Widget,
      //   unload: false
      // },
      {
        name: '量算分析',
        icon: 'game-icons:pencil-ruler',
        path: 'MeasuringWidget',
        type: MenuItemEnum.Widget,
        unload: true,
      },
      // {
      //   name: '空间分析',
      //   icon: 'iconoir:3d-select-face',
      //   path: 'ApatialAnalysisWidget',
      //   type: MenuItemEnum.Widget,
      //   unload: true,
      // },
      {
        name: '布达拉宫',
        path: 'doLocateBudalagong',
        icon: 'ant-design:bank-outlined',
        type: MenuItemEnum.Action
      },
      {
        name: '三维联动',
        path: 'SyncCesiumWidget',
        icon: 'ant-design:sync-outlined',
        type: MenuItemEnum.Widget,
        unload: true,
        selected:false,
      },
      
    ],
  },
];

export default menuCofig;
