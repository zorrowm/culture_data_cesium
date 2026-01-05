import type { _DeepPartial} from "pinia";
import {defineStore } from "pinia";
import { deepMerge, Global,Storage } from "xframelib";

import { ViewerEnum } from "@/enums/viewerEnum";

//store示例模型接口
interface IFileViewerModel {
  fid: string; //当前文件的ID
  ftype: string; //当前文件的类型
  fname?: string; //文件名
  fsize: number; //文件大小
  viewerName: ViewerEnum; //浏览的控件文件夹名
  url?: string; //可访问地址
  width?: number; //平铺范围
  height?: number;
  realid: string;
  name: string
}
const defaultObj: IFileViewerModel = {
  fid: "",
  ftype: "",
  fsize: 0,
  viewerName: ViewerEnum.Other,
  width: 0,
  height: 0,
  realid: "",
  url: '',
  name: ''
};
//示例名为templateStore,修改为xxxStore
export const fileViewerStore = defineStore("fileViewerStore", {
  state: () => {
    const t: IFileViewerModel = defaultObj;
    return t;
  },
  actions: {
    /**
     * 初始化
     */
    init(fileItem: any) {
      // dir: false
      // id: "9a27a9e9c984490286d257a6b9ed90d9"
      // mask: "rw"
      // modified: "2022-06-21T16:55:28.333427"
      // name: "341.txt"
      // parentid: "92ae8d7eead64648aadade30a2bc37a4"
      // path: "/文件管理系统/wenjian/341.txt"
      // realid: "72e36b5e800f4d72bc2d083e4b249db0"
      // size: 5
      // suffix: ".txt"
      if (fileItem) {
        // console.log(fileItem, "浏览文件");
        //获取地址
        const url = `${Global.Config.ServiceURL.DefaultWebAPI}${Global.Config.APIPath?.GetFileStream}?id=${fileItem.id}`;
        console.log(url, 'url');

        this.url = url;
        //必须现有前缀
        this.ftype = fileItem.suffix;

        //必须这样
        this.fid = fileItem.id;
        this.fname = fileItem.name;
        this.fsize = fileItem.size;
        this.realid = fileItem.realid;
        this.name = fileItem.name
        console.log(this.fname, 'this.fname');

        this.getRightViewer();
      }
    },
    getRightViewer(): ViewerEnum {
      switch (this.ftype) {
        case ".json":
          this.viewerName = ViewerEnum.Json;
          break;
        case ".txt":
          this.viewerName = ViewerEnum.Txt;
          break;
        case ".pdf":
          console.log("后缀为PDF");
          this.viewerName = ViewerEnum.Pdf;
          break;
        case ".svg":
          this.viewerName = ViewerEnum.Svg;
          break;
        case ".doc":
        case ".docx":
          this.viewerName = ViewerEnum.Doc;
          break;
        case ".xlsx":
        case ".xls":
          this.viewerName = ViewerEnum.Xlsx;
          break;
        case ".jpg":
        case ".png":
        case ".tif":
        case ".gif":
          console.log(this.fsize / 1024 / 1024, "类型为图片");
          if (Global.Config.ServiceURL.bigPicture) {
            if (this.fsize / 1024 / 1024 < 10) {
              this.viewerName = ViewerEnum.Picture;
            } else {
              console.log('大图');
              // this.setWidthAndHeight()
              this.viewerName = ViewerEnum.BigPicture;
            }
          } else {
            this.viewerName = ViewerEnum.Picture;
          }

          break;
        //TODO:根据文件大小，再次明确Viewer
        // case ".gif":
        //   console.log(this.fsize/1024/1024,"类型为gif");
        //   if(this.fsize/1024/1024<10){
        //     this.viewerName = ViewerEnum.Picture;
        //   }else  {
        //     this.viewerName=ViewerEnum.BigPicture
        //   };
        //     break;
        // case ".tif":
        //   console.log(this.fsize/1024/1024,"类型为tif");
        //   if(this.fsize/1024/1024<10){
        //     this.viewerName = ViewerEnum.Picture;
        //   }else  {
        //     this.viewerName=ViewerEnum.BigPicture
        //   };
        //     break;
        // case '.webp':
        //   break;
        case ".ppt":
        case ".pptx":
          this.viewerName = ViewerEnum.Other;
          break;
        default:
          this.viewerName = ViewerEnum.Other;
      }
      return this.viewerName;
    },

    /**
     * 清除
     */
    clear() { },
    /**
     * 改变部分字段值的对象
     * @param partialObj 部分模型对象
     */
    setPartialState(partialObj: _DeepPartial<IFileViewerModel>) {
      if (partialObj) {
        deepMerge(this.$state, partialObj);
      }
    },
    // setWidthAndHeight(){
    //   axios.get(`http://192.168.1.223:8086/info/${this.fid}`).then((res) => {
    //     console.log(res.data, "获取图片宽高");
    //     if (res.data) {
    //       this.width=res.data.width;
    //       this.height=res.data.height
    //     }
    // });
    // }
  },
});
