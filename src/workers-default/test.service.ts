import { H5Tool } from "xframelib";
//参考：https://www.npmjs.com/package/vite-plugin-webworker-service?activeTab=readme
export async function add(a: number, b: number) {
  const res = a + b;
  return res;
}

export async function md5Str(a: any) {
  // return isString(a);
  return H5Tool.MD5(a);
}
