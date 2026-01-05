import { date } from "quasar";
import { Global, requestGet, requestPostBody, ResponseType } from "xframelib";
const baseURL: string = Global.Config.ServiceURL.FlightServiceURL;
const APIPath = Global.Config.APIPath as any;
const flightApplyRequest: string = APIPath.FlightApplyRequest;
const flightPlanList: string = APIPath.FlightPlanList;
const airmenNotice: string = APIPath.AirmenNotice;
//审批结果
const processResult: string = APIPath.ProcessResult;

function getStartEndTime() {
  const today = new Date();
  const todayString = date.formatDate(today, "YYYY-MM-DD");
  const begindate = todayString + "  00:00:00";
  const enddate = todayString + " 23:59:59";
  return [begindate, enddate];
}
/**
 * 放行申请-查询
 * @param keyword
 * @param status 放行状态
 * @param begindate
 * @param enddate
 * @param page
 * @param limt
 * @param headers
 * @param responseType
 * @param timeoutMS
 * @returns
 */
export async function GetApplyPlanList(
  keyword: string,
  status: string,
  begindate: string,
  enddate: string,
  page: number,
  limt: number,
  headers?: any,
  responseType: ResponseType = "json",
  timeoutMS?: number,
): Promise<{ response: any; data: any }> {
  const response = await requestGet(
    flightApplyRequest,
    baseURL,
    { keyword, status, page, limt, begindate, enddate },
    headers,
    responseType,
    undefined,
    timeoutMS,
  );
  return { response, data: response?.data };
}

/**
 * 获取飞行申请的审批记过
 * @param applyid 飞行申请ID
 * @param headers 
 * @param responseType 
 * @param timeoutMS 
 * @returns 
 */
export async function GetProcessResult(
  applyid: string,
  headers?: any,
  responseType: ResponseType = "json",
  timeoutMS?: number,
): Promise<{ response: any; data: any }> {
  const response = await requestGet(
    processResult,
    baseURL,
    { applyid},
    headers,
    responseType,
    undefined,
    timeoutMS,
  );
  return { response, data: response?.data };
}

/**
 * 飞行计划搜索（次日、今日、历史）
 * @param keyword  关键字
 * @param datasource 数据源,服务站 0 支线机场 1 中南系统 2
 * @param begindate
 * @param enddate
 * @param page
 * @param limt
 * @returns
 */
export async function GetFlightPlan(
  keyword: string,
  datasource: string,
  begindate: string,
  enddate: string,
  page: number,
  limt: number,
  headers?: any,
  responseType: ResponseType = "json",
  timeoutMS?: number,
): Promise<{ response: any; data: any }> {
  const response = await requestGet(
    flightPlanList,
    baseURL,
    { keyword, datasource, page, limt, begindate, enddate },
    headers,
    responseType,
    undefined,
    timeoutMS,
  );
  return { response, data: response?.data };
}

/**
 * 重要飞行计划+搜索
 * @param keyword  关键字
 * @param datasource 数据源,服务站 0 支线机场 1 中南系统 2
 * @param page
 * @param limt
 * @returns
 */
export async function GetFlightPlanA(
  keyword: string,
  datasource: string,
  page: number,
  limt: number,
  headers?: any,
  responseType: ResponseType = "json",
  timeoutMS?: number,
): Promise<{ response: any; data: any }> {
  const planlevel = "A";
  const response = await requestGet(
    flightPlanList,
    baseURL,
    { keyword, datasource, page, limt, planlevel },
    headers,
    responseType,
    undefined,
    timeoutMS,
  );
  return { response, data: response?.data };
}

/**
 * 航空情报
 * @param page
 * @param limt
 * @returns
 */
export async function GetAirmenNotice(
  page: number,
  limt: number,
  headers?: any,
  responseType: ResponseType = "json",
  timeoutMS?: number,
): Promise<{ response: any; data: any }> {
  const response = await requestGet(
    airmenNotice,
    baseURL,
    { page, limt },
    headers,
    responseType,
    undefined,
    timeoutMS,
  );
  return { response, data: response?.data };
}

