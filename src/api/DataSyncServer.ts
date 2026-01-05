import { Global, requestGet,requestPostBody } from 'xframelib';
/**
 * 数据保存(文件系统数据)
 * @param bodyParams SyncVFile
 */
export async function SaveDataSysFile(type: string, bodyParams: SyncVFile): Promise<boolean> {
  if(Global.Config.SyncDataArray)
    {
       const item=Global.Config.SyncDataArray.find(p=>p.id===type);
       if(item)
        {
          const  response = await requestPostBody(item.action, item.url, bodyParams, undefined);
          return response?.data as boolean;
        }
    }
    return false;
  
}
export interface StatisticsDto {
  name?: string;
  count: number;
  size: number;
}
export interface SyncVFile {
  vid?: string;
  id?: string;
  name?: string;
  file_size: number;
  full_path?: string;
  group_sysid?: string;
  group_userid?: string;
}
