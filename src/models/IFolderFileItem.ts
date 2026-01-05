/**
 * 定义文件夹和文件对象模型
 */
export interface IFolderFileItem{
    id: string;//文件虚拟id，"92d3e03b3a524402b1d7f818bcd9b0f2"
    name:string; //名称"a"
    pid:string; //父ID"92ae8d7eead64648aadade30a2bc37a4"
    file_path?: string;// 文件地址
    has_sub_dir?: boolean;//是否有子目录
    isDirectory?: boolean;//是否是根目录
    children?:IFolderFileItem[];//子目录
    realid?:string;//文件真实存放路径ID
    file_ext?:string;//文件后缀
}

