	import type {ResponseType} from 'xframelib';
import{Global,requestGet,requestPost,requestPostBody} from 'xframelib'
	const baseURL:string= Global.Config.ServiceURL.DefaultWebAPI!;
	/**
	* 下载文件——内部或PWD
	* @param key 虚拟文件ID
	* @param pwd 文件密码
	*/
	export async function DownloadFile(key?:string,pwd?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.DownloadFile, baseURL,{key,pwd},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 下载文件——外部Token方式
	* @param key 虚拟文件ID
	* @param token undefined
	*/
	export async function DownloadFileToken(key?:string,token?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.DownloadFileToken, baseURL,{key,token},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取要下载文件的元数据
	* @param ids 虚拟文件ID连接字符串
	* @param token token
	* @param pwd 分享密码
	*/
	export async function GetFileMeta(ids?:string,token?:string,pwd?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:IFileMeta[]}>{
		const response=await requestGet(APIKey.GetFileMeta, baseURL,{ids,token,pwd},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as IFileMeta[]};
	}
	/**
	* 获取文件流
	* @param vid undefined
	* @param pwd undefined
	* @param token undefined
	*/
	export async function GetFileStream(vid?:string,pwd?:string,token?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.GetFileStream, baseURL,{vid,pwd,token},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取文件夹和文件信息
	* @param sysid 
	* @param pid 
	*/
	export async function GetDirectoryFile(sysid?:string,pid?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:DirctoryFileInfo[]}>{
		const response=await requestGet(APIKey.GetDirectoryFile, baseURL,{sysid,pid},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as DirctoryFileInfo[]};
	}
	/**
	* undefined
	* @param sysid undefined
	* @param token undefined
	* @param pid undefined
	*/
	export async function GetDirectoryFileByToken(sysid?:string,token?:string,pid?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:DirctoryFileInfo[]}>{
		const response=await requestGet(APIKey.GetDirectoryFileByToken, baseURL,{sysid,token,pid},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as DirctoryFileInfo[]};
	}
	/**
	* 获取分类文件夹 的树
	* @param sysid 
	* @param token 
	* @param dirName 
	*/
	export async function GetTypeDirectoryFileByToken(sysid?:string,token?:string,dirName?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:DirctoryFileInfo}>{
		const response=await requestGet(APIKey.GetTypeDirectoryFileByToken, baseURL,{sysid,token,dirName},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as DirctoryFileInfo};
	}
	/**
	* 上传文件前，递归创建子目录
	* @param pid 
	* @param dirString 
	* @param token 
	*/
	export async function CreateChildDirectories(pid?:string,dirString?:string,token?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.CreateChildDirectories, baseURL,{pid,dirString,token},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 根据VID获取完整文件路径
	* @param vid 
	*/
	export async function GetFilePath(vid?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any|string}>{
		const response=await requestGet(APIKey.GetFilePath, baseURL,{vid},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取同步文件对象
	* @param vid 
	*/
	export async function GetSyncVFile(vid?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:SyncVFile}>{
		const response=await requestGet(APIKey.GetSyncVFile, baseURL,{vid},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as SyncVFile};
	}
	/**
	* 文件所属组，例如：影像、矢量、
	* @param vid 虚拟文件ID
	*/
	export async function GetGroupInfo(vid?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:GroupInfo}>{
		const response=await requestGet(APIKey.GetGroupInfo, baseURL,{vid},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as GroupInfo};
	}
	/**
	* 递归绑定文件夹或文件
	* @param pid 虚拟文件夹ID
	* @param filePath 文件路径
	* @param isDirectory 是否是文件夹
	*/
	export async function BindDirectoryFiles(pid?:string,filePath?:string,isDirectory?:boolean,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.BindDirectoryFiles, baseURL,undefined,{pid,filePath,isDirectory},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取文件树结构
	* @param rootPath 
	*/
	export async function GetFileTree(rootPath?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.GetFileTree, baseURL,{rootPath},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 进行文件夹或文件的分享
	* @param sysid undefined
	* @param vid 
	* @param fname undefined
	* @param pwd 
	* @param isfolder 
	* @param days 
	*/
	export async function AddShareFile(sysid?:string,vid?:string,fname?:string,pwd?:string,isfolder?:boolean,days?:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.AddShareFile, baseURL,{sysid,vid,fname,pwd,isfolder,days},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取分享文件列表
	* @param keyword 
	* @param pageIndex 
	* @param pageSize 
	* @param timeDesc undefined
	*/
	export async function GetShareFileList(keyword?:string,pageIndex?:number,pageSize?:number,timeDesc?:boolean,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:Share_user_filePageList}>{
		const response=await requestGet(APIKey.GetShareFileList, baseURL,{keyword,pageIndex,pageSize,timeDesc},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as Share_user_filePageList};
	}
	/**
	* 删除分享文件
	* @param shareid 
	*/
	export async function DeleteShareFile(shareid?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.DeleteShareFile, baseURL,{shareid},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 修改分享密码
	* @param shareid 
	* @param pwd 
	*/
	export async function UpdateSharePwd(shareid?:string,pwd?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.UpdateSharePwd, baseURL,{shareid,pwd},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 修改分享时间（延期几天）
	* @param shareid 分享ID
	* @param delayDays 默认1天
	*/
	export async function UpdateShareTime(shareid?:string,delayDays?:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.UpdateShareTime, baseURL,{shareid,delayDays},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 下载分享的文件
	* @param vid 虚拟文件ID
	* @param pwd 分享密码
	*/
	export async function Download(vid?:string,pwd?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.Download, baseURL,{vid,pwd},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取下载文件信息（文件或文件夹）
	* @param vid 
	* @param pwd 
	*/
	export async function GetShareFile(vid?:string,pwd?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:UserShareFile}>{
		const response=await requestGet(APIKey.GetShareFile, baseURL,{vid,pwd},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as UserShareFile};
	}
	/**
	* 获取虚拟 文件夹和文件ID
	* @param pid 父ID
	* @param vid undefined
	* @param pwd undefined
	*/
	export async function GetShareDirectoryFile(pid?:string,vid?:string,pwd?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:DirctoryFileInfo[]}>{
		const response=await requestGet(APIKey.GetShareDirectoryFile, baseURL,{pid,vid,pwd},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as DirctoryFileInfo[]};
	}
	/**
	* 上传文件
	*/
	export async function Upload(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestPost(APIKey.Upload, baseURL,undefined,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data};
	}
	const APIKey={
	DownloadFile:'/api/Download/DownloadFile',
	DownloadFileToken:'/api/Download/DownloadFileToken',
	GetFileMeta:'/api/Download/GetFileMeta',
	GetFileStream:'/api/Download/GetFileStream',
	GetDirectoryFile:'/api/FileSystem/GetDirectoryFile',
	GetDirectoryFileByToken:'/api/FileSystem/GetDirectoryFileByToken',
	GetTypeDirectoryFileByToken:'/api/FileSystem/GetTypeDirectoryFileByToken',
	CreateChildDirectories:'/api/FileSystem/CreateChildDirectories',
	GetFilePath:'/api/FileSystem/GetFilePath',
	GetSyncVFile:'/api/FileSystem/GetSyncVFile',
	GetGroupInfo:'/api/FileSystem/GetGroupInfo',
	BindDirectoryFiles:'/api/FileSystem/BindDirectoryFiles',
	GetFileTree:'/api/FileSystem/GetFileTree',
	AddShareFile:'/api/Share/AddShareFile',
	GetShareFileList:'/api/Share/GetShareFileList',
	DeleteShareFile:'/api/Share/DeleteShareFile',
	UpdateSharePwd:'/api/Share/UpdateSharePwd',
	UpdateShareTime:'/api/Share/UpdateShareTime',
	Download:'/api/Share/Download',
	GetShareFile:'/api/Share/GetShareFile',
	GetShareDirectoryFile:'/api/Share/GetShareDirectoryFile',
	Upload:'/api/Upload',
	}
	/**
	* 文件夹、文件统一树形展示对象
	*/
	export interface DirctoryFileInfo{
		id?:string,
		name?:string,
		file_path?:string,
		pid?:string,
		isDirectory:boolean,
		has_sub_dir:boolean,
		realid?:string,
		file_ext?:string,
		children?:any[]
	}
	export interface GroupInfo{
		id?:string,
		name?:string
	}
	/**
	* 前端要下载文件的元数据
	*/
	export interface IFileMeta{
		id?:string,
		name?:string,
		length:number,
		downloadID?:string,
		chunkSize?:number
	}
	/**
	* 用户分享目录或文件
	*/
	export interface Share_user_file{
		id?:string,
		isdir?:boolean,
		fid?:string,
		fname?:string,
		pwd?:string,
		create_time?:string,
		expire_date?:string,
		group_userid?:string,
		group_sysid?:string,
		share_type?:number
	}
	export interface Share_user_filePageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	/**
	* 同步文件对象：用于同步推送到专业子系统处理
	*/
	export interface SyncVFile{
		vid?:string,
		id?:string,
		name?:string,
		file_size:number,
		full_path?:string,
		group_sysid?:string,
		group_userid?:string
	}
	/**
	* 系统—用户—虚拟目录
	*/
	export interface System_user_vdirectory{
		id?:string,
		name?:string,
		pid?:string,
		file_path?:string,
		group_userid?:string,
		has_sub_dir:boolean,
		create_time?:string,
		group_dirid?:string,
		group_sysid?:string
	}
	export interface UserShareFile{
		virtualFile?:string,
		vFolder:System_user_vdirectory
	}
