import type { ISysRoleRight, IUserRole } from 'xframelib';
declare type ActiveKeyType = '1' | '2'; //当前激活状态，1为我拥有的  2为我创建\可修改的，默认为1

/**
 * 角色系统权限
 */
export interface IRoleSysRightModel {
  activeKey: ActiveKeyType; //1为我拥有的  2为我创建\可修改的，默认为1
  userrole?: IUserRole; //角色+系统列表
  sysrolelist?: Array<ISysRoleRight>; //系统功能权限
  currentSysID?: string; //当前系统ID
}
