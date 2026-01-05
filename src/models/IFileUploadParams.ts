/**
 * 文件上传参数参数模型
 */
// export interface IFileUploadParams{
//     uid:string,//任务任务组ID,前端生成
//     fid:string;//文件夹ID
//     path: string,//文件夹路径或名称
//     md5?: string,//MD5值
//     size: number,//文件大小
//     id?:string,//文件ID
//     upath?: string,//服务端返回真实存储路径
//     index:number,//索引号
//     file?:File//文件对象
// }

/**
 * 文件上传参数参数模型
 */
export interface IFileUploadParams{
    uid:string,//任务任务组ID,前端生成
    fname:string,//文件名,
    path?:string,//文件相对路径
    pid:string;//虚拟文件夹ID，
    md5?: string,//MD5值
    size: number,//文件大小
    index:number,//索引号
    file?:File//文件对象
}