import { _DeepPartial, defineStore } from 'pinia';
import type { ISystemUser, IUserRole, IUserSystem } from 'xframelib';
import { clearRight, logout, Storage } from 'xframelib';

const USER_SYS_KEY = 'USER_SYS_KEY';
const userST = new Storage('', localStorage);

//定义Store函数
export const userStore = defineStore('user', {
  state: () => {
    const cacheValue = userST.get(USER_SYS_KEY);
    const stateData: ISystemUser = (cacheValue || {}) as ISystemUser;
    return stateData;
  },
  getters: {
    //第一个最高的默认角色
    DefaultMaxRole(state) {
      const role = state.roles?.[0];
      let roleName: any = '普通用户';
      switch (role?.level) {
        case 0:
          roleName = '超级管理员';
          break;
        case 1:
          roleName = '管理员';
          break;
        case 2:
          roleName = '普通用户';
          break;
      }
      return roleName;
    },
    /**
     * 默认最大角色等级
     * @param state
     * @returns
     */
    DefaultMaxRoleLevel(state) {
      const role = state.roles?.[0];
      let level = -1;
      if (role) {
        level = role.level;
      }
      return level;
    },
    /**
     * 管理员以上级别的系统
     * @param state
     * @returns
     */
    AdminSystemList(state): IUserSystem[] {
      const adminSysList: IUserSystem[] = [];
      state.roles?.forEach((item) => {
        if (item.level === 0 || item.level === 1) {
          if (item.syslist) {
            item.syslist.forEach((it) => {
              const idx = adminSysList.findIndex((p) => p.id === it.id);
              if (idx < 0) {
                //去重
                adminSysList.push(it);
              }
            });
          }
        }
      });
      return adminSysList;
    },
    //获取用户关联角色的系统列表
    RoleSystemList(state): string[] {
      const roleSysList: string[] = [];
      state.roles?.forEach((item) => {
        if (item.syslist) {
          item.syslist.forEach((it) => {
            const idx = roleSysList.findIndex((p) => p === it.id);
            if (idx < 0) {
              //去重
              roleSysList.push(it.id);
            }
          });
        }
      });
      return roleSysList;
    },
  },
  actions: {
    /**
     * 初始化
     * @param data 登录数据
     */
    init(data: ISystemUser) {
      this.id = data.id;
      this.name = data.name;
      this.doubletoken = data.doubletoken;
      this.roles = data.roles;
      this.bindid = data.bindid;
      //保存
      userST.set(USER_SYS_KEY, {
        id: data.id,
        name: data.name,
        roles: data.roles,
        doubletoken: data.doubletoken,
        bindid: data.bindid,
      });
    },
    /**
     * 根据系统ID，获取Role角色
     * @param sysID 系统ID
     * @returns
     */
    getCurrentSystemRole(sysID: string): IUserRole | undefined {
      const roleList = this.roles;
      if (roleList) {
        for (const item of roleList) {
          const sys = item.syslist?.find((item) => item.id === sysID);
          if (sys) {
            return item;
          }
        }
      }
      return undefined;
    },
    //退出登录
    clear() {
      this.id = undefined;
      this.name = undefined;
      this.doubletoken = undefined;
      this.roles = undefined;
      this.bindid = undefined;
      //清除
      userST.remove(USER_SYS_KEY);
      //退出登录
      logout();
      clearRight();
    },
  },
});
