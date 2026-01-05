import { defineStore } from 'pinia';
import type {IFolderFileItem} from 'src/models';
import { Storage } from 'xframelib';

import { EmitStatusMsg } from '@/events';

const SYS_USER_MENU_KEY = 'SYS_USER_MENU_KEY';
const sysMenuStorage = new Storage('', sessionStorage);

interface ISysUserItem {
  sysname:string;
  sysid: string; //当前选中:系统ID
  dirTreeData: IFolderFileItem[]; //文件夹数据-选中用户下的——》DirTree
  folderFileList: IFolderFileItem[]; //文件夹、文件列表数据——》DirFileList
  currentItem: IFolderFileItem; // 当前选中项
  userKey: string; //当前选中用户：唯一KEY，标识量
  vid: string; // 用户对应的——》虚拟文件夹ID
  collapsed: boolean; //文件夹树，是否折叠起来，默认为false
}
const defaultObj: ISysUserItem = {
  sysname:'',
  sysid: '',
  dirTreeData: [],
  folderFileList: [],
  currentItem: {} as any,
  userKey:'',//当前选中用户:唯一key
  vid: '',
  collapsed: false,
};

export const sysMenuStore = defineStore('sysMenuStore', {
  state: () => {
    sysMenuStorage.remove(SYS_USER_MENU_KEY);
    const cacheValue = sysMenuStorage.get(SYS_USER_MENU_KEY);
    const t: ISysUserItem = cacheValue || defaultObj;
    if (!cacheValue) {
      sysMenuStorage.set(SYS_USER_MENU_KEY, defaultObj);
    }
    return t;
  },
  actions: {
    /**
     * 初始化根目录
     * @param treeData
     * @param sysid
     */
    initDirTreeRoot(treeData: Array<IFolderFileItem>, sysid: string) {
      this.dirTreeData = treeData;
      this.sysid = sysid;
      
      if(treeData.length==1)
        {
          const sysItem= treeData[0] as any;
          this.sysname=sysItem.name;
          this.folderFileList =sysItem.children;
        }
      
    },
    //当前选中节点
    setCurrentNode(currentNode:any)
    {
      this.currentItem=currentNode;
      EmitStatusMsg(`${this.sysname}@${this.userKey}${this.currentItem.file_path}`);
    },


    /**
     * 设置节点目录
     * @param id 
     * @param childrenData 
     */
    setFolderFileList( childrenData: Array<object>) {
      this.folderFileList = childrenData;
    },
    /**
     * 反转状态
     */
    toggleCollapse() {
      this.collapsed = !this.collapsed;
      this.saveCacheStore();
      //主动发起window事件
      const myEvent = new Event('resize');
      window.dispatchEvent(myEvent);
    },
    //保存
    saveCacheStore() {
      sysMenuStorage.set(SYS_USER_MENU_KEY, this.$state);
    }
  }
});
