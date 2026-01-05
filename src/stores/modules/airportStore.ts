import type { _DeepPartial } from 'pinia';
import { defineStore } from 'pinia';
import projectSetting from 'src/settings/projectSetting';
import { nextTick } from 'vue';
import { deepMerge, H5Tool, Storage } from 'xframelib';

import type { MenuSetting, ProjectConfig } from '@/models/IConfig';

const PROJ_CONFIG_KEY = 'PROJ_SETTINGS_KEY';
const appStorage = new Storage('', sessionStorage);
interface IAirportInfo
{
    name:string
}
const defaultObj: IAirportInfo = {
  name:''
};

//定义Store函数
const airportStore = defineStore('airport', {
  state: () => {
    const stateData: IAirportInfo = defaultObj;
    return stateData;
  },
  getters: {  },
  actions: {
  },
});

export { airportStore };
