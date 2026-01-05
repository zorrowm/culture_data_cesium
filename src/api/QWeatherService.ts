import { requestGet } from "xframelib";

export const cityWeatherMap=new Map<string,ICityWeather>();
/**
 * 城市天气模型
 */
export interface ICityWeather{
  locationID:string;//Location_ID
  x:number;//经度
  y:number;//纬度
  weather:IWeatherNow|undefined;//天气信息
}

/**
 * 天气信息模型
 */
export interface IWeatherNow {
  obsTime: string;
  temp: string;
  feelsLike: string;
  icon: string;
  text: string;
  wind360: string;
  windDir: string;
  windScale: string;
  windSpeed: string;
  humidity: string;
  precip: string;
  pressure: string;
  vis: string;
  cloud: string;
  dew: string;
}

/**
 * 获取当前天气信息
 * @param cityID 城市id
 * @returns 
 */
export async function getWeatherNowByID(cityID: string): Promise<IWeatherNow | undefined> {
  // const isdefault=Math.random()<0.5;
  // let url=`https://n73h2qf8wy.re.qweatherapi.com/v7/weather/now?lang=zh&location=${lon},${lat}&t=1687140485&publicid=HE2108291237361722&sign=7528a1fba96233eda66c0933b75a6a15`;
  // if(!isdefault)
  const url = `https://n73h2qf8wy.re.qweatherapi.com/v7/weather/now?lang=zh&location=${cityID}&key=4375908c9afe49998e8a65924057ffba`;
  const res = await requestGet('', url,undefined,{Authorization:undefined});
  if (res && res.data && res.data?.code === '200') {
    const result = res.data.now as IWeatherNow;
    return result;
  } else {
    return undefined;
  }
}