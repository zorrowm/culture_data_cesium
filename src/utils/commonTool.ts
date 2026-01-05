
//保留小数数据
export function ReserveDecimal(value: number, digit = 2) {
  const count = Math.pow(10, digit);
  return Math.round(value * count) / count;
}

// 将±180°范围内的角度转换为0-360°范围，360°会转换为0° 并保留两位小数
export function convertAngle(angle: number) {
  if (angle === 0) {
    return 0;
  }
  // 确保输入是数字
  // if (typeof angle !== 'number' || isNaN(angle)) {
  //     throw new Error('输入必须是有效的数字');
  // }
  // 先将角度规范化到0-360范围
  let normalized = ReserveDecimal(((angle % 360) + 360) % 360 , 2);

  // 处理360°的情况，转换为0°
  if (normalized === 360) {
    normalized = 0;
  }

  return normalized;
}