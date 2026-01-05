import type { _DeepPartial } from 'pinia';
import { defineStore } from 'pinia';
// import { clearRight, logout, Storage } from 'xframelib';

// const USER_SYS_KEY = 'USER_SYS_KEY';
// const userST = new Storage('', localStorage);

//飞行环境评估
interface stateData {
  routeInfo: FlightAnalyzeLine;
  spatialAnalyzeResult: analyzeResult;
  safeHeightResult: analyzeResult;
  barrierConflictResult: analyzeResult;
  weatherAnalyzeResult: analyzeResult;
}
interface FlightAnalyzeLine {
  id: string;
  name: string;
  buffer: number;
  coordinates: Array<number>
}
interface analyzeResult {
  geojsonURL: string;
  statisticsjsonURL: string;
}

//定义Store函数
const flightAnalyzeStore = defineStore('flightAnalyzeStore', {
  state: () => {
    const stateData: stateData = {
      routeInfo: {
        id: '',
        name: '',
        buffer: 100,
        coordinates: []
      },
      spatialAnalyzeResult: {
        geojsonURL: '',
        statisticsjsonURL: '',
      },
      safeHeightResult: {
        geojsonURL: '',
        statisticsjsonURL: '',
      },
      barrierConflictResult: {
        geojsonURL: '',
        statisticsjsonURL: '',
      },
      weatherAnalyzeResult: {
        geojsonURL: '',
        statisticsjsonURL: '',
      },
    };
    return stateData;
  },
  getters: {},
  actions: {
    //数据赋值
    SetData(fileItem: FlightAnalyzeLine) {
      if (fileItem) {
        this.routeInfo = fileItem;
      }
    },
    setSpatialAnalyzeResult(data: analyzeResult) {
      if (data) {
        this.spatialAnalyzeResult = data;
      }
    },
    setSafeHeightResult(data: analyzeResult) {
      if (data) {
        this.safeHeightResult = data;
      }
    },
    setBarrierConflictResult(data: analyzeResult) {
      if (data) {
        this.barrierConflictResult = data;
      }
    },
    setWeatherAnalyzeResult(data: analyzeResult) {
      if (data) {
        this.weatherAnalyzeResult = data;
      }
    },
  },
});

export { flightAnalyzeStore };
