import { getRandomItem,initWorker, registerWorkerSerivces } from 'xframelib';

const workerURLGroup = [
  new Worker(new URL('./workers/back-default-worker1.ts', import.meta.url), {
    type: 'module',
  }),
  new Worker(new URL('./workers/back-default-worker2.ts', import.meta.url), {
    type: 'module',
  }),
  new Worker(new URL('./workers/back-default-worker3.ts', import.meta.url), {
    type: 'module',
  }),
  // new Worker(new URL('./workers/back-default-worker4.ts', import.meta.url), {
  //   type: 'module',
  // }),
  // new Worker(new URL('./workers/back-default-worker5.ts', import.meta.url), {
  //   type: 'module',
  // }),
];

/**
 * webworker方法项
 */
const components = import.meta.glob('./*.service.ts', { eager: true });

/**
 * 创建后台进程
 * @param url
 * @returns
 */
function creatBackWorker(virtualWebWorker: Worker) {
  // const virtualWebWorker = new Worker(url, {
  //   type: 'module',
  // });
  //初始化
  initWorker(virtualWebWorker);

  const workerObject = registerWorkerSerivces(components, virtualWebWorker);
  return workerObject;
}
/**
 * 生成线程组
 * @returns
 */
function getWokersByURLGroup() {
  const group: any = [];
  workerURLGroup.forEach((item) => {
    group.push(creatBackWorker(item));
  });
  return group;
}

//线程组
const workerGroup = getWokersByURLGroup();

/**
 * 随机线程
 * @returns
 */
function getRandomWorker():any {
  return getRandomItem(workerGroup);
}

/**
 * 获取随机线程里的功能
 * @param funcName
 * @returns
 */
export function getWorkerFunc(funcName: string) {
  /**
   * 随机线程
   */
  const currentWorker = getRandomWorker();
  return currentWorker[funcName];
}

export default getRandomWorker;
