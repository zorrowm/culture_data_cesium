import { date } from 'quasar';
import { RouteData } from 'src/models/index';
import { Router, RouteRecordRaw } from 'vue-router';
import { H5Tool } from 'xframelib';

import pkg from '../../package.json';

const { name, version } = pkg;
export const __APP_INFO__ = {
  pkg: { name, version },
  lastBuildTime: date.formatDate('YYYY-MM-DD HH:mm:ss'),
};
/**
 * 获取当前系统的ID
 * （从package获取）
 * @returns
 */
export function getSystemID(): string {
  const { pkg } = __APP_INFO__;
  const sysinfo = `${pkg.name}_${pkg.version}`;
  const systemID = H5Tool.MD5(sysinfo);
  return systemID;
}

export function getSystemPKG() {
  const { pkg } = __APP_INFO__;
  return pkg;
}