/**
 * 本场计划
 * @param keyword  关键字
 * @param page
 * @param limt
 * @returns
 */
export async function GetLocalPlan(
  keyword: string,
  page: number,
  limt: number,
  headers?: any,
  responseType: ResponseType = "json",
  timeoutMS?: number,
): Promise<{ response: any; data: any }> {
  const planflystyle = "bc";
  const abctype = "sq";
  const status = "PASSEDPLAN";
  const [begindate,enddate]= getStartEndTime();
  const response = await requestGet(
    flightPlanList,
    baseURL,
    { planflystyle, abctype, status, keyword, page, limt, begindate, enddate },
    headers,
    responseType,
    undefined,
    timeoutMS,
  );
  return { response, data: response?.data };
}

/**
 * 转场计划
 * @param keyword  关键字
 * @param page
 * @param limt
 * @returns
 */
export async function GetOtherPlan(
  keyword: string,
  page: number,
  limt: number,
  headers?: any,
  responseType: ResponseType = "json",
  timeoutMS?: number,
): Promise<{ response: any; data: any }> {
  const planflystyle = "zc";
  const abctype = "sq";
  const status = "PASSEDPLAN";
  const [begindate,enddate]= getStartEndTime();
  const response = await requestGet(
    flightPlanList,
    baseURL,
    { planflystyle, abctype, status, keyword, page, limt, begindate, enddate },
    headers,
    responseType,
    undefined,
    timeoutMS,
  );
  return { response, data: response?.data };
}

/**
 * 报备计划
 * @param keyword  关键字
 * @param page
 * @param limt
 * @returns
 */
export async function GetBakPlan(
  keyword: string,
  page: number,
  limt: number,
  headers?: any,
  responseType: ResponseType = "json",
  timeoutMS?: number,
): Promise<{ response: any; data: any }> {
  const abctype = "bb";
  const status = "PASSEDPLAN";
  const [begindate,enddate]= getStartEndTime();
  const response = await requestGet(
    flightPlanList,
    baseURL,
    { abctype, status, keyword, page, limt, begindate, enddate },
    headers,
    responseType,
    undefined,
    timeoutMS,
  );
  return { response, data: response?.data };
}

/**
 * 通用飞机接口
 * @param province 默认：湖南 
 * @param headers 
 * @param responseType 
 * @param timeoutMS 
 * @returns 
 */
export async function GetCommonFlightList(
  province: string,
  headers?: any,
  responseType: ResponseType = "json",
  timeoutMS?: number,
): Promise<{ response: any; data: any }> {
  const response = await requestGet(
    APIPath.CommonFlightList,
    baseURL,
    { province},
    headers,
    responseType,
    undefined,
    timeoutMS,
  );
  return { response, data: response?.data };
}
/**
 * 告警查询
 * @param headers 
 * @param responseType 
 * @param timeoutMS 
 * @returns 
 */
export async function GetFlightWarnList(
  headers?: any,
  responseType: ResponseType = "json",
  timeoutMS?: number,
): Promise<{ response: any; data: any }> {
  const response = await requestGet(
    APIPath.FlightMonitorWarn,
    baseURL,
    undefined,
    headers,
    responseType,
    undefined,
    timeoutMS,
  );
  return { response, data: response?.data };
}


/**
 * 获取管制区
 * @param planid 
 * @param headers 
 * @param responseType 
 * @param timeoutMS 
 * @returns 
 */
export async function GetAirportControlZoneByPlanid(
  planid:string,
  headers?: any,
  responseType: ResponseType = "json",
  timeoutMS?: number,
): Promise<{ response: any; data: any }> {
  const response = await requestPostBody(
    APIPath.AirportControlZone,
    baseURL,
    {
      id:planid
    },
    undefined,
    headers,
    responseType,
    undefined,
    timeoutMS,
  );
  return { response, data: response?.data };
}