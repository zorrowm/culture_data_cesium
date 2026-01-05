	import{Global,requestGet,requestPost,requestPostBody,ResponseType} from 'xframelib'
	const baseURL:string= Global.Config.ServiceURL.DefaultWebAPI;
	/**
	* 批量根据经纬度坐标获取高程值
	* @param bodyParams ElevationInfo[]
	*/
	export async function GetElevationbyXYBatch(bodyParams:ElevationInfo[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:ElevationInfo[]}>{
		const response=await requestPostBody(APIKey.GetElevationbyXYBatch, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as ElevationInfo[]};
	}
	/**
	* 历史分析任务列表查询，根据分类(固定为：AirSpace、Obstacle、DEM 三值，对应空域、障碍物、地形分析)
	* @param taskType 分类(固定为：AirSpace、Obstacle、DEM)
	* @param pageIndex 
	* @param pageSize 
	*/
	export async function SelectAirAnalysisTasks(taskType:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:AiranalysistaskPageList}>{
		const response=await requestGet(APIKey.SelectAirAnalysisTasks, baseURL,{taskType,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as AiranalysistaskPageList};
	}
	/**
	* 获取分析成果数据
	* @param taskType 
	* @param taskID 
	* @param filetype 
	*/
	export async function Result(taskType:string,taskID:string,filetype:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.Result.replace('{taskType}',taskType).replace('{taskID}',taskID).replace('{filetype}',filetype)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 空间可用性评估(空域冲突分析)，分析任务创建,返回任务ID
	* @param bodyParams AirSpaceTask
	*/
	export async function CreateAirSpaceAnalysisTask(bodyParams:AirSpaceTask,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPostBody(APIKey.CreateAirSpaceAnalysisTask, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 轮询 空域冲突分析完成进度，根据任务id
	* @param taskid 
	*/
	export async function GetAirSpaceAnalysisProgress(taskid:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:AnalysisResult}>{
		const response=await requestPost(APIKey.GetAirSpaceAnalysisProgress, baseURL,undefined,{taskid},headers,responseType,timeoutMS);
		return {response,data:response?.data as AnalysisResult};
	}
	/**
	* 障碍物冲突检测，分析任务创建,返回任务ID
	* @param bodyParams ObstacleTask
	*/
	export async function CreateObstacleAnalysisTask(bodyParams:ObstacleTask,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPostBody(APIKey.CreateObstacleAnalysisTask, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 轮询 障碍物冲突分析完成进度，根据任务id
	* @param taskid 
	*/
	export async function GetObstacleAnalysisProgress(taskid:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:AnalysisResult}>{
		const response=await requestPost(APIKey.GetObstacleAnalysisProgress, baseURL,undefined,{taskid},headers,responseType,timeoutMS);
		return {response,data:response?.data as AnalysisResult};
	}
	/**
	* 安全性高度计算（地形冲突分析），分析任务创建,返回任务ID
	* @param bodyParams DEMTask
	*/
	export async function CreateDEMAnalysisTask(bodyParams:DEMTask,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPostBody(APIKey.CreateDEMAnalysisTask, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 轮询 安全性高度计算（地形冲突分析）完成进度，根据任务id
	* @param taskid 
	*/
	export async function GetDEMAnalysisProgress(taskid:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:AnalysisResult}>{
		const response=await requestPost(APIKey.GetDEMAnalysisProgress, baseURL,undefined,{taskid},headers,responseType,timeoutMS);
		return {response,data:response?.data as AnalysisResult};
	}
	/**
	* 新增（id空）or更新（id有值）障碍物信息
	* @param bodyParams ObstacleInfo[]
	*/
	export async function AddorUpdateObstacleInfo(bodyParams:ObstacleInfo[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.AddorUpdateObstacleInfo, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 校验障碍物表格文件是否正确（".csv"、".xls" 、".xlsx）
	* @param filePath 文件路径
	*/
	export async function CheckObstacleInfoFiles(filePath:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestPost(APIKey.CheckObstacleInfoFiles, baseURL,undefined,{filePath},headers,responseType,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* （校验后）批量导入障碍物，通过文件
	* @param filePath 
	*/
	export async function ImportObstacleInfobyFiles(filePath:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:number}>{
		const response=await requestPost(APIKey.ImportObstacleInfobyFiles, baseURL,undefined,{filePath},headers,responseType,timeoutMS);
		return {response,data:response?.data as number};
	}
	/**
	* 导出障碍物数据到文件系统中，根据查询条件
	* @param savePath 保存路径，格式以（".csv"、".xls" 、".xlsx、".geojson"）结尾
	* @param keywords 
	* @param type 
	* @param polygonGeojson 
	* @param FileSystemID 保存到文件系统的文件夹ID
	* @param userID 用户id
	*/
	export async function ExportObstacleInfoFile(savePath:string,keywords:string,type:string,polygonGeojson:string,FileSystemID:string,userID:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.ExportObstacleInfoFile, baseURL,undefined,{savePath,keywords,type,polygonGeojson,FileSystemID,userID},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* ID获取单个障碍物信息
	* @param id 
	*/
	export async function GetObstacleInfobyID(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:ObstacleInfo}>{
		const response=await requestGet(APIKey.GetObstacleInfobyID, baseURL,{id},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as ObstacleInfo};
	}
	/**
	* 删除障碍物,by IDs
	* @param bodyParams string[]
	*/
	export async function DeleteObstacleInfobyID(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteObstacleInfobyID, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取障碍物列表，返Geojson格式单文件 点要素
	* @param keywords 
	* @param type 
	* @param polygonGeojson 
	*/
	export async function SelectObstacleGeoJsonPoint(keywords?:string,type?:string,polygonGeojson?:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.SelectObstacleGeoJsonPoint, baseURL,{keywords,type,polygonGeojson},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取障碍物列表，返Geojson格式单文件 线要素
	* @param keywords 
	* @param type 
	* @param polygonGeojson 
	*/
	export async function SelectObstacleGeoJsonLine(keywords:string,type:string,polygonGeojson:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.SelectObstacleGeoJsonLine, baseURL,{keywords,type,polygonGeojson},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取障碍物列表分页形式
	* @param keywords 关键字
	* @param type 类型
	* @param polygonGeojson 空间范围，Polygon几何，GeoJson格式
	* @param pageIndex 
	* @param pageSize 
	*/
	export async function SelectObstacleInfos(keywords:string,type:string,polygonGeojson:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:ObstacleInfoPageList}>{
		const response=await requestGet(APIKey.SelectObstacleInfos, baseURL,{keywords,type,polygonGeojson,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as ObstacleInfoPageList};
	}
	/**
	* 获取通用机场信息
	* @param airportLevel 机场级别
	* @param airportType 机场类型
	* @param airportRules 飞行规则
	* @param pageIndex 页码
	* @param pageSize 每页数量
	* @param keyword 关键字
	*/
	export async function GetAirportInfo(airportLevel:string,airportType:string,airportRules:string,pageIndex:number,pageSize:number,keyword:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:AirportPageList}>{
		const response=await requestGet(APIKey.GetAirportInfo, baseURL,{airportLevel,airportType,airportRules,pageIndex,pageSize,keyword},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as AirportPageList};
	}
	/**
	* 获取机场详细信息
	* @param name 机场名称
	*/
	export async function GetAirportDetail(name:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestGet(APIKey.GetAirportDetail, baseURL,{name},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 获取机场细则文件的请求列表。
	* @param name 机场名称
	*/
	export async function GetAirportRuleurls(name:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string[]}>{
		const response=await requestGet(APIKey.GetAirportRuleurls, baseURL,{name},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string[]};
	}
	/**
	* 获取机场细则文件内容
	* @param path 文件路径
	*/
	export async function GetAirportRuleContent(path:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.GetAirportRuleContent, baseURL,{path},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 资料查询层级视图
	* @param keyword 关键字：当关键字不为空时，返回包含关键字的机场资料；展示形式像文件夹搜索一样不需要有目录层级结构
	* @param parentPath 父路径：根据父目录路径获取子目录和文件列表
	*/
	export async function GetAirportLevelView(keyword:string,parentPath:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:AirportLevelView[]}>{
		const response=await requestGet(APIKey.GetAirportLevelView, baseURL,{keyword,parentPath},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as AirportLevelView[]};
	}
	/**
	* 获取算法模型程序镜像文件列表
	* @param keyword 
	* @param pageindex 
	* @param pagesize 
	*/
	export async function GetProgramFileList(keyword:string,pageindex:number,pagesize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:ImagesListResponsePageList}>{
		const response=await requestGet(APIKey.GetProgramFileList, baseURL,{keyword,pageindex,pagesize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as ImagesListResponsePageList};
	}
	/**
	* 获取程序文件详情
	* @param name undefined
	*/
	export async function GetProgramFileDetail(name:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:ImageInspectResponse}>{
		const response=await requestGet(APIKey.GetProgramFileDetail, baseURL,{name},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as ImageInspectResponse};
	}
	/**
	* 加载通过文件上传后的程序文件镜像
	* @param filepath 
	*/
	export async function LoadProgramFile(filepath:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.LoadProgramFile, baseURL,{filepath},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 导出（下载）程序文件
	* @param name 程序文件镜像名称
	* @param folderpath undefined
	* @param FileSystemID undefined
	* @param userID undefined
	*/
	export async function ExportProgramFile(name:string,folderpath:string,FileSystemID:string,userID:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.ExportProgramFile, baseURL,{name,folderpath,FileSystemID,userID},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除程序文件镜像，在使用中的不能删除
	* @param names IDs或名称,逗号分隔多个
	*/
	export async function RemoveProgramFile(names:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.RemoveProgramFile, baseURL,undefined,{names},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除全部程序文件镜像,根据ID
	* @param id ID
	*/
	export async function RemoveFullProgramFile(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.RemoveFullProgramFile, baseURL,undefined,{id},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 修改程序文件信息
	* @param name 算法模型名称
	* @param repositoryName 仓库名称
	* @param tag 标识
	*/
	export async function UpdateProgramFile(name:string,repositoryName:string,tag:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.UpdateProgramFile, baseURL,undefined,{name,repositoryName,tag},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取算法模型列表
	* @param keyword 
	* @param pageindex 
	* @param pagesize 
	*/
	export async function GetAlgorithmList(keyword:string,pageindex:number,pagesize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:ContainerListResponsePageList}>{
		const response=await requestGet(APIKey.GetAlgorithmList, baseURL,{keyword,pageindex,pagesize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as ContainerListResponsePageList};
	}
	/**
	* 获取创建算法模型的基本信息
	* @param imagename 程序文件镜像名称
	* @param algorithmname undefined
	*/
	export async function GetNewAlgorithmInfo(imagename:string,algorithmname:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:CreateContainerParameters}>{
		const response=await requestGet(APIKey.GetNewAlgorithmInfo, baseURL,{imagename,algorithmname},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as CreateContainerParameters};
	}
	/**
	* 创建算法模型
	* @param bodyParams CreateContainerParameters
	*/
	export async function CreateNewAlgorithm(bodyParams:CreateContainerParameters,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:CreateContainerResponse}>{
		const response=await requestPostBody(APIKey.CreateNewAlgorithm, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as CreateContainerResponse};
	}
	/**
	* 获取算法模型详情
	* @param algorithmName 
	*/
	export async function GetAlgorithmInfo(algorithmName:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:ContainerInspectResponse}>{
		const response=await requestGet(APIKey.GetAlgorithmInfo, baseURL,{algorithmName},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as ContainerInspectResponse};
	}
	/**
	* 运行算法模型
	* @param algorithmName 算法模型名称或ID
	*/
	export async function RunAlgorithm(algorithmName:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.RunAlgorithm, baseURL,undefined,{algorithmName},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 停止运行算法模型
	* @param algorithmName 算法模型名称或ID
	*/
	export async function StopAlgorithm(algorithmName:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.StopAlgorithm, baseURL,undefined,{algorithmName},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 重新运行算法模型
	* @param algorithmName 算法模型名称或ID
	*/
	export async function RestartAlgorithm(algorithmName:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.RestartAlgorithm, baseURL,undefined,{algorithmName},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除算法模型
	* @param algorithmName 算法模型名称或ID
	*/
	export async function RemoveAlgorithm(algorithmName:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.RemoveAlgorithm, baseURL,undefined,{algorithmName},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取算法模型运行日志
	* @param algorithmID 
	*/
	export async function GetAlgorithmLogs(algorithmID:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string[]}>{
		const response=await requestGet(APIKey.GetAlgorithmLogs, baseURL,{algorithmID},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string[]};
	}
	/**
	* 算法模型控制台执行
	* @param algorithmName 
	* @param command undefined
	*/
	export async function RunAlgorithmConsole(algorithmName:string,command:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string[]}>{
		const response=await requestGet(APIKey.RunAlgorithmConsole, baseURL,{algorithmName,command},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string[]};
	}
	/**
	* 交互式控制台WebSocket连接地址
	* @param algorithmID 算法模型ID，（必须是运行中的算法模型）
	*/
	export async function Connect(algorithmID:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.Connect.replace('{algorithmID}',algorithmID)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 调整交互式控制台窗口大小
	* @param algorithmID 
	* @param cols 
	* @param rows 
	*/
	export async function Resize(algorithmID:string,cols:number,rows:number,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.Resize.replace('{algorithmID}',algorithmID)
		const response=await requestGet(realPath, baseURL,{cols,rows},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 根据经纬度坐标获取高程值
	* @param X 经度
	* @param Y 纬度
	*/
	export async function GetElevationbyXY(X:number,Y:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:number}>{
		const response=await requestGet(APIKey.GetElevationbyXY, baseURL,{X,Y},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as number};
	}
	/**
	* 批量根据经纬度坐标获取高程值
	* @param bodyParams ElevationInfo[]
	*/
	export async function GetElevationbyXYBatch1(bodyParams:ElevationInfo[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:ElevationInfo[]}>{
		const response=await requestPostBody(APIKey.GetElevationbyXYBatch1, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as ElevationInfo[]};
	}
	/**
	* 异步批量根据经纬度坐标获取高程值,创建任务
	* @param bodyParams ElevationInfo[]
	*/
	export async function GetElevationbyXYAsyncBatch(bodyParams:ElevationInfo[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPostBody(APIKey.GetElevationbyXYAsyncBatch, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 异步批量根据经纬度坐标获取高程值,根据任务ID，获取计算结果
	* @param taskid undefined
	*/
	export async function GetElevationbyXYAsyncTask(taskid:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:ElevationInfo[]}>{
		const response=await requestPost(APIKey.GetElevationbyXYAsyncTask, baseURL,undefined,{taskid},headers,responseType,timeoutMS);
		return {response,data:response?.data as ElevationInfo[]};
	}
	/**
	* 根据经纬度四至范围，统计环境要素信息（地貌、地质、气温、重点目标、水文）
	* @param xMin 最小经度
	* @param yMin 最小纬度
	* @param xMax 最大经度
	* @param yMax 最大纬度
	*/
	export async function RangeStatistics(xMin:number,yMin:number,xMax:number,yMax:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPost(APIKey.RangeStatistics, baseURL,undefined,{xMin,yMin,xMax,yMax},headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 分析成果地图切片服务地址，注意！该服务为TMS类型的（Y轴从底部向上）！，而不是XYZ类型（Y轴从顶部向下）
Cesium加载（Cesium.UrlTemplateImageryProvider中)，URL模板中使用{reverseY}即：'.../{z}/{x}/{reverseY}.png',
	* @param taskid 
	* @param z 
	* @param x 
	* @param y 
	*/
	export async function result(taskid:string,z:string,x:string,y:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.result.replace('{taskid}',taskid).replace('{z}',z).replace('{x}',x).replace('{y}',y)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取分析工具列表
	*/
	export async function GetAnalysistools(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:Analysistools[]}>{
		const response=await requestGet(APIKey.GetAnalysistools, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as Analysistools[]};
	}
	/**
	* 获取历次分析评估范围 的列表
	* @param keyword 
	* @param pageindex 
	* @param pagesize 
	*/
	export async function GetHistryRangeList(keyword:string,pageindex:number,pagesize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:AnalysistaskPageList}>{
		const response=await requestGet(APIKey.GetHistryRangeList, baseURL,{keyword,pageindex,pagesize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as AnalysistaskPageList};
	}
	/**
	* 根据任务范围，分组获取各个历史任务的详细信息
	* @param rangeID 
	*/
	export async function GetHistryTaskListbyRangeID(rangeID:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:StringAnalysistaskGroupsAnalysisTaskType[]}>{
		const response=await requestGet(APIKey.GetHistryTaskListbyRangeID, baseURL,{rangeID},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as StringAnalysistaskGroupsAnalysisTaskType[]};
	}
	/**
	* 创建分析评估空间范围，主要填写 taskName, Rangejson, gridSize, info等信息
	* @param bodyParams Analysistask
	*/
	export async function CreateAnalysisRange(bodyParams:Analysistask,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPostBody(APIKey.CreateAnalysisRange, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 一键式创建，指定范围的所有分析评估任务
rangeid:分析范围ID。
parameters：所有分析评估任务的参数信息，其中tasktype来自分析工具列表的name；parameterjson来自分析工具列表的classjson（包含该工具的必要参数及重分类信息，可修改内容）。
	* @param bodyParams OnestepTask
	*/
	export async function CreateAnalysisOnestep(bodyParams:OnestepTask,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.CreateAnalysisOnestep, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 创建分析评估任务，主要填写 taskname，type，rangeid, info，parameter等信息
	* @param bodyParams Analysistask
	*/
	export async function CreateAnalysisTask(bodyParams:Analysistask,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.CreateAnalysisTask, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 任务执行重试
	* @param id 
	*/
	export async function ReTryAnalysisTask(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.ReTryAnalysisTask, baseURL,undefined,{id},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 编辑空间范围信息，根据ID
	* @param rangeid undefined
	* @param rangename undefined
	* @param info 
	*/
	export async function UpdateAnalysisRangebyID(rangeid:string,rangename:string,info:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.UpdateAnalysisRangebyID, baseURL,undefined,{rangeid,rangename,info},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 编辑任务信息，根据ID
	* @param taskid 
	* @param taskname 
	* @param info 
	*/
	export async function UpdateAnalysisTaskbyID(taskid:string,taskname:string,info:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.UpdateAnalysisTaskbyID, baseURL,undefined,{taskid,taskname,info},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 查询任务范围下，是否有任务（用于删除前的判断）
	*/
	export async function CheckHasTaskbyRangeID(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.CheckHasTaskbyRangeID, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除分析评估空间范围以及所有的任务
	* @param isForce 是否强制，true强制删除所有任务，false该范围下如果有任务就不删了
	* @param bodyParams string[]
	*/
	export async function DeleteAnalysisRange(isForce:boolean,bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteAnalysisRange, baseURL,bodyParams,{isForce},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* (批量)删除分析评估任务
	* @param bodyParams string[]
	*/
	export async function DeleteAnalysisTask(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteAnalysisTask, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 下载分析评估任务成果文件
	* @param taskid undefined
	*/
	export async function DownloadAnalysisResultFile(taskid:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.DownloadAnalysisResultFile, baseURL,{taskid},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 导出环境分析评估报告,根据范围ID
	* @param rangeid 
	*/
	export async function DownloadAnalysisReportFile(rangeid:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.DownloadAnalysisReportFile, baseURL,{rangeid},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 更新数据库记录
	*/
	export async function UpdateTaskTable(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.UpdateTaskTable, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* undefined
	* @param bodyParams Datainfo
	*/
	export async function CreateDataInfo(bodyParams:Datainfo,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestPostBody(APIKey.CreateDataInfo, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 验证数据库连接是否正确
	* @param Host undefined
	* @param Port undefined
	* @param Database undefined
	* @param User undefined
	* @param Password undefined
	* @param tableName undefined
	*/
	export async function CheckPostGISConn(Host:string,Port:string,Database:string,User:string,Password:string,tableName:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestGet(APIKey.CheckPostGISConn, baseURL,{Host,Port,Database,User,Password,tableName},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 添加数据到服务中
	* @param datainfoId 
	* @param bodyParams Datarepo[]
	*/
	export async function AddDataRepo(datainfoId:string,bodyParams:Datarepo[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.AddDataRepo, baseURL,bodyParams,{datainfoId},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除数据从服务中
	* @param datainfoId undefined
	* @param bodyParams string[]
	*/
	export async function DeleteDataRepo(datainfoId:string,bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteDataRepo, baseURL,bodyParams,{datainfoId},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 复制数据
	* @param datainfoId 
	* @param newDatainfoName 
	*/
	export async function CopyDatainfo(datainfoId:string,newDatainfoName:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.CopyDatainfo, baseURL,{datainfoId,newDatainfoName},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除数据信息
	* @param bodyParams string[]
	*/
	export async function DeleteDataInfo(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestPostBody(APIKey.DeleteDataInfo, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 判断数据是否存在
	* @param datainfoName 数据名称
	*/
	export async function isDatainfoExists(datainfoName:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.isDatainfoExists, baseURL,{datainfoName},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 编辑数据元数据
	* @param bodyParams Datainfo
	*/
	export async function updateDatainfo(bodyParams:Datainfo,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.updateDatainfo, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 
	* @param datainfoId undefined
	*/
	export async function GetDatainfo(datainfoId:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:Datainfo}>{
		const response=await requestGet(APIKey.GetDatainfo, baseURL,{datainfoId},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as Datainfo};
	}
	/**
	* 修改验证状态
	* @param datainfoId 
	* @param val_status 
	*/
	export async function updateDatainfoStatus(datainfoId:string,val_status:boolean,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.updateDatainfoStatus, baseURL,undefined,{datainfoId,val_status},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取所有数据列表
	* @param dataType 
	* @param type 
	* @param keyword 
	* @param pageindex 
	* @param pagesize 
	* @param starttime 
	* @param endtime 
	*/
	export async function GetAllDataList(dataType:number,type:number,keyword:string,pageindex:number,pagesize:number,starttime:string,endtime:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:DatainfoPageList}>{
		const response=await requestGet(APIKey.GetAllDataList, baseURL,{dataType,type,keyword,pageindex,pagesize,starttime,endtime},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as DatainfoPageList};
	}
	/**
	* 验证数据文件格式是否正确
	* @param datatype undefined
	* @param value 
	*/
	export async function CheckDataFileSys(datatype:number,value:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.CheckDataFileSys, baseURL,{datatype,value},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 验证文件是否添加
	* @param dataid 
	* @param value 
	*/
	export async function CheckDataFileExist(dataid:string,value:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.CheckDataFileExist, baseURL,{dataid,value},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取基础数据geojson文件
	* @param id 
	*/
	export async function GetBaseGeojson(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:GeojsonModel}>{
		const response=await requestGet(APIKey.GetBaseGeojson, baseURL,{id},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as GeojsonModel};
	}
	/**
	* 检验基础数据格式
	* @param value 
	* @param nameCol 
	* @param xCol 
	* @param yCol 
	* @param zCol 
	*/
	export async function CheckBaseDataFile(value:string,nameCol:number,xCol:number,yCol:number,zCol:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.CheckBaseDataFile, baseURL,{value,nameCol,xCol,yCol,zCol},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取基础数据标头
	* @param value undefined
	*/
	export async function GetBaseDataFileHeader(value:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string[]}>{
		const response=await requestGet(APIKey.GetBaseDataFileHeader, baseURL,{value},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string[]};
	}
	/**
	* 基础数据保存
	* @param bodyParams Datainfo
	*/
	export async function SaveBaseDataFile(bodyParams:Datainfo,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.SaveBaseDataFile, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 基础数据追加数据 id对应dataid,vid对应文件id
	* @param bodyParams SyncVFile
	*/
	export async function AddBaseDataFile(bodyParams:SyncVFile,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.AddBaseDataFile, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 基础文件生成geojson文件,返回点位数量
	* @param dataid undefined
	* @param value undefined
	* @param nameCol undefined
	* @param xCol undefined
	* @param yCol undefined
	* @param zCol undefined
	* @param code undefined
	*/
	export async function GenerateGeojsonFile(dataid:string,value:string,nameCol:number,xCol:number,yCol:number,zCol:number,code:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:number}>{
		const response=await requestPost(APIKey.GenerateGeojsonFile, baseURL,undefined,{dataid,value,nameCol,xCol,yCol,zCol,code},headers,responseType,timeoutMS);
		return {response,data:response?.data as number};
	}
	/**
	* 基础数据编辑其中数据
	* @param bodyParams DataEditModel
	*/
	export async function UpdateDatabaseData(bodyParams:DataEditModel,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.UpdateDatabaseData, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 下载基础数据的shp文件
	* @param id undefined
	*/
	export async function DownloadDatabaseGeojson(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.DownloadDatabaseGeojson, baseURL,{id},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 基础数据备份
	* @param id undefined
	* @param newName undefined
	*/
	export async function DatabaseBakcup(id:string,newName:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.DatabaseBakcup, baseURL,undefined,{id,newName},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* undefined
	* @param bodyParams string[]
	*/
	export async function DeleteDatabaseList(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteDatabaseList, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取数据的所包含数据
	* @param id 
	*/
	export async function GetDatarepoList(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:Datarepo[]}>{
		const response=await requestGet(APIKey.GetDatarepoList, baseURL,{id},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as Datarepo[]};
	}
	/**
	* 获取数据的浏览地址
	* @param id 
	*/
	export async function GetDataBrowseLink(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestGet(APIKey.GetDataBrowseLink, baseURL,{id},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 创建分享
	* @param servicetype 数据类型：1-基础数据；2-栅格数据；3-矢量数据；4-影像数据；
            5-三维数据；6-水文地质；7-气象数据；8-重点目标；9-电磁数据；
	* @param sourceid 服务id
	*/
	export async function CreateShareService(servicetype:number,sourceid:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.CreateShareService, baseURL,undefined,{servicetype,sourceid},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 取消分享
	* @param servicetype 数据类型：1-基础数据；2-栅格数据；3-矢量数据；4-影像数据；
            5-三维数据；6-水文地质；7-气象数据；8-重点目标；9-电磁数据；
	* @param sourceid 服务id
	*/
	export async function DeleteShareService(servicetype:number,sourceid:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.DeleteShareService, baseURL,undefined,{servicetype,sourceid},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取共享key
	* @param type 数据类型：1-基础数据；2-栅格数据；3-矢量数据；4-影像数据；
            5-三维数据；6-水文地质；7-气象数据；8-重点目标；9-电磁数据；10-二维地形；
	* @param pageIndex 
	* @param pageSize 
	* @param name 
	*/
	export async function SelectShareServiceKeyList(type:number,pageIndex:number,pageSize:number,name:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.SelectShareServiceKeyList, baseURL,{type,pageIndex,pageSize,name},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取已分享服务的列表
	* @param searchKey 
	* @param type 数据类型：1-基础数据；2-栅格数据；3-矢量数据；4-影像数据；
            5-三维数据；6-水文地质；7-气象数据；8-重点目标；9-电磁数据；10-二维地形；
	* @param pageIndex 
	* @param pageSize 
	*/
	export async function SelectShareServiceList(searchKey:string,type:number,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.SelectShareServiceList, baseURL,{searchKey,type,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 备份数据库
	* @param dbName undefined
	*/
	export async function BackupDatabase(dbName:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPost(APIKey.BackupDatabase, baseURL,undefined,{dbName},headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 还原数据库
	* @param id 备份记录id
	*/
	export async function RestoreDatabase(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.RestoreDatabase, baseURL,undefined,{id},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取数据名称列表
	*/
	export async function GetDbNames(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string[]}>{
		const response=await requestGet(APIKey.GetDbNames, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string[]};
	}
	/**
	* 删除数据库备份
	* @param id 
	*/
	export async function DeleteDbBackup(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.DeleteDbBackup, baseURL,{id},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取数据库备份列表
	* @param keyword undefined
	* @param pageIndex undefined
	* @param pageSize undefined
	*/
	export async function GetDbBackupList(keyword:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:DbbackupPageList}>{
		const response=await requestGet(APIKey.GetDbBackupList, baseURL,{keyword,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as DbbackupPageList};
	}
	/**
	* 备份
	* @param dbName 数据库名
	*/
	export async function Backup(dbName:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.Backup, baseURL,undefined,{dbName},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 还原
	* @param dbName 数据库名
	* @param backupFile 备份文件路径
	*/
	export async function Restore(dbName:string,backupFile:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.Restore, baseURL,undefined,{dbName,backupFile},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取备份列表
	* @param dbName 数据库名
	*/
	export async function GetBackupList(dbName:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string[]}>{
		const response=await requestGet(APIKey.GetBackupList, baseURL,{dbName},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string[]};
	}
	/**
	* 获取数据库模板名称的列表(生产数据库)
	*/
	export async function GetproDbList(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string[]}>{
		const response=await requestGet(APIKey.GetproDbList, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string[]};
	}
	/**
	* 获取数据库的列表(演示数据库)
	* @param hostname 主机名
	*/
	export async function GetDemoDbList(hostname:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string[]}>{
		const response=await requestGet(APIKey.GetDemoDbList, baseURL,{hostname},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string[]};
	}
	/**
	* 初始化数据库（演示环境）
	* @param dbName 数据库名
	* @param templateName 数据库模板名称
	*/
	export async function InitDemoDb(dbName:string,templateName:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.InitDemoDb, baseURL,undefined,{dbName,templateName},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 初始化演示数据库环境
	*/
	export async function InitDemoDbEnv(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.InitDemoDbEnv, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 添加数据
	* @param bodyParams Imageinfo
	*/
	export async function AddData(bodyParams:Imageinfo,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPostBody(APIKey.AddData, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 删除数据
	* @param bodyParams string[]
	*/
	export async function DeleteData(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteData, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 更新数据状态和应用状态
	* @param id 
	* @param status 
	* @param applystatus 
	*/
	export async function UpdateDataStatus(id:string,status:boolean,applystatus:boolean,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.UpdateDataStatus, baseURL,undefined,{id,status,applystatus},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取数据列表
	* @param pageIndex 
	* @param pageSize 
	* @param search 
	* @param serviceType 服务类型：必填项，数字高程模型；数字正射影像
	*/
	export async function GetDataList(pageIndex:number,pageSize:number,search:string,serviceType:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:ImageinfoPageList}>{
		const response=await requestPost(APIKey.GetDataList, baseURL,undefined,{pageIndex,pageSize,search,serviceType},headers,responseType,timeoutMS);
		return {response,data:response?.data as ImageinfoPageList};
	}
	/**
	* 获取数据浏览地址
	* @param id 
	*/
	export async function GetDataBrowseUrl(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPost(APIKey.GetDataBrowseUrl, baseURL,undefined,{id},headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 获取数字正射影像瓦片
	* @param id 
	* @param z 
	* @param x 
	* @param y 
	*/
	export async function image(id:string,z:number,x:number,y:number,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.image.replace('{id}',id).replace('{z}',z).replace('{x}',x).replace('{y}',y)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取数字高程模型元数据文件内容
	* @param id 
	*/
	export async function terrain(id:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.terrain.replace('{id}',id)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取高程数字模型瓦片
	* @param id 
	* @param z 
	* @param x 
	* @param y 
	*/
	export async function terrain1(id:string,z:number,x:number,y:number,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.terrain1.replace('{id}',id).replace('{z}',z).replace('{x}',x).replace('{y}',y)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 矩形范围查询
	* @param zoom 
	* @param x1 
	* @param y1 
	* @param x2 
	* @param y2 
	*/
	export async function GetPointByRange(zoom:number,x1:number,y1:number,x2:number,y2:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:StringPoint[]}>{
		const response=await requestGet(APIKey.GetPointByRange, baseURL,{zoom,x1,y1,x2,y2},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as StringPoint[]};
	}
	/**
	* 点位半径搜索
	* @param zoom 
	* @param x1 
	* @param y1 
	* @param radius 
	*/
	export async function GetPointByRadius(zoom:number,x1:number,y1:number,radius:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:StringPoint[]}>{
		const response=await requestGet(APIKey.GetPointByRadius, baseURL,{zoom,x1,y1,radius},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as StringPoint[]};
	}
	/**
	* 创建一个地图
	* @param bodyParams Mapinfo
	*/
	export async function AddMapinfo(bodyParams:Mapinfo,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPostBody(APIKey.AddMapinfo, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 删除一个地图
	* @param id 
	*/
	export async function DeleteMapinfo(id:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:boolean}>{
		const realPath=APIKey.DeleteMapinfo.replace('{id}',id)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除地图列表
	* @param bodyParams string[]
	*/
	export async function DeleteMapinfos(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteMapinfos, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 地图属性编辑
	* @param id id
	* @param name 名称
	* @param version 版本
	*/
	export async function EditMapinfo(id:string,name:string,version:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.EditMapinfo, baseURL,{id,name,version},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 查询地图列表
	* @param keyword 
	* @param pageIndex 
	* @param pageSize 
	*/
	export async function GetMapinfos(keyword:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:MapinfoPageList}>{
		const response=await requestGet(APIKey.GetMapinfos, baseURL,{keyword,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as MapinfoPageList};
	}
	/**
	* 获取地图工程预览浏览接口
	* @param id 
	*/
	export async function GetPreview(id:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:string}>{
		const realPath=APIKey.GetPreview.replace('{id}',id)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 更新二维航空要素底图显隐
	* @param mapid 地图id
	* @param tileid 栅格图层id
	* @param visibility 
	*/
	export async function UpdateTileVisibility(mapid:string,tileid:string,visibility:boolean,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.UpdateTileVisibility, baseURL,{mapid,tileid,visibility},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取二维航空要素底图中没有添加的栅格底图
	* @param id 
	*/
	export async function GetMissingTiles(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:Mapinfo[]}>{
		const response=await requestGet(APIKey.GetMissingTiles, baseURL,{id},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as Mapinfo[]};
	}
	/**
	* 添加栅格底图到二维航空要素底图
	* @param id 
	* @param tileId 
	* @param visibility 是否在底图工程中渲染
	* @param display 图层显示名
	*/
	export async function AddTileToVtpk(id:string,tileId:string,visibility:boolean,display:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.AddTileToVtpk, baseURL,{id,tileId,visibility,display},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取zip格式基础地图瓦片
	* @param id 
	* @param z undefined
	* @param x undefined
	* @param y undefined
	*/
	export async function GetTile(id:string,z:number,x:number,y:number,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.GetTile.replace('{id}',id).replace('{z}',z).replace('{x}',x).replace('{y}',y)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取stylejson文件
	* @param layerId 服务ID
	*/
	export async function GetStyleJson(layerId:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.GetStyleJson, baseURL,{layerId},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取sprite文件
	* @param layerId 服务ID
	* @param spritefilename 雪碧图文件名
	*/
	export async function resources(layerId:string,spritefilename:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.resources.replace('{layerId}',layerId).replace('{spritefilename}',spritefilename)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取字体文件
	* @param layerId 服务ID
	* @param fontstack 字体栈
	* @param range 字体范围
	*/
	export async function resources1(layerId:string,fontstack:string,range:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.resources1.replace('{layerId}',layerId).replace('{fontstack}',fontstack).replace('{range}',range)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取瓦片文件
	* @param layerId 服务ID
	* @param z 缩放级别
	* @param x X坐标
	* @param y Y坐标
	*/
	export async function tile(layerId:string,z:number,x:number,y:number,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.tile.replace('{layerId}',layerId).replace('{z}',z).replace('{x}',x).replace('{y}',y)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 拷贝模型文件
	* @param modelid 
	* @param newname undefined
	*/
	export async function CopyModelFile(modelid:string,newname:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPost(APIKey.CopyModelFile, baseURL,undefined,{modelid,newname},headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 获取模型原始文件
	* @param modelid 模型id
	* @param modelname 模型名称
	*/
	export async function file(modelid:string,modelname:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.file.replace('{modelid}',modelid).replace('{modelname}',modelname)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取模型原始文件
	* @param modelid 模型id
	* @param modelname 模型名称
	*/
	export async function file1(modelid:string,modelname:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.file1.replace('{modelid}',modelid).replace('{modelname}',modelname)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取模型原始文件
	* @param modelid 模型id
	* @param modelname 模型名称
	*/
	export async function file2(modelid:string,modelname:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.file2.replace('{modelid}',modelid).replace('{modelname}',modelname)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取模型原始文件
	* @param modelid 模型id
	* @param modelname 模型名称
	*/
	export async function file3(modelid:string,modelname:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.file3.replace('{modelid}',modelid).replace('{modelname}',modelname)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取模型原始文件
	* @param modelid 模型id
	* @param modelname 模型名称
	*/
	export async function file4(modelid:string,modelname:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.file4.replace('{modelid}',modelid).replace('{modelname}',modelname)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取模型原始文件
	* @param modelid 模型id
	* @param modelname 模型名称
	*/
	export async function file5(modelid:string,modelname:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.file5.replace('{modelid}',modelid).replace('{modelname}',modelname)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取模型切片文件
	* @param modelid 
	* @param x 
	* @param y 
	*/
	export async function model(modelid:string,x:string,y:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.model.replace('{modelid}',modelid).replace('{x}',x).replace('{y}',y)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取模型切片文件
	* @param modelid 
	* @param data 
	* @param x 
	* @param y 
	*/
	export async function model1(modelid:string,data:string,x:string,y:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.model1.replace('{modelid}',modelid).replace('{data}',data).replace('{x}',x).replace('{y}',y)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取模型切片文件
	* @param modelid 
	* @param data 
	*/
	export async function model2(modelid:string,data:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.model2.replace('{modelid}',modelid).replace('{data}',data)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取模型json文件
	* @param modelid 
	* @param json 
	*/
	export async function model3(modelid:string,json:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.model3.replace('{modelid}',modelid).replace('{json}',json)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取所有模型列表
	* @param type 
	* @param keyword 
	* @param pageindex 
	* @param pagesize 
	* @param starttime 
	* @param endtime 
	* @param type2 高精度地形子类型
	*/
	export async function GetModelList(type:number,keyword:string,pageindex:number,pagesize:number,starttime:string,endtime:string,type2:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:DatainfoPageList}>{
		const response=await requestGet(APIKey.GetModelList, baseURL,{type,keyword,pageindex,pagesize,starttime,endtime,type2},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as DatainfoPageList};
	}
	/**
	* 获取单个模型信息
	* @param modelid 
	*/
	export async function GetModelInfo(modelid:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:Datainfo}>{
		const response=await requestGet(APIKey.GetModelInfo, baseURL,{modelid},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as Datainfo};
	}
	/**
	* 数据保存(文件系统数据)
	* @param bodyParams SyncVFile
	*/
	export async function SaveDataSysFile(bodyParams:SyncVFile,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.SaveDataSysFile, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 三维数据保存
	* @param bodyParams Datainfo
	*/
	export async function SaveDataFile(bodyParams:Datainfo,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.SaveDataFile, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 修改模型
	* @param id 文件系统id
	* @param name 名称
	* @param content undefined
	* @param source undefined
	* @param mass undefined
	* @param precision undefined
	* @param scope undefined
	* @param crs undefined
	*/
	export async function UpdateModelInfo(id:string,name:string,content:string,source:string,mass:string,precision:string,scope:string,crs:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.UpdateModelInfo, baseURL,{id,name,content,source,mass,precision,scope,crs},undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除模型列表
	* @param bodyParams string[]
	*/
	export async function DeleteModelList(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteModelList, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 单体模型数据保存
	* @param bodyParams Datainfo
	*/
	export async function SaveSingleModelFile(bodyParams:Datainfo,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.SaveSingleModelFile, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取单体模型分类目录
	*/
	export async function GetSingleModelCatalog(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string[]}>{
		const response=await requestGet(APIKey.GetSingleModelCatalog, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string[]};
	}
	/**
	* 获取单体模型列表
	* @param catalog 类别目录
	* @param keyword 关键字
	* @param pageindex 
	* @param pagesize 
	*/
	export async function GetSingleModelList(catalog:string,keyword:string,pageindex:number,pagesize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:DatainfoPageList}>{
		const response=await requestGet(APIKey.GetSingleModelList, baseURL,{catalog,keyword,pageindex,pagesize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as DatainfoPageList};
	}
	/**
	* 单体模型 属性编辑
	* @param id 
	* @param name 
	* @param content 
	* @param catalog 
	* @param thumb 
	*/
	export async function UpdateSingleModel(id:string,name:string,content:string,catalog:string,thumb:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.UpdateSingleModel, baseURL,{id,name,content,catalog,thumb},undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除单体模型
	* @param bodyParams string[]
	*/
	export async function DeleteSingleModels(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteSingleModels, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 验证文件格式是否正确
	* @param value 
	*/
	export async function CheckFileSys(value:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.CheckFileSys, baseURL,{value},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 验证文件是否已经存在
	* @param value 
	*/
	export async function CheckFileSysExist(value:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.CheckFileSysExist, baseURL,{value},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 数据发布为服务,通用，三维模型（0倾斜模型,1点云,2BIM模型.3地形,4矢量）+单体等
	* @param id 
	*/
	export async function DataPublishService(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.DataPublishService, baseURL,{id},undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* undefined
	* @param filepath undefined
	*/
	export async function CheckOsgbXml(filepath:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:StringStringTuple}>{
		const response=await requestGet(APIKey.CheckOsgbXml, baseURL,{filepath},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as StringStringTuple};
	}
	/**
	* undefined
	*/
	export async function Testunzip(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.Testunzip, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 数据发布为服务,倾斜模型
	* @param maxZoom 切片最大级别（只有地形使用）
	* @param id 
	*/
	export async function DataPublishServiceNew(maxZoom:number,id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.DataPublishServiceNew, baseURL,{id},{maxZoom},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 三维切片成果导出
	* @param id 
	* @param fileSystemID 
	* @param userID 
	* @param saveFolder 
	* @param format zip/db
	*/
	export async function Export3DtilesZip(id:string,fileSystemID:string,userID:string,saveFolder:string,format:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.Export3DtilesZip, baseURL,undefined,{id,fileSystemID,userID,saveFolder,format},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 图片数据导出
	* @param id 
	* @param fileSystemID 
	* @param userID 
	* @param saveFolder 
	* @param format zip/db
	* @param type 图片数据/文档资料数据
	*/
	export async function ExportImageZip(id:string,fileSystemID:string,userID:string,saveFolder:string,format:string,type:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.ExportImageZip, baseURL,undefined,{id,fileSystemID,userID,saveFolder,format,type},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 军民航资料打包导出
	* @param fileSystemID 
	* @param userID 
	* @param saveFolder 
	* @param format undefined
	*/
	export async function ExportHangTuFilesZip(fileSystemID:string,userID:string,saveFolder:string,format:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.ExportHangTuFilesZip, baseURL,undefined,{fileSystemID,userID,saveFolder,format},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* undefined
	* @param fileSystemID undefined
	* @param userID undefined
	* @param saveFolder undefined
	*/
	export async function TestExportHangTuFilesZipTest(fileSystemID:string,userID:string,saveFolder:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.TestExportHangTuFilesZipTest, baseURL,undefined,{fileSystemID,userID,saveFolder},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 栅格数据打包
	* @param name 服务名称
	* @param fileSystemID 文件系统ID
	* @param userID 用户ID
	* @param saveFolder 保存文件夹
	* @param format 打包格式(zip/db)
	*/
	export async function PackRasterTiles(name:string,fileSystemID:string,userID:string,saveFolder:string,format:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.PackRasterTiles, baseURL,{name,fileSystemID,userID,saveFolder,format},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* undefined
	* @param dbPath undefined
	* @param zipPath undefined
	*/
	export async function Zip2DbFile(dbPath:string,zipPath:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.Zip2DbFile, baseURL,{dbPath,zipPath},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* undefined
	*/
	export async function hubtest(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.hubtest, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 倾斜摄影数据列表查询
	*/
	export async function list(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string[]}>{
		const response=await requestGet(APIKey.list, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string[]};
	}
	/**
	* 获取倾斜摄影切片数据json
	* @param name 模型名称
	* @param jsonname json文件名称
	*/
	export async function obliquephotography(name:string,jsonname:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.obliquephotography.replace('{name}',name).replace('{jsonname}',jsonname)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取倾斜摄影切片数据
	* @param name 模型名称
	* @param path 路径
	* @param path1 undefined
	* @param path2 undefined
	*/
	export async function obliquephotography1(name:string,path:string,path1:string,path2:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.obliquephotography1.replace('{name}',name).replace('{path}',path).replace('{path1}',path1).replace('{path2}',path2)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取倾斜摄影切片数据
	* @param name 模型名称
	* @param path 路径
	* @param path1 undefined
	*/
	export async function obliquephotography2(name:string,path:string,path1:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.obliquephotography2.replace('{name}',name).replace('{path}',path).replace('{path1}',path1)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取倾斜摄影切片数据
	* @param name 模型名称
	* @param path 路径
	*/
	export async function obliquephotography3(name:string,path:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.obliquephotography3.replace('{name}',name).replace('{path}',path)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* undefined
	* @param path undefined
	*/
	export async function ToUniversalPath1(path:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestGet(APIKey.ToUniversalPath1, baseURL,{path},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* undefined
	*/
	export async function testpythonenv(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.testpythonenv, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 插入数据
	* @param filePath 数量数据路径
	* @param bodyParams any
	*/
	export async function Insert(filePath:string,bodyParams:any,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPostBody(APIKey.Insert, baseURL,bodyParams,{filePath},headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* undefined
	* @param id undefined
	*/
	export async function Delete(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.Delete, baseURL,{id},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* undefined
	* @param bodyParams Poi
	*/
	export async function Update(bodyParams:Poi,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPostBody(APIKey.Update, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* undefined
	* @param query undefined
	* @param pageIndex undefined
	* @param pageSize undefined
	*/
	export async function Search(query:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.Search, baseURL,{query,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* undefined
	* @param query undefined
	* @param pageIndex undefined
	* @param pageSize undefined
	* @param bodyParams [][]
	*/
	export async function SearchByGeoPolygon(query:string,pageIndex:number,pageSize:number,bodyParams:[][],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestPostBody(APIKey.SearchByGeoPolygon, baseURL,bodyParams,{query,pageIndex,pageSize},headers,responseType,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* undefined
	* @param filePath undefined
	*/
	export async function GetFiledList(filePath:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string[]}>{
		const response=await requestGet(APIKey.GetFiledList, baseURL,{filePath},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string[]};
	}
	/**
	* 根据文件路径，获取其坐标系代码
	* @param filePath 矢量或影像文件路径
	*/
	export async function GetEPSGCode(filePath:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestGet(APIKey.GetEPSGCode, baseURL,{filePath},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 矢量数据坐标转换，批处理
	* @param bodyParams VectorCoordinateTransformation[]
	*/
	export async function VectorCoordinateTransformation(bodyParams:VectorCoordinateTransformation[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.VectorCoordinateTransformation, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 栅格数据坐标转换，批处理
	* @param bodyParams ImageCoordinateTransformation[]
	*/
	export async function ImageCoordinateTransformation(bodyParams:ImageCoordinateTransformation[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.ImageCoordinateTransformation, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 矢量数据空间匹配（配准）
	* @param bodyParams VectorSpaceRegistration
	*/
	export async function VectorSpaceRegistration(bodyParams:VectorSpaceRegistration,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.VectorSpaceRegistration, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 栅格数据空间匹配（配准）
	* @param bodyParams ImageSpaceRegistration
	*/
	export async function ImageSpaceRegistration(bodyParams:ImageSpaceRegistration,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.ImageSpaceRegistration, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 高程基准列表
	*/
	export async function ElevationList(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string[]}>{
		const response=await requestGet(APIKey.ElevationList, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string[]};
	}
	/**
	* 高程转换--通过文件（csv、xls、xlsx、shp、geojson、kml）
	* @param filePath 源文件路径
	* @param savePath 保存文件路径，需带后缀
	* @param sourceElevation 源高程基准
	* @param targetElevation 目标
	* @param ZFieldName 
	* @param FileSystemID undefined
	* @param userID undefined
	*/
	export async function ElevationConvert(filePath:string,savePath:string,sourceElevation:string,targetElevation:string,ZFieldName:string,FileSystemID:string,userID:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.ElevationConvert, baseURL,undefined,{filePath,savePath,sourceElevation,targetElevation,ZFieldName,FileSystemID,userID},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 影像合并
	* @param bodyParams ImageMerge
	*/
	export async function ImageMerge(bodyParams:ImageMerge,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.ImageMerge, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 匀光匀色
	* @param bodyParams UniformColor
	*/
	export async function UniformColor(bodyParams:UniformColor,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.UniformColor, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 图像锐化
	* @param bodyParams Sharpen
	*/
	export async function ImageSharpen(bodyParams:Sharpen,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.ImageSharpen, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 新建实时影像数据
	* @param name 影像名称
	* @param filepath 影像文件路径
	* @param vid 影像ID
	* @param date 影像日期
	* @param version 影像版本
	*/
	export async function CreateRealTimeImage(name:string,filepath:string,vid:string,date:string,version:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.CreateRealTimeImage, baseURL,{name,filepath,vid,date,version},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除实时影像数据
	* @param bodyParams string[]
	*/
	export async function DeleteRealTimeImage(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteRealTimeImage, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取实时影像数据列表
	* @param startDate 开始日期
	* @param endDate 结束日期
	* @param name 名称
	* @param pageIndex 页码
	* @param pageSize 页容量
	*/
	export async function GetRealTimeImageList(startDate:string,endDate:string,name:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:RealtimedataPageList}>{
		const response=await requestPost(APIKey.GetRealTimeImageList, baseURL,undefined,{startDate,endDate,name,pageIndex,pageSize},headers,responseType,timeoutMS);
		return {response,data:response?.data as RealtimedataPageList};
	}
	/**
	* 更新影像数据
	* @param id 时相信息ID
	* @param filepath 影像文件路径
	* @param vid 影像VID
	* @param name 影像名称
	* @param date 影像日期
	* @param version 影像版本
	*/
	export async function UpdateRealTimeImage(id:string,filepath:string,vid:string,name:string,date:string,version:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.UpdateRealTimeImage, baseURL,{id,filepath,vid,name,date,version},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 更新元数据
	* @param id 时相信息ID
	* @param name 影像名称
	* @param date 影像日期
	* @param version 影像版本
	* @param bounds 影像范围
	*/
	export async function UpdateRealTimeImageMeta(id:string,name:string,date:string,version:string,bounds:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.UpdateRealTimeImageMeta, baseURL,{id,name,date,version,bounds},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* undefined
	* @param filePath undefined
	*/
	export async function Insert1(filePath:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestGet(APIKey.Insert1, baseURL,{filePath},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 获取视频列表（从文件系统）
	* @param keyword 关键字，文件名
	* @param pageIndex 页码
	* @param pageSize 页大小
	*/
	export async function GetVideoList(keyword:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.GetVideoList, baseURL,{keyword,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取视频列表（三维场景绑定的视频列表）
	* @param sceneid 场景id
	* @param keyword 关键字，文件名
	* @param pageIndex 页码
	* @param pageSize 页大小
	*/
	export async function GetVideoListByScene(sceneid:string,keyword:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:ScenemediaPageList}>{
		const response=await requestGet(APIKey.GetVideoListByScene, baseURL,{sceneid,keyword,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as ScenemediaPageList};
	}
	/**
	* 添加视频到场景
	* @param sceneid 场景id
	* @param mediaid 视频id(从数管系统获取的id)
	* @param mediaName 视频名称
	* @param longitude 经度
	* @param latitude 纬度
	* @param altitude 高度
	* @param extName 媒体文件扩展名
	*/
	export async function AddVideoToScene(sceneid:string,mediaid:string,mediaName:string,longitude:number,latitude:number,altitude:number,extName:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPost(APIKey.AddVideoToScene, baseURL,undefined,{sceneid,mediaid,mediaName,longitude,latitude,altitude,extName},headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 删除视频从场景
<param name="mediaid">视频id（三维场景中的视频id）</param>
	* @param mediaid undefined
	*/
	export async function DeleteVideoFromScene(mediaid:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.DeleteVideoFromScene, baseURL,undefined,{mediaid},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 更新视频信息
<param name="mediaid">视频id（三维场景中的视频id）</param><param name="mediaName">视频名称</param><param name="longitude">经度</param><param name="latitude">纬度</param><param name="altitude">高度</param>
	* @param mediaid undefined
	* @param mediaName undefined
	* @param longitude undefined
	* @param latitude undefined
	* @param altitude undefined
	*/
	export async function UpdateVideoInfo(mediaid:string,mediaName:string,longitude:number,latitude:number,altitude:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.UpdateVideoInfo, baseURL,undefined,{mediaid,mediaName,longitude,latitude,altitude},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 更新场景缩略图
	* @param id 场景id
	* @param filestream 图片二进制流
	*/
	export async function UpdateScene3dThumbnail(id:string,filestream:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.UpdateScene3dThumbnail, baseURL,{filestream},{id},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取场景缩略图
	* @param id 场景id
	*/
	export async function GetScene3dThumbnail(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.GetScene3dThumbnail, baseURL,{id},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 从上传的json文件导入场景数据
	* @param id 场景id（如果为空新建一个场景，否则更新指定场景）
	* @param type 0-场景数据,1-场景布局数据,2-态势演播
	* @param file 
	*/
	export async function ImportScene3d(id:string,type:number,file:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPost(APIKey.ImportScene3d, baseURL,{file},{id,type},headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 导出场景数据为json文件
	* @param id 
	*/
	export async function ExportScene3d(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.ExportScene3d, baseURL,{id},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 场景新建
	* @param id 场景id（如果为空新建一个场景，否则更新指定场景）
	* @param type 0-场景数据,1-场景布局数据,2-态势演播,3-脚本管理
	* @param sceneid 当类型为脚本并且并且时新建时需要传入脚本绑定的场景id
	* @param scene3Dobject 三维场景对象
	*/
	export async function CreateScene3d(id:string,type:number,sceneid:string,scene3Dobject:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestGet(APIKey.CreateScene3d, baseURL,{id,type,sceneid,scene3Dobject},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 获取场景对象
	* @param id 场景id
	*/
	export async function GetScene3dById(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:Scene3d}>{
		const response=await requestGet(APIKey.GetScene3dById, baseURL,{id},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as Scene3d};
	}
	/**
	* 获取场景对象
	* @param name 场景名称
	* @param isthrow 是否抛出异常
	*/
	export async function GetScene3dByName(name:string,isthrow:boolean,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:Scene3d}>{
		const response=await requestGet(APIKey.GetScene3dByName, baseURL,{name,isthrow},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as Scene3d};
	}
	/**
	* 更新场景数据--旧的
	* @param id 场景id
	* @param scene3Dobject 场景数据
	*/
	export async function UpdateScene3d(id:string,scene3Dobject:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.UpdateScene3d, baseURL,{id,scene3Dobject},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 添加or更新 场景数据中的图层树
	* @param id 场景id
	* @param fulllayersjson 场景中的图层数据json
	*/
	export async function AddorUpdateScene3dLayers(id:string,fulllayersjson:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.AddorUpdateScene3dLayers, baseURL,undefined,{id,fulllayersjson},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 添加or更新 场景数据中的局部单体模型
	* @param id 场景id
	* @param modeljson 场景中的模型数据json,其中entityId属性存在则更新，为空或不存在则新增
	*/
	export async function AddorUpdateScene3dModel(id:string,modeljson:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.AddorUpdateScene3dModel, baseURL,undefined,{id,modeljson},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除场景数据中的模型
	* @param id undefined
	* @param bodyParams string[]
	*/
	export async function DeleteScene3dModel(id:string,bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteScene3dModel, baseURL,bodyParams,{id},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 添加or更新 场景数据中的标绘信息
	* @param id 场景id
	* @param plotjson 场景中的标绘数据json,其中entityId属性存在则更新，为空或不存在则新增
	*/
	export async function AddorUpdateScene3dPlot(id:string,plotjson:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.AddorUpdateScene3dPlot, baseURL,undefined,{id,plotjson},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除场景数据中的标绘数据
	* @param id undefined
	* @param bodyParams string[]
	*/
	export async function DeleteScene3dPlot(id:string,bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteScene3dPlot, baseURL,bodyParams,{id},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除场景数据（多条）
	* @param bodyParams string[]
	*/
	export async function DeleteScene3ds(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string[]}>{
		const response=await requestPostBody(APIKey.DeleteScene3ds, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as string[]};
	}
	/**
	* 删除场景数据
	* @param id 场景id
	*/
	export async function DeleteScene3d(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.DeleteScene3d, baseURL,{id},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取场景列表
	* @param type 场景类型
	* @param keyword 关键字
	* @param starttime 开始时间
	* @param endtime 结束时间
	* @param psceneid 父场景id：空表示获取所有场景或脚本等，非空表示获取场景下的布局或脚本
	* @param pageIndex 页码
	* @param pageSize 页大小
	*/
	export async function GetScene3dList(type:number,keyword:string,starttime:string,endtime:string,psceneid:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:Scene3dPageList}>{
		const response=await requestGet(APIKey.GetScene3dList, baseURL,{type,keyword,starttime,endtime,psceneid,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as Scene3dPageList};
	}
	/**
	* 拷贝一个场景
	* @param id 场景id
	* @param name 场景名称（新的场景名称）
	*/
	export async function CopyScene3d(id:string,name:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestGet(APIKey.CopyScene3d, baseURL,{id,name},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 添加布局到场景
	* @param scene3dId 场景id
	* @param bodyParams string[]
	*/
	export async function AddLayoutToScene3d(scene3dId:string,bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.AddLayoutToScene3d, baseURL,bodyParams,{scene3dId},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* undefined
	* @param scene3dId undefined
	*/
	export async function GetNewScene3dLayoutList(scene3dId:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:Scene3d[]}>{
		const response=await requestGet(APIKey.GetNewScene3dLayoutList, baseURL,{scene3dId},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as Scene3d[]};
	}
	/**
	* undefined
	* @param scene3dId undefined
	* @param layoutId undefined
	*/
	export async function RemoveLayoutFromScene3d(scene3dId:string,layoutId:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.RemoveLayoutFromScene3d, baseURL,{scene3dId,layoutId},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取场景的布局列表
	* @param scene3dId 场景id
	*/
	export async function GetScene3dLayoutList(scene3dId:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:Scene3d[]}>{
		const response=await requestGet(APIKey.GetScene3dLayoutList, baseURL,{scene3dId},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as Scene3d[]};
	}
	/**
	* 模型分页，查询检索
	* @param scene3dId 场景id
	* @param type 类别信息
	* @param keywords 模糊查询关键字
	* @param geojson geojson格式空间信息{"coordinates": [[[x,y],[x1,y1],……]],"type": "Polygon"}
	* @param pageIndex 页码
	* @param pageSize 每页个数
	*/
	export async function SearchModels(scene3dId:string,type:string,keywords:string,geojson:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPost(APIKey.SearchModels, baseURL,undefined,{scene3dId,type,keywords,geojson,pageIndex,pageSize},headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 分类统计
	* @param scene3dId 场景id
	* @param keywords 模糊查询关键字
	* @param geojson geojson格式空间信息{"coordinates": [[[x,y],[x1,y1],……]],"type": "Polygon"}
	*/
	export async function ModelStatistics(scene3dId:string,keywords:string,geojson:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPost(APIKey.ModelStatistics, baseURL,undefined,{scene3dId,keywords,geojson},headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* undefined
	*/
	export async function GetDataCount(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:StatisticalVM[]}>{
		const response=await requestGet(APIKey.GetDataCount, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as StatisticalVM[]};
	}
	/**
	* undefined
	* @param type undefined
	* @param year undefined
	* @param month undefined
	*/
	export async function GetDataInsertCount(type:number,year:number,month:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:StatisticalVM[]}>{
		const response=await requestGet(APIKey.GetDataInsertCount, baseURL,{type,year,month},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as StatisticalVM[]};
	}
	/**
	* undefined
	* @param count undefined
	*/
	export async function GetServiceDataCount(count:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:StatisticalVM[]}>{
		const response=await requestGet(APIKey.GetServiceDataCount, baseURL,{count},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as StatisticalVM[]};
	}
	/**
	* 获取数据总量（数据实际大小）
	*/
	export async function GetDataTotalSize(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:number}>{
		const response=await requestGet(APIKey.GetDataTotalSize, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as number};
	}
	/**
	* 数据分类统计（数据的实际大小）
	*/
	export async function GetDataCategorySize(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:StatisticalVM[]}>{
		const response=await requestGet(APIKey.GetDataCategorySize, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as StatisticalVM[]};
	}
	/**
	* 获取总数据量（数据数量）
	*/
	export async function GetDataTotalCount(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:number}>{
		const response=await requestGet(APIKey.GetDataTotalCount, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as number};
	}
	/**
	* 获取数据分类统计（数据的数量）
	*/
	export async function GetDataCategoryCount(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:StatisticalVM[]}>{
		const response=await requestGet(APIKey.GetDataCategoryCount, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as StatisticalVM[]};
	}
	/**
	* 服务数量统计
	*/
	export async function GetServiceCount(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:StatisticalVM[]}>{
		const response=await requestGet(APIKey.GetServiceCount, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as StatisticalVM[]};
	}
	/**
	* 按月统计数据量（上传数据量）
	*/
	export async function GetDataInsertCountByMonth(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:StatisticalVM[]}>{
		const response=await requestGet(APIKey.GetDataInsertCountByMonth, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as StatisticalVM[]};
	}
	/**
	* 获取源数据列表
	* @param searchKey 
	* @param type 数据类型：1-基础数据；2-栅格数据；3-矢量数据；4-影像数据；
            5-三维数据；6-水文地质；7-气象数据；8-重点目标；9-电磁数据；
	* @param pageIndex 
	* @param pageSize 
	*/
	export async function GetSourceDataList(searchKey:string,type:number,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:MyMetadataPageList}>{
		const response=await requestGet(APIKey.GetSourceDataList, baseURL,{searchKey,type,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as MyMetadataPageList};
	}
	/**
	* 导出元数据列表
	* @param searchKey 
	* @param type 数据类型：1-基础数据；2-栅格数据；3-矢量数据；4-影像数据；
            5-三维数据；6-水文地质；7-气象数据；8-重点目标；9-电磁数据；
	* @param pageIndex 
	* @param pageSize 
	*/
	export async function ExportSourceDataList(searchKey:string,type:number,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.ExportSourceDataList, baseURL,{searchKey,type,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 导入元数据
	* @param type 数据类型：1-基础数据；2-栅格数据；3-矢量数据；4-影像数据；
            5-三维数据；6-水文地质；7-气象数据；8-重点目标；9-电磁数据；
	* @param file 
	*/
	export async function ImportSourceData(type:number,file:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.ImportSourceData, baseURL,{file},{type},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 更新元数据信息
	* @param servicetype 数据类型：1-基础数据；2-栅格数据；3-矢量数据；4-影像数据；
            5-三维数据；6-水文地质；7-气象数据；8-重点目标；9-电磁数据；
	* @param id 
	* @param name 
	* @param content 
	* @param type 
	* @param scope 
	* @param source 
	* @param format 
	* @param crs 
	* @param mass 
	* @param precision 
	*/
	export async function UpdateSourceData(servicetype:number,id:string,name:string,content:string,type:number,scope:string,source:string,format:string,crs:string,mass:string,precision:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.UpdateSourceData, baseURL,undefined,{servicetype,id,name,content,type,scope,source,format,crs,mass,precision},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 创建二维地形 Terrain-rgb
	* @param fileDEM 地形数据路径
	* @param fileRGB RGB切片数据路径(可以为空, 为空时默认输出到 /data/output/terrain-rgb/)
	* @param minZoom 切片最小缩放级别
	* @param maxZoom 切片最大缩放级别
	*/
	export async function CreateTerrainRGB(fileDEM:string,fileRGB:string,minZoom:number,maxZoom:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.CreateTerrainRGB, baseURL,{fileDEM,fileRGB,minZoom,maxZoom},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除二维地形
	* @param bodyParams string[]
	*/
	export async function DeleteTerrainRGB(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteTerrainRGB, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 二维地形数据成果导出
	* @param id 
	* @param fileSystemID 
	* @param userID 
	* @param saveFolder 
	* @param format 
	*/
	export async function ExportTerrainRGB(id:string,fileSystemID:string,userID:string,saveFolder:string,format:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.ExportTerrainRGB, baseURL,undefined,{id,fileSystemID,userID,saveFolder,format},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 查询二维地形列表
	* @param keyword 数据名称
	* @param pageIndex 页码
	* @param pageSize 页大小
	*/
	export async function GetTerrainRGBList(keyword:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:DatainfoPageList}>{
		const response=await requestGet(APIKey.GetTerrainRGBList, baseURL,{keyword,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as DatainfoPageList};
	}
	/**
	* 创建低空目视航线
	* @param bodyParams VariflightCreate
	*/
	export async function CreateVariflight(bodyParams:VariflightCreate,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPostBody(APIKey.CreateVariflight, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 获取航线列表
	* @param keyword 关键字
	* @param area 所属区域
	* @param type 航线类型
	* @param startTime 开始时间
	* @param endTime 结束时间
	* @param pageIndex 
	* @param pageSize 
	*/
	export async function GetVariflightList(keyword:string,area:string,type:string,startTime:string,endTime:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:VariflightPageList}>{
		const response=await requestGet(APIKey.GetVariflightList, baseURL,{keyword,area,type,startTime,endTime,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as VariflightPageList};
	}
	/**
	* 更新航线详情
	* @param id 
	* @param bodyParams VariflightCreate
	*/
	export async function UpdateVariflight(id:string,bodyParams:VariflightCreate,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.UpdateVariflight, baseURL,bodyParams,{id},headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除航线列表
	* @param bodyParams string[]
	*/
	export async function DeleteVariflight(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteVariflight, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取航线geojson
	* @param id 
	*/
	export async function GetVariflightGeojson(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestGet(APIKey.GetVariflightGeojson, baseURL,{id},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 获取矢量业务类型枚举值
	*/
	export async function GetVectorBusinessType(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestGet(APIKey.GetVectorBusinessType, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 添加民航航空要素
	* @param name 要素名称：必选
	* @param type 要素类型：可选，默认值：民航航空
	* @param area 所属区域：可选，默认值：湖南
	* @param code 代码/编号：可选, 默认值：空
	* @param filepath 文件路径：必选
	*/
	export async function AddMilitaryAircraftElement(name:string,type:string,area:string,code:string,filepath:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestGet(APIKey.AddMilitaryAircraftElement, baseURL,{name,type,area,code,filepath},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 获取民航航空要素列表
	* @param keyword 关键字：可选
	* @param type 要素类型：可选
	* @param area 所属区域：可选
	* @param startTime 开始时间：可选
	* @param endTime 结束时间：可选
	* @param pageIndex 页码：可选，默认值：1
	* @param pageSize 页大小：可选，默认值：10
	*/
	export async function GetMilitaryAircraftElementList(keyword:string,type:string,area:string,startTime:string,endTime:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:MilitaryAircraftElementPageList}>{
		const response=await requestGet(APIKey.GetMilitaryAircraftElementList, baseURL,{keyword,type,area,startTime,endTime,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as MilitaryAircraftElementPageList};
	}
	/**
	* 更新民航航空要素元数据
	* @param id 
	* @param name 要素名称：可选
	* @param type 要素类型：可选
	* @param area 所属区域：可选
	* @param code 代码/编号：可选
	*/
	export async function UpdateMilitaryAircraftElementDetail(id:string,name:string,type:string,area:string,code:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.UpdateMilitaryAircraftElementDetail, baseURL,{id,name,type,area,code},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 添加低空空域规划
	* @param name 空域名称：必选
	* @param type 空域类型：可选，默认值：低空空域规划
	* @param area 所属区域：可选，默认值：湖南
	* @param code 空域编号：可选, 默认值：空
	* @param filepath 文件路径：必选
	*/
	export async function AddLowAltitudeAreaPlanning(name:string,type:string,area:string,code:string,filepath:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestGet(APIKey.AddLowAltitudeAreaPlanning, baseURL,{name,type,area,code,filepath},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 获取低空空域规划列表
	* @param keyword 关键字：可选
	* @param type 空域类型：可选
	* @param area 所属区域：可选
	* @param startTime 开始时间：可选
	* @param endTime 结束时间：可选
	* @param pageIndex 页码：可选，默认值：1
	* @param pageSize 页大小：可选，默认值：10
	*/
	export async function GetLowAltitudeAreaPlanningList(keyword:string,type:string,area:string,startTime:string,endTime:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:LowAltitudeAreaPlanPageList}>{
		const response=await requestGet(APIKey.GetLowAltitudeAreaPlanningList, baseURL,{keyword,type,area,startTime,endTime,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as LowAltitudeAreaPlanPageList};
	}
	/**
	* 更新低空空域规划元数据
	* @param id 
	* @param name 空域名称：可选
	* @param type 空域类型：可选
	* @param area 所属区域：可选
	* @param code 空域编号：可选
	*/
	export async function UpdateLowAltitudeAreaPlanningDetail(id:string,name:string,type:string,area:string,code:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.UpdateLowAltitudeAreaPlanningDetail, baseURL,{id,name,type,area,code},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 添加通航基础设施
	* @param name 设施名称：必选
	* @param type 数据类型：可选，默认值：通航基础设施
	* @param code ICAO编号：可选
	* @param area 地区：可选
	* @param altitude 海拔：必选
	* @param filepath 文件路径：必选
	*/
	export async function CommonInfrastructure(name:string,type:string,code:string,area:string,altitude:number,filepath:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string}>{
		const response=await requestPost(APIKey.CommonInfrastructure, baseURL,undefined,{name,type,code,area,altitude,filepath},headers,responseType,timeoutMS);
		return {response,data:response?.data as string};
	}
	/**
	* 获取通航基础设施列表
	* @param keyword 关键字：可选
	* @param type 类型：可选
	* @param area 所属区域：可选
	* @param startTime 开始时间：可选
	* @param endTime 结束时间：可选
	* @param pageIndex 页码：可选，默认值：1
	* @param pageSize 页大小：可选，默认值：10
	*/
	export async function GetCommonInfrastructureList(keyword:string,type:string,area:string,startTime:string,endTime:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:CommonInfrastructurePageList}>{
		const response=await requestGet(APIKey.GetCommonInfrastructureList, baseURL,{keyword,type,area,startTime,endTime,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as CommonInfrastructurePageList};
	}
	/**
	* 更新通航基础设施元数据
	* @param id 
	* @param name 设施名称：可选
	* @param type 数据类型：可选
	* @param code ICAO编号：可选
	* @param area 地区：可选
	* @param altitude 海拔：可选
	*/
	export async function UpdateCommonInfrastructureDetail(id:string,name:string,type:string,code:string,area:string,altitude:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.UpdateCommonInfrastructureDetail, baseURL,{id,name,type,code,area,altitude},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除数据列表
	* @param bodyParams string[]
	*/
	export async function DeleteVectorData(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteVectorData, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取矢量数据的内容
	* @param projectId 
	*/
	export async function GetVectorDataContent(projectId:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.GetVectorDataContent, baseURL,{projectId},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* Import VTPK file to the system
	* @param layerName 服务名称
	* @param vtpkFile VTPK file
	*/
	export async function ImportVtpk(layerName:string,vtpkFile:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.ImportVtpk, baseURL,{layerName,vtpkFile},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 删除VTPK
	* @param layerId 服务id
	*/
	export async function DeleteVtpk(layerId:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.DeleteVtpk, baseURL,{layerId},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 查询矢量配图列表
	* @param keyword undefined
	* @param pageIndex undefined
	* @param pageSize undefined
	*/
	export async function GetVtpkList(keyword:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:DatainfoPageList}>{
		const response=await requestGet(APIKey.GetVtpkList, baseURL,{keyword,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as DatainfoPageList};
	}
	/**
	* 获取stylejson文件
	* @param layerId 服务ID
	*/
	export async function GetStyleJson1(layerId:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.GetStyleJson1, baseURL,{layerId},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取sprite文件
	* @param layerId 服务ID
	* @param spritefilename 雪碧图文件名
	*/
	export async function resources2(layerId:string,spritefilename:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.resources2.replace('{layerId}',layerId).replace('{spritefilename}',spritefilename)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取字体文件
	* @param layerId 服务ID
	* @param fontstack 字体栈
	* @param range 字体范围
	*/
	export async function resources3(layerId:string,fontstack:string,range:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.resources3.replace('{layerId}',layerId).replace('{fontstack}',fontstack).replace('{range}',range)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取瓦片文件
	* @param layerId 服务ID
	* @param z 缩放级别
	* @param x X坐标
	* @param y Y坐标
	*/
	export async function tile1(layerId:string,z:number,x:number,y:number,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.tile1.replace('{layerId}',layerId).replace('{z}',z).replace('{x}',x).replace('{y}',y)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 矢量配图样式离线包导出
	* @param layerId 服务ID
	* @param fileSystemID 文件系统ID
	* @param userID 用户ID
	* @param saveFolder 保存文件夹
	* @param format 打包格式(db)
	*/
	export async function ExportVPStyle(layerId:string,fileSystemID:string,userID:string,saveFolder:string,format:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.ExportVPStyle, baseURL,{layerId,fileSystemID,userID,saveFolder,format},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 发布WFS服务，根据矢量文件IDs
	* @param fids 矢量文件id（英文逗号分割多个
	* @param filepaths 矢量文件path，测试用,可为空
	* @param servicename 服务名称
	* @param aliasname 别名
	* @param remark 备注
	* @param servicetype 服务类型（0矢量，1地名地址，2兵要数据）
	*/
	export async function PublishWFSbyFile(fids:string,filepaths:string,servicename:string,aliasname:string,remark:string,servicetype:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.PublishWFSbyFile, baseURL,{fids,filepaths,servicename,aliasname,remark,servicetype},undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 发布WFS服务，根据矢量图层IDs
	* @param vectorLayerIDs 矢量图层id（英文逗号分割多个
	* @param servicename 服务名称
	* @param aliasname 别名
	* @param content undefined
	* @param source undefined
	* @param mass undefined
	* @param precision undefined
	* @param servicetype 服务类型（0矢量，1地名地址，2兵要数据）
	*/
	export async function PublishWFSbyVectorLayer(vectorLayerIDs:string,servicename:string,aliasname:string,content:string,source:string,mass:string,precision:string,servicetype:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.PublishWFSbyVectorLayer, baseURL,{vectorLayerIDs,servicename,aliasname,content,source,mass,precision,servicetype},undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 检查服务名是否可用（true可用）
	* @param servicename 服务名，唯一
	*/
	export async function CheckWFSNameCanUse(servicename:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.CheckWFSNameCanUse, baseURL,{servicename},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 更新服务信息
	* @param servicename 服务名，唯一
	* @param aliasname 
	* @param content undefined
	* @param source undefined
	* @param mass undefined
	* @param precision undefined
	*/
	export async function UpdateWFSServiceInfo(servicename:string,aliasname:string,content:string,source:string,mass:string,precision:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPost(APIKey.UpdateWFSServiceInfo, baseURL,{servicename,aliasname,content,source,mass,precision},undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 删除服务
	* @param bodyParams string[]
	*/
	export async function DeleteWFSServiceInfo(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.DeleteWFSServiceInfo, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 获取所有WFS服务列表
	* @param serviceType 服务类型（0矢量，1地名地址，2兵要数据）
	* @param keyword 
	* @param pageindex 
	* @param pagesize 
	* @param starttime undefined
	* @param endtime undefined
	*/
	export async function GetWFSServiceList(serviceType:number,keyword:string,pageindex:number,pagesize:number,starttime:string,endtime:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:WFSServiceInfoPageList}>{
		const response=await requestGet(APIKey.GetWFSServiceList, baseURL,{serviceType,keyword,pageindex,pagesize,starttime,endtime},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as WFSServiceInfoPageList};
	}
	/**
	* 获取单个WFS服务信息
	* @param serviceName 服务名
	*/
	export async function GetWFSInfo(serviceName:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:WFSServiceInfo}>{
		const response=await requestGet(APIKey.GetWFSInfo, baseURL,{serviceName},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as WFSServiceInfo};
	}
	/**
	* 通过id获取单个WFS服务信息
	* @param serviceId 服务名
	*/
	export async function GetWFSInfoById(serviceId:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:WFSServiceInfo}>{
		const response=await requestGet(APIKey.GetWFSInfoById, baseURL,{serviceId},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as WFSServiceInfo};
	}
	/**
	* GetCapabilities RESTful格式请求
	* @param servicename 服务名
	* @param version 版本号
	*/
	export async function Get(servicename:string,version:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.Get.replace('{servicename}',servicename).replace('{version}',version)
		const response=await requestGet(realPath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* kvp 格式 请求
	* @param servicename 
	* @param service undefined
	* @param version undefined
	* @param request undefined
	* @param TYPENAME undefined
	* @param FEATUREID undefined
	* @param OUTPUTFORMAT undefined
	* @param RESULTTYPE undefined
	* @param PROPERTYNAME undefined
	* @param MAXFEATURES undefined
	* @param SRSNAME undefined
	* @param FILTER undefined
	* @param BBOX undefined
	* @param SORTBY undefined
	*/
	export async function Get1(servicename:string,service:string,version:string,request:string,TYPENAME:string,FEATUREID:string,OUTPUTFORMAT:string,RESULTTYPE:string,PROPERTYNAME:string,MAXFEATURES:string,SRSNAME:string,FILTER:string,BBOX:string,SORTBY:string,headers?:any,responseType:ResponseType ='json',timeoutMS?: number):Promise<{response:any,data:any}>{
		const realPath=APIKey.Get1.replace('{servicename}',servicename)
		const response=await requestGet(realPath, baseURL,{service,version,request,TYPENAME,FEATUREID,OUTPUTFORMAT,RESULTTYPE,PROPERTYNAME,MAXFEATURES,SRSNAME,FILTER,BBOX,SORTBY},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* undefined
	* @param filepath undefined
	*/
	export async function Index(filepath:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.Index, baseURL,{filepath},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* undefined
	* @param bodyParams string[]
	*/
	export async function Indexs(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestPostBody(APIKey.Indexs, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* undefined
	* @param id undefined
	*/
	export async function Delete1(id:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.Delete1, baseURL,{id},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* undefined
	* @param id undefined
	* @param filepath undefined
	*/
	export async function Update1(id:string,filepath:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.Update1, baseURL,{id,filepath},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* undefined
	* @param keyword undefined
	* @param pageIndex undefined
	* @param pageSize undefined
	*/
	export async function Query(keyword:string,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.Query, baseURL,{keyword,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取测试文件路径
	*/
	export async function GetTestFilepath(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:string[]}>{
		const response=await requestGet(APIKey.GetTestFilepath, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as string[]};
	}
	/**
	* 查询监测站列表
	* @param monitorStationCode undefined
	* @param pageSize undefined
	* @param pageIndex undefined
	*/
	export async function monitorStationList(monitorStationCode:number,pageSize:number,pageIndex:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:MonitorStationPageList}>{
		const response=await requestGet(APIKey.monitorStationList, baseURL,{monitorStationCode,pageSize,pageIndex},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as MonitorStationPageList};
	}
	/**
	* 实时数据接入(降雨量监测)
	* @param monitorStationName 监测站名
	* @param monitorStationLongitude 监测站经度
	* @param monitorStationLatitude 监测站纬度
	* @param DailyRainfall 降雨量（毫米）
	*/
	export async function RealTimeDataForDailyRainfallIn(monitorStationName:string,monitorStationLongitude:number,monitorStationLatitude:number,DailyRainfall:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestGet(APIKey.RealTimeDataForDailyRainfallIn, baseURL,{monitorStationName,monitorStationLongitude,monitorStationLatitude,DailyRainfall},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 实时降雨量查询
	* @param monitorStationName 监测站名称
	* @param monitorStationLongitude 监测站经度
	* @param monitorStationLatitude 监测站纬度
	* @param pageIndex 
	* @param pageSize 
	*/
	export async function RealTimeDataForDailyRainfallQuery(monitorStationName:string,monitorStationLongitude:number,monitorStationLatitude:number,pageIndex:number,pageSize:number,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:RealTimeDataForDailyRainfallPageList}>{
		const response=await requestGet(APIKey.RealTimeDataForDailyRainfallQuery, baseURL,{monitorStationName,monitorStationLongitude,monitorStationLatitude,pageIndex,pageSize},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data as RealTimeDataForDailyRainfallPageList};
	}
	/**
	* 实时数据删除（降雨量）
	* @param bodyParams string[]
	*/
	export async function RealTimeDataForDailyRainfallDelete(bodyParams:string[],headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:boolean}>{
		const response=await requestPostBody(APIKey.RealTimeDataForDailyRainfallDelete, baseURL,bodyParams,undefined,headers,responseType,timeoutMS);
		return {response,data:response?.data as boolean};
	}
	/**
	* 添加一个作业(模拟设备推送数据)
	* @param jobName 作业名称
	* @param jobGroup 作业分组
	* @param jobDescription 作业描述
	* @param dataUrl 数据接收地址
	* @param monitorStationName 监测站名称
	* @param monitorStationLongitude 监测站经度
	* @param monitorStationLatitude 监测站纬度
	* @param triggerTimeHour 触发时间（小时）：（0-23），默认值为每小时
	* @param triggerTimeMinute 触发时间（分钟）：（0-59），默认值为每分钟
	* @param triggerTimeSecond 触发时间（秒）：（0-59），默认值为每秒
	*/
	export async function AddJob(jobName:string,jobGroup:string,jobDescription:string,dataUrl:string,monitorStationName:string,monitorStationLongitude:string,monitorStationLatitude:string,triggerTimeHour:string,triggerTimeMinute:string,triggerTimeSecond:string,headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.AddJob, baseURL,{jobName,jobGroup,jobDescription,dataUrl,monitorStationName,monitorStationLongitude,monitorStationLatitude,triggerTimeHour,triggerTimeMinute,triggerTimeSecond},headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	/**
	* 获取所有作业
	*/
	export async function GetJobs(headers?:any,responseType:ResponseType='json',timeoutMS?:number):Promise<{response:any,data:any}>{
		const response=await requestGet(APIKey.GetJobs, baseURL,undefined,headers,responseType,undefined,timeoutMS);
		return {response,data:response?.data};
	}
	const APIKey={
	GetElevationbyXYBatch:'/api/AirAnalysis/GetElevationbyXYBatch',
	SelectAirAnalysisTasks:'/api/AirAnalysis/SelectAirAnalysisTasks',
	Result:'/api/AirAnalysis/Result/{taskType}/{taskID}.{filetype}',
	CreateAirSpaceAnalysisTask:'/api/AirAnalysis/CreateAirSpaceAnalysisTask',
	GetAirSpaceAnalysisProgress:'/api/AirAnalysis/GetAirSpaceAnalysisProgress',
	CreateObstacleAnalysisTask:'/api/AirAnalysis/CreateObstacleAnalysisTask',
	GetObstacleAnalysisProgress:'/api/AirAnalysis/GetObstacleAnalysisProgress',
	CreateDEMAnalysisTask:'/api/AirAnalysis/CreateDEMAnalysisTask',
	GetDEMAnalysisProgress:'/api/AirAnalysis/GetDEMAnalysisProgress',
	AddorUpdateObstacleInfo:'/api/AirAnalysis/AddorUpdateObstacleInfo',
	CheckObstacleInfoFiles:'/api/AirAnalysis/CheckObstacleInfoFiles',
	ImportObstacleInfobyFiles:'/api/AirAnalysis/ImportObstacleInfobyFiles',
	ExportObstacleInfoFile:'/api/AirAnalysis/ExportObstacleInfoFile',
	GetObstacleInfobyID:'/api/AirAnalysis/GetObstacleInfobyID',
	DeleteObstacleInfobyID:'/api/AirAnalysis/DeleteObstacleInfobyID',
	SelectObstacleGeoJsonPoint:'/api/AirAnalysis/SelectObstacleGeoJsonPoint',
	SelectObstacleGeoJsonLine:'/api/AirAnalysis/SelectObstacleGeoJsonLine',
	SelectObstacleInfos:'/api/AirAnalysis/SelectObstacleInfos',
	GetAirportInfo:'/api/Airport/GetAirportInfo',
	GetAirportDetail:'/api/Airport/GetAirportDetail',
	GetAirportRuleurls:'/api/Airport/GetAirportRuleurls',
	GetAirportRuleContent:'/api/Airport/GetAirportRuleContent',
	GetAirportLevelView:'/api/Airport/GetAirportLevelView',
	GetProgramFileList:'/api/Algorithm/GetProgramFileList',
	GetProgramFileDetail:'/api/Algorithm/GetProgramFileDetail',
	LoadProgramFile:'/api/Algorithm/LoadProgramFile',
	ExportProgramFile:'/api/Algorithm/ExportProgramFile',
	RemoveProgramFile:'/api/Algorithm/RemoveProgramFile',
	RemoveFullProgramFile:'/api/Algorithm/RemoveFullProgramFile',
	UpdateProgramFile:'/api/Algorithm/UpdateProgramFile',
	GetAlgorithmList:'/api/Algorithm/GetAlgorithmList',
	GetNewAlgorithmInfo:'/api/Algorithm/GetNewAlgorithmInfo',
	CreateNewAlgorithm:'/api/Algorithm/CreateNewAlgorithm',
	GetAlgorithmInfo:'/api/Algorithm/GetAlgorithmInfo',
	RunAlgorithm:'/api/Algorithm/RunAlgorithm',
	StopAlgorithm:'/api/Algorithm/StopAlgorithm',
	RestartAlgorithm:'/api/Algorithm/RestartAlgorithm',
	RemoveAlgorithm:'/api/Algorithm/RemoveAlgorithm',
	GetAlgorithmLogs:'/api/Algorithm/GetAlgorithmLogs',
	RunAlgorithmConsole:'/api/Algorithm/RunAlgorithmConsole',
	Connect:'/api/Algorithm/Connect/{algorithmID}',
	Resize:'/api/Algorithm/Resize/{algorithmID}',
	GetElevationbyXY:'/api/Analysis/GetElevationbyXY',
	GetElevationbyXYBatch1:'/api/Analysis/GetElevationbyXYBatch',
	GetElevationbyXYAsyncBatch:'/api/Analysis/GetElevationbyXYAsyncBatch',
	GetElevationbyXYAsyncTask:'/api/Analysis/GetElevationbyXYAsyncTask',
	RangeStatistics:'/api/Analysis/RangeStatistics',
	result:'/api/Analysis/result/{taskid}/{z}/{x}/{y}.png',
	GetAnalysistools:'/api/Analysis/GetAnalysistools',
	GetHistryRangeList:'/api/Analysis/GetHistryRangeList',
	GetHistryTaskListbyRangeID:'/api/Analysis/GetHistryTaskListbyRangeID',
	CreateAnalysisRange:'/api/Analysis/CreateAnalysisRange',
	CreateAnalysisOnestep:'/api/Analysis/CreateAnalysisOnestep',
	CreateAnalysisTask:'/api/Analysis/CreateAnalysisTask',
	ReTryAnalysisTask:'/api/Analysis/ReTryAnalysisTask',
	UpdateAnalysisRangebyID:'/api/Analysis/UpdateAnalysisRangebyID',
	UpdateAnalysisTaskbyID:'/api/Analysis/UpdateAnalysisTaskbyID',
	CheckHasTaskbyRangeID:'/api/Analysis/CheckHasTaskbyRangeID',
	DeleteAnalysisRange:'/api/Analysis/DeleteAnalysisRange',
	DeleteAnalysisTask:'/api/Analysis/DeleteAnalysisTask',
	DownloadAnalysisResultFile:'/api/Analysis/DownloadAnalysisResultFile',
	DownloadAnalysisReportFile:'/api/Analysis/DownloadAnalysisReportFile',
	UpdateTaskTable:'/api/Analysis/UpdateTaskTable',
	CreateDataInfo:'/api/Data/CreateDataInfo',
	CheckPostGISConn:'/api/Data/CheckPostGISConn',
	AddDataRepo:'/api/Data/AddDataRepo',
	DeleteDataRepo:'/api/Data/DeleteDataRepo',
	CopyDatainfo:'/api/Data/CopyDatainfo',
	DeleteDataInfo:'/api/Data/DeleteDataInfo',
	isDatainfoExists:'/api/Data/isDatainfoExists',
	updateDatainfo:'/api/Data/updateDatainfo',
	GetDatainfo:'/api/Data/GetDatainfo',
	updateDatainfoStatus:'/api/Data/updateDatainfoStatus',
	GetAllDataList:'/api/Data/GetAllDataList',
	CheckDataFileSys:'/api/Data/CheckDataFileSys',
	CheckDataFileExist:'/api/Data/CheckDataFileExist',
	GetBaseGeojson:'/api/Data/GetBaseGeojson',
	CheckBaseDataFile:'/api/Data/CheckBaseDataFile',
	GetBaseDataFileHeader:'/api/Data/GetBaseDataFileHeader',
	SaveBaseDataFile:'/api/Data/SaveBaseDataFile',
	AddBaseDataFile:'/api/Data/AddBaseDataFile',
	GenerateGeojsonFile:'/api/Data/GenerateGeojsonFile',
	UpdateDatabaseData:'/api/Data/UpdateDatabaseData',
	DownloadDatabaseGeojson:'/api/Data/DownloadDatabaseGeojson',
	DatabaseBakcup:'/api/Data/DatabaseBakcup',
	DeleteDatabaseList:'/api/Data/DeleteDatabaseList',
	GetDatarepoList:'/api/Data/GetDatarepoList',
	GetDataBrowseLink:'/api/Data/GetDataBrowseLink',
	CreateShareService:'/api/Data/CreateShareService',
	DeleteShareService:'/api/Data/DeleteShareService',
	SelectShareServiceKeyList:'/api/Data/SelectShareServiceKeyList',
	SelectShareServiceList:'/api/Data/SelectShareServiceList',
	BackupDatabase:'/api/DatabaseBackup/BackupDatabase',
	RestoreDatabase:'/api/DatabaseBackup/RestoreDatabase',
	GetDbNames:'/api/DatabaseBackup/GetDbNames',
	DeleteDbBackup:'/api/DatabaseBackup/DeleteDbBackup',
	GetDbBackupList:'/api/DatabaseBackup/GetDbBackupList',
	Backup:'/api/Dbmanage/Backup',
	Restore:'/api/Dbmanage/Restore',
	GetBackupList:'/api/Dbmanage/GetBackupList',
	GetproDbList:'/api/Dbmanage/GetproDbList',
	GetDemoDbList:'/api/Dbmanage/GetDemoDbList',
	InitDemoDb:'/api/Dbmanage/InitDemoDb',
	InitDemoDbEnv:'/api/Dbmanage/InitDemoDbEnv',
	AddData:'/api/Imageinfo/AddData',
	DeleteData:'/api/Imageinfo/DeleteData',
	UpdateDataStatus:'/api/Imageinfo/UpdateDataStatus',
	GetDataList:'/api/Imageinfo/GetDataList',
	GetDataBrowseUrl:'/api/Imageinfo/GetDataBrowseUrl',
	image:'/api/imageinfo/image/{id}/{z}/{x}/{y}.png',
	terrain:'/api/imageinfo/terrain/{id}/layer.json',
	terrain1:'/api/imageinfo/terrain/{id}/{z}/{x}/{y}.terrain',
	GetPointByRange:'/api/KDBush/GetPointByRange',
	GetPointByRadius:'/api/KDBush/GetPointByRadius',
	AddMapinfo:'/api/Mapinfo/AddMapinfo',
	DeleteMapinfo:'/api/Mapinfo/DeleteMapinfo/{id}',
	DeleteMapinfos:'/api/Mapinfo/DeleteMapinfos',
	EditMapinfo:'/api/Mapinfo/EditMapinfo',
	GetMapinfos:'/api/Mapinfo/GetMapinfos',
	GetPreview:'/api/Mapinfo/GetPreview/{id}/preview',
	UpdateTileVisibility:'/api/Mapinfo/UpdateTileVisibility',
	GetMissingTiles:'/api/Mapinfo/GetMissingTiles',
	AddTileToVtpk:'/api/Mapinfo/AddTileToVtpk',
	GetTile:'/api/Mapinfo/GetTile/{id}/tiles/{z}/{x}/{y}',
	GetStyleJson:'/api/Mapinfo/GetStyleJson',
	resources:'/api/mapinfo/resources/{layerId}/sprites/{spritefilename}',
	resources1:'/api/mapinfo/resources/{layerId}/fonts/{fontstack}/{range}.pbf',
	tile:'/api/mapinfo/tile/{layerId}/{z}/{x}/{y}.pbf',
	CopyModelFile:'/api/Model/CopyModelFile',
	file:'/model/file/{modelid}/{modelname}.obj',
	file1:'/model/file/{modelid}/{modelname}.mtl',
	file2:'/model/file/{modelid}/{modelname}.stl',
	file3:'/model/file/{modelid}/{modelname}.glb',
	file4:'/model/file/{modelid}/{modelname}.gltf',
	file5:'/model/file/{modelid}/{modelname}.bin',
	model:'/model/{modelid}/{x}/{y}',
	model1:'/model/{modelid}/{data}/{x}/{y}',
	model2:'/model/{modelid}/{data}',
	model3:'/model/{modelid}/{json}.json',
	GetModelList:'/api/Model/GetModelList',
	GetModelInfo:'/api/Model/GetModelInfo',
	SaveDataSysFile:'/api/Model/SaveDataSysFile',
	SaveDataFile:'/api/Model/SaveDataFile',
	UpdateModelInfo:'/api/Model/UpdateModelInfo',
	DeleteModelList:'/api/Model/DeleteModelList',
	SaveSingleModelFile:'/api/Model/SaveSingleModelFile',
	GetSingleModelCatalog:'/api/Model/GetSingleModelCatalog',
	GetSingleModelList:'/api/Model/GetSingleModelList',
	UpdateSingleModel:'/api/Model/UpdateSingleModel',
	DeleteSingleModels:'/api/Model/DeleteSingleModels',
	CheckFileSys:'/api/Model/CheckFileSys',
	CheckFileSysExist:'/api/Model/CheckFileSysExist',
	DataPublishService:'/api/Model/DataPublishService',
	CheckOsgbXml:'/api/Model/CheckOsgbXml',
	Testunzip:'/api/NaviModel/Testunzip',
	DataPublishServiceNew:'/api/NaviModel/DataPublishServiceNew',
	Export3DtilesZip:'/api/NaviModel/Export3DtilesZip',
	ExportImageZip:'/api/NaviModel/ExportImageZip',
	ExportHangTuFilesZip:'/api/NaviModel/ExportHangTuFilesZip',
	TestExportHangTuFilesZipTest:'/api/NaviModel/TestExportHangTuFilesZipTest',
	PackRasterTiles:'/api/NaviModel/PackRasterTiles',
	Zip2DbFile:'/api/NaviModel/Zip2DbFile',
	hubtest:'/api/NaviModel/hubtest',
	list:'/api/obliquephotography/list',
	obliquephotography:'/api/obliquephotography/{name}/{jsonname}.json',
	obliquephotography1:'/api/obliquephotography/{name}/{path}/{path1}/{path2}',
	obliquephotography2:'/api/obliquephotography/{name}/{path}/{path1}',
	obliquephotography3:'/api/obliquephotography/{name}/{path}',
	ToUniversalPath1:'/api/NaviModel/ToUniversalPath1',
	testpythonenv:'/api/NaviModel/testpythonenv',
	Insert:'/api/Poi/Insert',
	Delete:'/api/Poi/Delete',
	Update:'/api/Poi/Update',
	Search:'/api/Poi/Search',
	SearchByGeoPolygon:'/api/Poi/SearchByGeoPolygon',
	GetFiledList:'/api/Poi/GetFiledList',
	GetEPSGCode:'/api/Preprocess/GetEPSGCode',
	VectorCoordinateTransformation:'/api/Preprocess/VectorCoordinateTransformation',
	ImageCoordinateTransformation:'/api/Preprocess/ImageCoordinateTransformation',
	VectorSpaceRegistration:'/api/Preprocess/VectorSpaceRegistration',
	ImageSpaceRegistration:'/api/Preprocess/ImageSpaceRegistration',
	ElevationList:'/api/Preprocess/ElevationList',
	ElevationConvert:'/api/Preprocess/ElevationConvert',
	ImageMerge:'/api/Preprocess/ImageMerge',
	UniformColor:'/api/Preprocess/UniformColor',
	ImageSharpen:'/api/Preprocess/ImageSharpen',
	CreateRealTimeImage:'/api/RealTimeImageAcquisition/CreateRealTimeImage',
	DeleteRealTimeImage:'/api/RealTimeImageAcquisition/DeleteRealTimeImage',
	GetRealTimeImageList:'/api/RealTimeImageAcquisition/GetRealTimeImageList',
	UpdateRealTimeImage:'/api/RealTimeImageAcquisition/UpdateRealTimeImage',
	UpdateRealTimeImageMeta:'/api/RealTimeImageAcquisition/UpdateRealTimeImageMeta',
	Insert1:'/api/Region/Insert',
	GetVideoList:'/api/Scene3d/GetVideoList',
	GetVideoListByScene:'/api/Scene3d/GetVideoListByScene',
	AddVideoToScene:'/api/Scene3d/AddVideoToScene',
	DeleteVideoFromScene:'/api/Scene3d/DeleteVideoFromScene',
	UpdateVideoInfo:'/api/Scene3d/UpdateVideoInfo',
	UpdateScene3dThumbnail:'/api/Scene3d/UpdateScene3dThumbnail',
	GetScene3dThumbnail:'/api/Scene3d/GetScene3dThumbnail',
	ImportScene3d:'/api/Scene3d/ImportScene3d',
	ExportScene3d:'/api/Scene3d/ExportScene3d',
	CreateScene3d:'/api/Scene3d/CreateScene3d',
	GetScene3dById:'/api/Scene3d/GetScene3dById',
	GetScene3dByName:'/api/Scene3d/GetScene3dByName',
	UpdateScene3d:'/api/Scene3d/UpdateScene3d',
	AddorUpdateScene3dLayers:'/api/Scene3d/AddorUpdateScene3dLayers',
	AddorUpdateScene3dModel:'/api/Scene3d/AddorUpdateScene3dModel',
	DeleteScene3dModel:'/api/Scene3d/DeleteScene3dModel',
	AddorUpdateScene3dPlot:'/api/Scene3d/AddorUpdateScene3dPlot',
	DeleteScene3dPlot:'/api/Scene3d/DeleteScene3dPlot',
	DeleteScene3ds:'/api/Scene3d/DeleteScene3ds',
	DeleteScene3d:'/api/Scene3d/DeleteScene3d',
	GetScene3dList:'/api/Scene3d/GetScene3dList',
	CopyScene3d:'/api/Scene3d/CopyScene3d',
	AddLayoutToScene3d:'/api/Scene3d/AddLayoutToScene3d',
	GetNewScene3dLayoutList:'/api/Scene3d/GetNewScene3dLayoutList',
	RemoveLayoutFromScene3d:'/api/Scene3d/RemoveLayoutFromScene3d',
	GetScene3dLayoutList:'/api/Scene3d/GetScene3dLayoutList',
	SearchModels:'/api/Scene3d/SearchModels',
	ModelStatistics:'/api/Scene3d/ModelStatistics',
	GetDataCount:'/api/Statistics/GetDataCount',
	GetDataInsertCount:'/api/Statistics/GetDataInsertCount',
	GetServiceDataCount:'/api/Statistics/GetServiceDataCount',
	GetDataTotalSize:'/api/Statistics/GetDataTotalSize',
	GetDataCategorySize:'/api/Statistics/GetDataCategorySize',
	GetDataTotalCount:'/api/Statistics/GetDataTotalCount',
	GetDataCategoryCount:'/api/Statistics/GetDataCategoryCount',
	GetServiceCount:'/api/Statistics/GetServiceCount',
	GetDataInsertCountByMonth:'/api/Statistics/GetDataInsertCountByMonth',
	GetSourceDataList:'/api/Statistics/GetSourceDataList',
	ExportSourceDataList:'/api/Statistics/ExportSourceDataList',
	ImportSourceData:'/api/Statistics/ImportSourceData',
	UpdateSourceData:'/api/Statistics/UpdateSourceData',
	CreateTerrainRGB:'/api/TerrainRGB/CreateTerrainRGB',
	DeleteTerrainRGB:'/api/TerrainRGB/DeleteTerrainRGB',
	ExportTerrainRGB:'/api/TerrainRGB/ExportTerrainRGB',
	GetTerrainRGBList:'/api/TerrainRGB/GetTerrainRGBList',
	CreateVariflight:'/api/Variflight/CreateVariflight',
	GetVariflightList:'/api/Variflight/GetVariflightList',
	UpdateVariflight:'/api/Variflight/UpdateVariflight',
	DeleteVariflight:'/api/Variflight/DeleteVariflight',
	GetVariflightGeojson:'/api/Variflight/GetVariflightGeojson',
	GetVectorBusinessType:'/api/Vectorinfo/GetVectorBusinessType',
	AddMilitaryAircraftElement:'/api/Vectorinfo/AddMilitaryAircraftElement',
	GetMilitaryAircraftElementList:'/api/Vectorinfo/GetMilitaryAircraftElementList',
	UpdateMilitaryAircraftElementDetail:'/api/Vectorinfo/UpdateMilitaryAircraftElementDetail',
	AddLowAltitudeAreaPlanning:'/api/Vectorinfo/AddLowAltitudeAreaPlanning',
	GetLowAltitudeAreaPlanningList:'/api/Vectorinfo/GetLowAltitudeAreaPlanningList',
	UpdateLowAltitudeAreaPlanningDetail:'/api/Vectorinfo/UpdateLowAltitudeAreaPlanningDetail',
	CommonInfrastructure:'/api/Vectorinfo/CommonInfrastructure',
	GetCommonInfrastructureList:'/api/Vectorinfo/GetCommonInfrastructureList',
	UpdateCommonInfrastructureDetail:'/api/Vectorinfo/UpdateCommonInfrastructureDetail',
	DeleteVectorData:'/api/Vectorinfo/DeleteVectorData',
	GetVectorDataContent:'/api/Vectorinfo/GetVectorDataContent',
	ImportVtpk:'/api/Vtpk/ImportVtpk',
	DeleteVtpk:'/api/Vtpk/DeleteVtpk',
	GetVtpkList:'/api/Vtpk/GetVtpkList',
	GetStyleJson1:'/api/Vtpk/GetStyleJson',
	resources2:'/api/vtpk/resources/{layerId}/sprites/{spritefilename}',
	resources3:'/api/vtpk/resources/{layerId}/fonts/{fontstack}/{range}.pbf',
	tile1:'/api/vtpk/tile/{layerId}/{z}/{x}/{y}.pbf',
	ExportVPStyle:'/api/Vtpk/ExportVPStyle',
	PublishWFSbyFile:'/api/WFS/PublishWFSbyFile',
	PublishWFSbyVectorLayer:'/api/WFS/PublishWFSbyVectorLayer',
	CheckWFSNameCanUse:'/api/WFS/CheckWFSNameCanUse',
	UpdateWFSServiceInfo:'/api/WFS/UpdateWFSServiceInfo',
	DeleteWFSServiceInfo:'/api/WFS/DeleteWFSServiceInfo',
	GetWFSServiceList:'/api/WFS/GetWFSServiceList',
	GetWFSInfo:'/api/WFS/GetWFSInfo',
	GetWFSInfoById:'/api/WFS/GetWFSInfoById',
	Get:'/api/WFS/Get/{servicename}/{version}',
	Get1:'/api/WFS/Get/{servicename}',
	Index:'/api/documentsearch/Index',
	Indexs:'/api/documentsearch/Indexs',
	Delete1:'/api/documentsearch/Delete',
	Update1:'/api/documentsearch/Update',
	Query:'/api/documentsearch/Query',
	GetTestFilepath:'/api/documentsearch/GetTestFilepath',
	monitorStationList:'/api/job/GetMonitorStationList/monitorStationList',
	RealTimeDataForDailyRainfallIn:'/api/job/RealTimeDataForDailyRainfallIn',
	RealTimeDataForDailyRainfallQuery:'/api/job/RealTimeDataForDailyRainfallQuery',
	RealTimeDataForDailyRainfallDelete:'/api/job/RealTimeDataForDailyRainfallDelete',
	AddJob:'/api/job/AddJob',
	DeleteJob:'/api/job/DeleteJob',
	pause:'/api/job/PauseJob/pause',
	resume:'/api/job/ResumeJob/resume',
	trigger:'/api/job/TriggerJob/trigger',
	GetJobs:'/api/job/GetJobs',
	}
	export interface Address{
		addr?:string,
		prefixLen:number
	}
	export interface AirSpaceTask{
		airRouteID?:string,
		bufferLength:number,
		airSpaceTypes?:string[]
	}
	export interface Airanalysistask{
		id?:string,
		type?:string,
		airrouteid?:string,
		bufferlength?:number,
		parameter?:string,
		status?:string,
		progress?:number,
		progressinfo?:string,
		geojsonURL?:string,
		statisticsjsonURL?:string,
		starttime?:string,
		endtime?:string,
		userid?:string,
		taskname?:string,
		airRouteGeojson?:string
	}
	export interface AiranalysistaskPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface Airport{
		id?:string,
		name?:string,
		sequence?:number,
		region?:string,
		category?:string,
		type?:string,
		runtime?:string,
		elevation?:string,
		magneticDeclination?:string,
		flyingType?:string,
		hasDetails?:string,
		longitude?:string,
		latitude?:string,
		phone?:string,
		email?:string,
		address?:string,
		geojson?:string
	}
	export interface AirportLevelView{
		name?:string,
		fullpath?:string,
		isDirectory:boolean,
		parentPath?:string
	}
	export interface AirportPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface AnalysisResult{
		status?:string,
		progress:number,
		progressInfo?:string,
		geojsonURL?:string,
		statisticsjsonURL?:string
	}
	export interface Analysistask{
		id?:string,
		type?:string,
		rangeid?:string,
		rangejson?:string,
		gridsize?:number,
		status?:string,
		progress?:string,
		starttime?:string,
		endtime?:string,
		resultpath?:string,
		url?:string,
		info?:string,
		errorinfo?:string,
		parameter?:string,
		userid?:string,
		taskname?:string
	}
	export interface AnalysistaskPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface Analysistools{
		id:number,
		name?:string,
		type?:string,
		canuse?:boolean,
		classjson?:string,
		basefilepath?:string
	}
	export interface Assembly{
		definedTypes?:any[],
		exportedTypes?:any[],
		codeBase?:string,
		entryPoint:MethodInfo,
		fullName?:string,
		imageRuntimeVersion?:string,
		isDynamic:boolean,
		location?:string,
		reflectionOnly:boolean,
		isCollectible:boolean,
		isFullyTrusted:boolean,
		customAttributes?:any[],
		escapedCodeBase?:string,
		manifestModule:Module,
		modules?:any[],
		globalAssemblyCache:boolean,
		hostContext:number,
		securityRuleSet:SecurityRuleSet
	}
	export interface BindOptions{
		propagation?:string,
		nonRecursive:boolean
	}
	export interface CommonInfrastructure{
		id?:string,
		name?:string,
		type?:string,
		code?:string,
		range?:string,
		area?:string,
		altitude:number,
		fileSize:number,
		createTime?:string,
		userId?:string,
		geojsonpath?:string,
		businessType:number,
		filePath?:string
	}
	export interface CommonInfrastructurePageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface Config{
		hostname?:string,
		domainname?:string,
		user?:string,
		attachStdin:boolean,
		attachStdout:boolean,
		attachStderr:boolean,
		exposedPorts?:any,
		tty:boolean,
		openStdin:boolean,
		stdinOnce:boolean,
		env?:string[],
		cmd?:string[],
		healthcheck:HealthConfig,
		argsEscaped:boolean,
		image?:string,
		volumes?:any,
		workingDir?:string,
		entrypoint?:string[],
		networkDisabled:boolean,
		macAddress?:string,
		onBuild?:string[],
		labels?:any,
		stopSignal?:string,
		stopTimeout?:string,
		shell?:string[]
	}
	export interface ConstructorInfo{
		name?:string,
		declaringType:Type,
		reflectedType:Type,
		module:Module,
		customAttributes?:any[],
		isCollectible:boolean,
		metadataToken:number,
		attributes:MethodAttributes,
		methodImplementationFlags:MethodImplAttributes,
		callingConvention:CallingConventions,
		isAbstract:boolean,
		isConstructor:boolean,
		isFinal:boolean,
		isHideBySig:boolean,
		isSpecialName:boolean,
		isStatic:boolean,
		isVirtual:boolean,
		isAssembly:boolean,
		isFamily:boolean,
		isFamilyAndAssembly:boolean,
		isFamilyOrAssembly:boolean,
		isPrivate:boolean,
		isPublic:boolean,
		isConstructedGenericMethod:boolean,
		isGenericMethod:boolean,
		isGenericMethodDefinition:boolean,
		containsGenericParameters:boolean,
		methodHandle:RuntimeMethodHandle,
		isSecurityCritical:boolean,
		isSecuritySafeCritical:boolean,
		isSecurityTransparent:boolean,
		memberType:MemberTypes
	}
	export interface ContainerInspectResponse{
		id?:string,
		created:string,
		path?:string,
		args?:string[],
		state:ContainerState,
		image?:string,
		resolvConfPath?:string,
		hostnamePath?:string,
		hostsPath?:string,
		logPath?:string,
		node:ContainerNode,
		name?:string,
		restartCount:number,
		driver?:string,
		platform?:string,
		mountLabel?:string,
		processLabel?:string,
		appArmorProfile?:string,
		execIDs?:string[],
		hostConfig:HostConfig,
		graphDriver:GraphDriverData,
		sizeRw?:number,
		sizeRootFs?:number,
		mounts?:any[],
		config:Config,
		networkSettings:NetworkSettings
	}
	export interface ContainerListResponse{
		id?:string,
		names?:string[],
		image?:string,
		imageID?:string,
		command?:string,
		created:string,
		ports?:any[],
		sizeRw:number,
		sizeRootFs:number,
		labels?:any,
		state?:string,
		status?:string,
		networkSettings:SummaryNetworkSettings,
		mounts?:any[]
	}
	export interface ContainerListResponsePageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface ContainerNode{
		id?:string,
		ipAddress?:string,
		addr?:string,
		name?:string,
		cpus:number,
		memory:number,
		labels?:any
	}
	export interface ContainerState{
		status?:string,
		running:boolean,
		paused:boolean,
		restarting:boolean,
		oomKilled:boolean,
		dead:boolean,
		pid:number,
		exitCode:number,
		error?:string,
		startedAt?:string,
		finishedAt?:string,
		health:Health
	}
	export interface CreateContainerParameters{
		name?:string,
		platform?:string,
		hostname?:string,
		domainname?:string,
		user?:string,
		attachStdin:boolean,
		attachStdout:boolean,
		attachStderr:boolean,
		exposedPorts?:any,
		tty:boolean,
		openStdin:boolean,
		stdinOnce:boolean,
		env?:string[],
		cmd?:string[],
		healthcheck:HealthConfig,
		argsEscaped:boolean,
		image?:string,
		volumes?:any,
		workingDir?:string,
		entrypoint?:string[],
		networkDisabled:boolean,
		macAddress?:string,
		onBuild?:string[],
		labels?:any,
		stopSignal?:string,
		stopTimeout?:string,
		shell?:string[],
		hostConfig:HostConfig,
		networkingConfig:NetworkingConfig
	}
	export interface CreateContainerResponse{
		id?:string,
		warnings?:string[]
	}
	export interface CustomAttributeData{
		attributeType:Type,
		constructor:ConstructorInfo,
		constructorArguments?:any[],
		namedArguments?:any[]
	}
	export interface CustomAttributeNamedArgument{
		memberInfo:MemberInfo,
		typedValue:CustomAttributeTypedArgument,
		memberName?:string,
		isField:boolean
	}
	export interface CustomAttributeTypedArgument{
		argumentType:Type,
		value?:any
	}
	export interface DEMTask{
		airRouteID?:string,
		bufferLength:number,
		distanceClassify?:any[]
	}
	export interface DataEditModel{
		id?:string,
		datas?:string[]
	}
	export interface Datainfo{
		id?:string,
		name?:string,
		content?:string,
		type?:number,
		scope?:string,
		source?:string,
		format?:string,
		crs?:string,
		mass?:string,
		precision?:string,
		count:number,
		valStatus:boolean,
		datatype:number,
		createTime:string,
		userid?:string,
		fullpath?:string,
		publish:boolean,
		clippath?:string,
		progress?:string,
		origin?:string,
		catalog?:string,
		thumb?:string,
		datarepos?:any[]
	}
	export interface DatainfoPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface Datarepo{
		id?:string,
		fullpath?:string,
		creatTime:string,
		dataid?:string,
		sqlType?:string,
		deviceType?:string,
		ip?:string,
		port?:string,
		deviceId?:string,
		user?:string,
		passwd?:string,
		tbname?:string,
		type?:number,
		dbname?:string
	}
	export interface Dbbackup{
		id?:string,
		dbname?:string,
		filepath?:string,
		create?:string
	}
	export interface DbbackupPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface DeviceMapping{
		pathOnHost?:string,
		pathInContainer?:string,
		cgroupPermissions?:string
	}
	export interface DeviceRequest{
		driver?:string,
		count:number,
		deviceIDs?:string[],
		capabilities?:[][],
		options?:any
	}
	export interface Driver{
		name?:string,
		options?:any
	}
	export interface ElevationInfo{
		x:number,
		y:number,
		value:number
	}
	export interface EndpointIPAMConfig{
		iPv4Address?:string,
		iPv6Address?:string,
		linkLocalIPs?:string[]
	}
	export interface EndpointSettings{
		ipamConfig:EndpointIPAMConfig,
		links?:string[],
		aliases?:string[],
		networkID?:string,
		endpointID?:string,
		gateway?:string,
		ipAddress?:string,
		ipPrefixLen:number,
		iPv6Gateway?:string,
		globalIPv6Address?:string,
		globalIPv6PrefixLen:number,
		macAddress?:string,
		driverOpts?:any
	}
	export interface EventInfo{
		name?:string,
		declaringType:Type,
		reflectedType:Type,
		module:Module,
		customAttributes?:any[],
		isCollectible:boolean,
		metadataToken:number,
		memberType:MemberTypes,
		attributes:EventAttributes,
		isSpecialName:boolean,
		addMethod:MethodInfo,
		removeMethod:MethodInfo,
		raiseMethod:MethodInfo,
		isMulticast:boolean,
		eventHandlerType:Type
	}
	export interface FieldInfo{
		name?:string,
		declaringType:Type,
		reflectedType:Type,
		module:Module,
		customAttributes?:any[],
		isCollectible:boolean,
		metadataToken:number,
		memberType:MemberTypes,
		attributes:FieldAttributes,
		fieldType:Type,
		isInitOnly:boolean,
		isLiteral:boolean,
		isNotSerialized:boolean,
		isPinvokeImpl:boolean,
		isSpecialName:boolean,
		isStatic:boolean,
		isAssembly:boolean,
		isFamily:boolean,
		isFamilyAndAssembly:boolean,
		isFamilyOrAssembly:boolean,
		isPrivate:boolean,
		isPublic:boolean,
		isSecurityCritical:boolean,
		isSecuritySafeCritical:boolean,
		isSecurityTransparent:boolean,
		fieldHandle:RuntimeFieldHandle
	}
	export interface GeoLocation{
		latitude:number,
		longitude:number
	}
	export interface GeojsonFeature{
		type?:string,
		properties?:any,
		geometry:GeojsonGeomtry
	}
	export interface GeojsonGeomtry{
		coordinates?:number[],
		type?:string
	}
	export interface GeojsonModel{
		type?:string,
		features?:any[]
	}
	export interface GraphDriverData{
		data?:any,
		name?:string
	}
	export interface GroundControlPoint{
		sourceX:number,
		sourceY:number,
		targetX:number,
		targetY:number
	}
	export interface Health{
		status?:string,
		failingStreak:number,
		log?:any[]
	}
	export interface HealthConfig{
		test?:string[],
		interval:string,
		timeout:string,
		startPeriod:number,
		retries:number
	}
	export interface HealthcheckResult{
		start:string,
		end:string,
		exitCode:number,
		output?:string
	}
	export interface HostConfig{
		binds?:string[],
		containerIDFile?:string,
		logConfig:LogConfig,
		networkMode?:string,
		portBindings?:any,
		restartPolicy:RestartPolicy,
		autoRemove:boolean,
		volumeDriver?:string,
		volumesFrom?:string[],
		capAdd?:string[],
		capDrop?:string[],
		cgroupnsMode?:string,
		dns?:string[],
		dnsOptions?:string[],
		dnsSearch?:string[],
		extraHosts?:string[],
		groupAdd?:string[],
		ipcMode?:string,
		cgroup?:string,
		links?:string[],
		oomScoreAdj:number,
		pidMode?:string,
		privileged:boolean,
		publishAllPorts:boolean,
		readonlyRootfs:boolean,
		securityOpt?:string[],
		storageOpt?:any,
		tmpfs?:any,
		utsMode?:string,
		usernsMode?:string,
		shmSize:number,
		sysctls?:any,
		runtime?:string,
		consoleSize?:number[],
		isolation?:string,
		cpuShares:number,
		memory:number,
		nanoCPUs:number,
		cgroupParent?:string,
		blkioWeight:number,
		blkioWeightDevice?:any[],
		blkioDeviceReadBps?:any[],
		blkioDeviceWriteBps?:any[],
		blkioDeviceReadIOps?:any[],
		blkioDeviceWriteIOps?:any[],
		cpuPeriod:number,
		cpuQuota:number,
		cpuRealtimePeriod:number,
		cpuRealtimeRuntime:number,
		cpusetCpus?:string,
		cpusetMems?:string,
		devices?:any[],
		deviceCgroupRules?:string[],
		deviceRequests?:any[],
		kernelMemory:number,
		kernelMemoryTCP:number,
		memoryReservation:number,
		memorySwap:number,
		memorySwappiness?:number,
		oomKillDisable?:boolean,
		pidsLimit?:number,
		ulimits?:any[],
		cpuCount:number,
		cpuPercent:number,
		ioMaximumIOps:number,
		ioMaximumBandwidth:number,
		mounts?:any[],
		maskedPaths?:string[],
		readonlyPaths?:string[],
		init?:boolean
	}
	export interface ImageCoordinateTransformation{
		sourcePath?:string,
		targetPath?:string,
		targetEPSGCode:number,
		resample:number,
		noDataValue:number,
		fileSystemID?:string,
		userID?:string
	}
	export interface ImageInspectResponse{
		id?:string,
		repoTags?:string[],
		repoDigests?:string[],
		parent?:string,
		comment?:string,
		created:string,
		container?:string,
		containerConfig:Config,
		dockerVersion?:string,
		author?:string,
		config:Config,
		architecture?:string,
		variant?:string,
		os?:string,
		osVersion?:string,
		size:number,
		virtualSize:number,
		graphDriver:GraphDriverData,
		rootFS:RootFS,
		metadata:ImageMetadata
	}
	export interface ImageMerge{
		imagePaths?:string[],
		noDataValue:number,
		targetPath?:string,
		fileSystemID?:string,
		userID?:string
	}
	export interface ImageMetadata{
		lastTagTime:string
	}
	export interface ImageSpaceRegistration{
		groundControlPoints?:any[],
		sourcePath?:string,
		targetPath?:string,
		targetEPSGCode:number,
		resample:number,
		fileSystemID?:string,
		userID?:string
	}
	export interface Imageinfo{
		id?:string,
		name?:string,
		bandcount?:string,
		resolution?:string,
		format?:string,
		minx?:number,
		miny?:number,
		maxx?:number,
		maxy?:number,
		filesize?:number,
		createtime?:string,
		apply:boolean,
		crs?:string,
		servicetype?:string,
		userid?:string,
		status:boolean,
		resultpath?:string,
		fullpath?:string,
		statusmessage?:string
	}
	export interface ImageinfoPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface ImagesListResponse{
		containers:number,
		created:string,
		id?:string,
		labels?:any,
		parentID?:string,
		repoDigests?:string[],
		repoTags?:string[],
		sharedSize:number,
		size:number,
		virtualSize:number
	}
	export interface ImagesListResponsePageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface Int64Int64Action{
		target?:any,
		method:MethodInfo
	}
	export interface LogConfig{
		type?:string,
		config?:any
	}
	export interface LowAltitudeAreaPlan{
		id?:string,
		code?:string,
		name?:string,
		type?:string,
		area?:string,
		range?:string,
		areaSize:number,
		createTime?:string,
		geojson?:string,
		businessType:number,
		filePath?:string,
		userId?:string,
		geojsonpath?:string
	}
	export interface LowAltitudeAreaPlanPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface Mapinfo{
		id?:string,
		name?:string,
		bounds?:string,
		format?:string,
		version?:string,
		createtime?:string,
		apply:boolean,
		userid?:string,
		fullpath?:string,
		resultpath?:string,
		status:boolean,
		maptype?:string
	}
	export interface MapinfoPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface MemberInfo{
		memberType:MemberTypes,
		name?:string,
		declaringType:Type,
		reflectedType:Type,
		module:Module,
		customAttributes?:any[],
		isCollectible:boolean,
		metadataToken:number
	}
	export interface MethodBase{
		memberType:MemberTypes,
		name?:string,
		declaringType:Type,
		reflectedType:Type,
		module:Module,
		customAttributes?:any[],
		isCollectible:boolean,
		metadataToken:number,
		attributes:MethodAttributes,
		methodImplementationFlags:MethodImplAttributes,
		callingConvention:CallingConventions,
		isAbstract:boolean,
		isConstructor:boolean,
		isFinal:boolean,
		isHideBySig:boolean,
		isSpecialName:boolean,
		isStatic:boolean,
		isVirtual:boolean,
		isAssembly:boolean,
		isFamily:boolean,
		isFamilyAndAssembly:boolean,
		isFamilyOrAssembly:boolean,
		isPrivate:boolean,
		isPublic:boolean,
		isConstructedGenericMethod:boolean,
		isGenericMethod:boolean,
		isGenericMethodDefinition:boolean,
		containsGenericParameters:boolean,
		methodHandle:RuntimeMethodHandle,
		isSecurityCritical:boolean,
		isSecuritySafeCritical:boolean,
		isSecurityTransparent:boolean
	}
	export interface MethodInfo{
		name?:string,
		declaringType:Type,
		reflectedType:Type,
		module:Module,
		customAttributes?:any[],
		isCollectible:boolean,
		metadataToken:number,
		attributes:MethodAttributes,
		methodImplementationFlags:MethodImplAttributes,
		callingConvention:CallingConventions,
		isAbstract:boolean,
		isConstructor:boolean,
		isFinal:boolean,
		isHideBySig:boolean,
		isSpecialName:boolean,
		isStatic:boolean,
		isVirtual:boolean,
		isAssembly:boolean,
		isFamily:boolean,
		isFamilyAndAssembly:boolean,
		isFamilyOrAssembly:boolean,
		isPrivate:boolean,
		isPublic:boolean,
		isConstructedGenericMethod:boolean,
		isGenericMethod:boolean,
		isGenericMethodDefinition:boolean,
		containsGenericParameters:boolean,
		methodHandle:RuntimeMethodHandle,
		isSecurityCritical:boolean,
		isSecuritySafeCritical:boolean,
		isSecurityTransparent:boolean,
		memberType:MemberTypes,
		returnParameter:ParameterInfo,
		returnType:Type,
		returnTypeCustomAttributes:ICustomAttributeProvider
	}
	export interface MilitaryAircraftElement{
		id?:string,
		name?:string,
		type?:string,
		area?:string,
		dataFormat?:string,
		code?:string,
		range?:string,
		fileSize:number,
		createTime?:string,
		geojson?:string,
		businessType:number,
		filePath?:string,
		userId?:string,
		geojsonpath?:string
	}
	export interface MilitaryAircraftElementPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface Module{
		assembly:Assembly,
		fullyQualifiedName?:string,
		name?:string,
		mdStreamVersion:number,
		moduleVersionId:string,
		scopeName?:string,
		moduleHandle:ModuleHandle,
		customAttributes?:any[],
		metadataToken:number
	}
	export interface ModuleHandle{
		mdStreamVersion:number
	}
	export interface MonitorStation{
		name?:string,
		code:number,
		address?:string,
		longitude:number,
		latitude:number,
		waterSystemCode?:string,
		type:number,
		stationNumber?:string
	}
	export interface MonitorStationPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface Mount{
		type?:string,
		source?:string,
		target?:string,
		readOnly:boolean,
		consistency?:string,
		bindOptions:BindOptions,
		volumeOptions:VolumeOptions,
		tmpfsOptions:TmpfsOptions
	}
	export interface MountPoint{
		type?:string,
		name?:string,
		source?:string,
		destination?:string,
		driver?:string,
		mode?:string,
		rw:boolean,
		propagation?:string
	}
	export interface MyMetadata{
		id?:string,
		name?:string,
		content?:string,
		type?:number,
		scope?:string,
		source?:string,
		format?:string,
		crs?:string,
		mass?:string,
		precision?:string,
		createTime:string,
		createTimeStr?:string
	}
	export interface MyMetadataPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface NetworkSettings{
		bridge?:string,
		sandboxID?:string,
		hairpinMode:boolean,
		linkLocalIPv6Address?:string,
		linkLocalIPv6PrefixLen:number,
		ports?:any,
		sandboxKey?:string,
		secondaryIPAddresses?:any[],
		secondaryIPv6Addresses?:any[],
		endpointID?:string,
		gateway?:string,
		globalIPv6Address?:string,
		globalIPv6PrefixLen:number,
		ipAddress?:string,
		ipPrefixLen:number,
		iPv6Gateway?:string,
		macAddress?:string,
		networks?:any
	}
	export interface NetworkingConfig{
		endpointsConfig?:any
	}
	export interface ObstacleInfo{
		id?:string,
		geom?:string,
		name?:string,
		type?:string,
		cicha?:number,
		airport?:string,
		height?:number,
		x?:number,
		y?:number,
		bottom?:number,
		top?:number,
		createtime?:string,
		userid?:string,
		level:number,
		levelname?:string,
		distance?:number
	}
	export interface ObstacleInfoPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface ObstacleTask{
		airRouteID?:string,
		bufferLength:number,
		distanceClassify?:any[],
		obstacleTypes?:string[]
	}
	export interface OnestepTask{
		rangeid?:string,
		parameters?:any[]
	}
	export interface Parameter{
		tasktype?:string,
		parameterjson?:string
	}
	export interface ParameterInfo{
		attributes:ParameterAttributes,
		member:MemberInfo,
		name?:string,
		parameterType:Type,
		position:number,
		isIn:boolean,
		isLcid:boolean,
		isOptional:boolean,
		isOut:boolean,
		isRetval:boolean,
		defaultValue?:any,
		rawDefaultValue?:any,
		hasDefaultValue:boolean,
		customAttributes?:any[],
		metadataToken:number
	}
	export interface Poi{
		id?:string,
		name?:string,
		address?:string,
		phone?:string,
		tag?:string,
		location:GeoLocation
	}
	export interface Port{
		ip?:string,
		privatePort:number,
		publicPort:number,
		type?:string
	}
	export interface PortBinding{
		hostIP?:string,
		hostPort?:string
	}
	export interface PropertyInfo{
		name?:string,
		declaringType:Type,
		reflectedType:Type,
		module:Module,
		customAttributes?:any[],
		isCollectible:boolean,
		metadataToken:number,
		memberType:MemberTypes,
		propertyType:Type,
		attributes:PropertyAttributes,
		isSpecialName:boolean,
		canRead:boolean,
		canWrite:boolean,
		getMethod:MethodInfo,
		setMethod:MethodInfo
	}
	export interface RealTimeDataForDailyRainfall{
		id?:string,
		monitorStationName?:string,
		monitorStationLongitude:number,
		monitorStationLatitude:number,
		dailyRainfall:number,
		createTime:string
	}
	export interface RealTimeDataForDailyRainfallPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface Realtimedata{
		id?:string,
		name?:string,
		filename?:string,
		filepath?:string,
		vid?:string,
		date?:string,
		version?:string,
		create?:string,
		update?:string,
		userid?:string,
		bounds?:string
	}
	export interface RealtimedataPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface RestartPolicy{
		name:RestartPolicyKind,
		maximumRetryCount:number
	}
	export interface RootFS{
		type?:string,
		layers?:string[],
		baseLayer?:string
	}
	export interface RuntimeFieldHandle{
		value:IntPtr
	}
	export interface RuntimeMethodHandle{
		value:IntPtr
	}
	export interface RuntimeTypeHandle{
		value:IntPtr
	}
	export interface Scene3d{
		id?:string,
		name?:string,
		extent?:string,
		config?:string,
		userid?:string,
		createtime?:string,
		updatetime?:string,
		type?:number,
		creator?:string,
		img?:string,
		layouts?:any[]
	}
	export interface Scene3dPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface Scenemedia{
		id?:string,
		mediaName?:string,
		mediaUrl?:string,
		lon?:number,
		lat?:number,
		elevation?:number,
		vid?:string,
		sceneid?:string,
		createtime?:string,
		mediatype?:string
	}
	export interface ScenemediaPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface Sharpen{
		sourcePaths?:string[],
		saveFolder?:string,
		percentage:number,
		fileSystemID?:string,
		userID?:string
	}
	export interface StatisticalVM{
		name?:string,
		total:number
	}
	export interface StringAnalysistaskGroupsAnalysisTaskType{
		taskType?:string,
		tasks?:any[],
		count:number,
		latestTime?:string,
		sortOrder:number
	}
	export interface StringPoint{
		x:number,
		y:number,
		userData?:string
	}
	export interface StringStringTuple{
		item1?:string,
		item2?:string
	}
	export interface StructLayoutAttribute{
		typeId?:any,
		value:LayoutKind
	}
	export interface SummaryNetworkSettings{
		networks?:any
	}
	export interface SyncVFile{
		vid?:string,
		id?:string,
		name?:string,
		file_size:number,
		full_path?:string,
		group_sysid?:string,
		group_userid?:string
	}
	export interface ThresholdInfo{
		level:number,
		levelName?:string,
		min:number,
		max:number
	}
	export interface ThrottleDevice{
		path?:string,
		rate:number
	}
	export interface TmpfsOptions{
		sizeBytes:number,
		mode:number
	}
	export interface Type{
		name?:string,
		customAttributes?:any[],
		isCollectible:boolean,
		metadataToken:number,
		isInterface:boolean,
		memberType:MemberTypes,
		namespace?:string,
		assemblyQualifiedName?:string,
		fullName?:string,
		assembly:Assembly,
		module:Module,
		isNested:boolean,
		declaringType:Type,
		declaringMethod:MethodBase,
		reflectedType:Type,
		underlyingSystemType:Type,
		isTypeDefinition:boolean,
		isArray:boolean,
		isByRef:boolean,
		isPointer:boolean,
		isConstructedGenericType:boolean,
		isGenericParameter:boolean,
		isGenericTypeParameter:boolean,
		isGenericMethodParameter:boolean,
		isGenericType:boolean,
		isGenericTypeDefinition:boolean,
		isSZArray:boolean,
		isVariableBoundArray:boolean,
		isByRefLike:boolean,
		isFunctionPointer:boolean,
		isUnmanagedFunctionPointer:boolean,
		hasElementType:boolean,
		genericTypeArguments?:any[],
		genericParameterPosition:number,
		genericParameterAttributes:GenericParameterAttributes,
		attributes:TypeAttributes,
		isAbstract:boolean,
		isImport:boolean,
		isSealed:boolean,
		isSpecialName:boolean,
		isClass:boolean,
		isNestedAssembly:boolean,
		isNestedFamANDAssem:boolean,
		isNestedFamily:boolean,
		isNestedFamORAssem:boolean,
		isNestedPrivate:boolean,
		isNestedPublic:boolean,
		isNotPublic:boolean,
		isPublic:boolean,
		isAutoLayout:boolean,
		isExplicitLayout:boolean,
		isLayoutSequential:boolean,
		isAnsiClass:boolean,
		isAutoClass:boolean,
		isUnicodeClass:boolean,
		isCOMObject:boolean,
		isContextful:boolean,
		isEnum:boolean,
		isMarshalByRef:boolean,
		isPrimitive:boolean,
		isValueType:boolean,
		isSignatureType:boolean,
		isSecurityCritical:boolean,
		isSecuritySafeCritical:boolean,
		isSecurityTransparent:boolean,
		structLayoutAttribute:StructLayoutAttribute,
		typeInitializer:ConstructorInfo,
		typeHandle:RuntimeTypeHandle,
		guid:string,
		baseType:Type,
		isSerializable:boolean,
		containsGenericParameters:boolean,
		isVisible:boolean
	}
	export interface TypeInfo{
		name?:string,
		customAttributes?:any[],
		isCollectible:boolean,
		metadataToken:number,
		isInterface:boolean,
		memberType:MemberTypes,
		namespace?:string,
		assemblyQualifiedName?:string,
		fullName?:string,
		assembly:Assembly,
		module:Module,
		isNested:boolean,
		declaringType:Type,
		declaringMethod:MethodBase,
		reflectedType:Type,
		underlyingSystemType:Type,
		isTypeDefinition:boolean,
		isArray:boolean,
		isByRef:boolean,
		isPointer:boolean,
		isConstructedGenericType:boolean,
		isGenericParameter:boolean,
		isGenericTypeParameter:boolean,
		isGenericMethodParameter:boolean,
		isGenericType:boolean,
		isGenericTypeDefinition:boolean,
		isSZArray:boolean,
		isVariableBoundArray:boolean,
		isByRefLike:boolean,
		isFunctionPointer:boolean,
		isUnmanagedFunctionPointer:boolean,
		hasElementType:boolean,
		genericTypeArguments?:any[],
		genericParameterPosition:number,
		genericParameterAttributes:GenericParameterAttributes,
		attributes:TypeAttributes,
		isAbstract:boolean,
		isImport:boolean,
		isSealed:boolean,
		isSpecialName:boolean,
		isClass:boolean,
		isNestedAssembly:boolean,
		isNestedFamANDAssem:boolean,
		isNestedFamily:boolean,
		isNestedFamORAssem:boolean,
		isNestedPrivate:boolean,
		isNestedPublic:boolean,
		isNotPublic:boolean,
		isPublic:boolean,
		isAutoLayout:boolean,
		isExplicitLayout:boolean,
		isLayoutSequential:boolean,
		isAnsiClass:boolean,
		isAutoClass:boolean,
		isUnicodeClass:boolean,
		isCOMObject:boolean,
		isContextful:boolean,
		isEnum:boolean,
		isMarshalByRef:boolean,
		isPrimitive:boolean,
		isValueType:boolean,
		isSignatureType:boolean,
		isSecurityCritical:boolean,
		isSecuritySafeCritical:boolean,
		isSecurityTransparent:boolean,
		structLayoutAttribute:StructLayoutAttribute,
		typeInitializer:ConstructorInfo,
		typeHandle:RuntimeTypeHandle,
		guid:string,
		baseType:Type,
		isSerializable:boolean,
		containsGenericParameters:boolean,
		isVisible:boolean,
		genericTypeParameters?:any[],
		declaredConstructors?:any[],
		declaredEvents?:any[],
		declaredFields?:any[],
		declaredMembers?:any[],
		declaredMethods?:any[],
		declaredNestedTypes?:any[],
		declaredProperties?:any[],
		implementedInterfaces?:any[]
	}
	export interface Ulimit{
		name?:string,
		hard:number,
		soft:number
	}
	export interface UniformColor{
		sourcePaths?:string[],
		referencePath?:string,
		saveFolder?:string,
		fileSystemID?:string,
		userID?:string
	}
	export interface Variflight{
		id?:string,
		name?:string,
		code?:string,
		type?:string,
		startpoint?:string,
		endpoint?:string,
		length?:number,
		createtime?:string,
		area?:string,
		userid?:string,
		coordinates?:[][],
		geojson?:string,
		length3d:number,
		box3d?:string
	}
	export interface VariflightCreate{
		name?:string,
		code?:string,
		type?:string,
		startpoint?:string,
		endpoint?:string,
		area?:string,
		coordinates?:[][]
	}
	export interface VariflightPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface VectorCoordinateTransformation{
		sourcePath?:string,
		targetPath?:string,
		targetEPSGCode:number,
		fileSystemID?:string,
		userID?:string
	}
	export interface VectorSpaceRegistration{
		groundControlPoints?:any[],
		sourcePath?:string,
		targetPath?:string,
		targetEPSGCode:number,
		fileSystemID?:string,
		userID?:string
	}
	export interface VolumeOptions{
		noCopy:boolean,
		labels?:any,
		driverConfig:Driver
	}
	export interface WFSServiceInfo{
		id?:string,
		name?:string,
		aliasname?:string,
		fileids?:string,
		filepath?:string,
		mapproject?:string,
		createtime?:string,
		userid?:string,
		vectorlayerids?:string,
		remark?:string,
		url?:string,
		servicetype?:number,
		scope?:string,
		content?:string,
		source?:string,
		mass?:string,
		precision?:string
	}
	export interface WFSServiceInfoPageList{
		totalCount:number,
		totalPages:number,
		datas?:any[]
	}
	export interface WeightDevice{
		path?:string,
		weight:number
	}
