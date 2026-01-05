import type { App, Plugin } from 'vue';
import { ref,unref } from 'vue';
import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import { doLoadModal, isObjectX } from 'xframelib';


/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObjectX(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function openWindow(
  url: string,
  opt?: {
    target?: '_blank' | '_self' | '_parent' | '_top' | string;
    noopener?: boolean;
    noreferrer?: boolean;
  },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

export function getRGBColor(color16: string): number[] {
  let color = color16.toLowerCase();
  // 如果只有三位的值，需变成六位，如：#fff => #ffffff
  if (color.length === 4) {
    let colorNew = '#';
    for (let i = 1; i < 4; i += 1) {
      const tmp = color.slice(i, i + 1);
      colorNew += tmp.concat(tmp);
    }
    color = colorNew;
  }
  // 处理六位的颜色值，转为RGB
  const colorChange: number[] = [];
  for (let i = 1; i < 7; i += 2) {
    colorChange.push(parseInt('0x' + color.slice(i, i + 2)));
  }
  return colorChange;
}

export function getFirst(obj: any) {
  for (const key in obj) {
    return obj[key];
  }
}


//#region  用于内部 浏览弹框

/**
 * 打开Web浏览窗体
 * @param url 
 */
export function showWebModal(url:string,title?:string)
{
  IsFullModal.value=true;
  const extraData = {
    title: title??'预览'
  };
  const modalData = {
    modalID:'IFrameWebModal',
    rowData:url,
    extraData,
  };
  doLoadModal(modalData);
}

export function showWebXMLModal(content:string)
{
  IsFullModal.value=true;
  const extraData = {
    title: '浏览XML元数据'
  };
  const modalData = {
    modalID:'IFrameWebXMLModal',
    extraData,
    rowData:content,
  };
  doLoadModal(modalData);
}


export const IsFullModal=ref(false);


//#endregion