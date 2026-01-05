import { defineStore } from 'pinia';

interface bigScreenState {
  scriptDataStr: string[] | undefined;
  assessmentState: object | undefined;
  areaID: string | undefined;
  areaName: string | undefined;
  floodHeights: object | undefined;
  floodClear: number | undefined;
}

//定义Store函数
export const bigScreenStore = defineStore('bigScreen', {
  state: () => {
    const stateData: bigScreenState = {
      scriptDataStr: undefined,
      assessmentState: undefined,
      // areaID:'fa62bcba-f882-4059-8669-882a94b04163',
      areaID: undefined,
      areaName: undefined,
      floodHeights: undefined,
      floodClear: undefined,
    };
    return stateData;
  },
  getters: {},
  actions: {
    setScriptDataStr(data) {
      this.scriptDataStr = data;
    },

    // 环境评价状态存储
    setAreaID(id) {
      this.areaID = id;
    },
    setAreaName(name) {
      this.areaName = name;
    },
    setAssessmentState(data) {
      this.assessmentState = data;
    },
    setFloodHeights(data) {
      this.floodHeights = data;
    },
    setFloodClear(data) {
      this.floodClear = data;
    },
  }
});
