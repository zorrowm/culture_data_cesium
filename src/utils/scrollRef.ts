import { computed } from 'vue';

import LayoutTool from './layoutTool';

const scrollRef = computed(() => {
  const width = LayoutTool.getContentWidth(20);
  const height = LayoutTool.getContentHeight(70);
  return { x: width, y: height };
});
export { scrollRef };
