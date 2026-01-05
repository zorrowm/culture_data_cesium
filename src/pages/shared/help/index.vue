<template>提供系统内部辅助功能页面</template>

<script lang="ts">
import { bussinessRoutes } from 'src/router';
import functionList from 'src/settings/functionSetting';
import widgetMenuConfig from 'src/settings/widgetMenuSetting';
import widgetConfigMap from 'src/settings/widgetSetting';
import { getSystemPKG } from 'src/utils/sysTool';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import type { ISysRightOptions } from 'xframelib';
import { Global, writeSysRoleRight } from 'xframelib';

export default defineComponent({
  name: '',
  components: {},
  props: {},
  setup(props, { attrs, slots, emit }) {
    Global.Loading('end');
    const route = useRoute();
    const name = route.params.name as string;
    switch (name) {
      case 'register':
        const bRoutes = [...bussinessRoutes];
        // translateTitle(bRoutes);
        const widgetConfig = [];
        for (const [key, value] of widgetConfigMap) {
          widgetConfig.push(value);
        }

        const options: ISysRightOptions = {
          bussinessRoutes: bRoutes,
          widgetConfig,
          functionList,
          widgetMenuConfig,
          pkgObject: getSystemPKG(),
        };
        //导出菜单JSON
        writeSysRoleRight(options, 'MenuRoutes');
        break;
      default:
        Global.Message.warn(`方法名:${name}不支持，只有register或icon`);
        break;
    }
    // function translateTitle(bRoutes: RouteRecordRaw[]) {
    //   bRoutes.forEach(item => {
    //     if (item.meta) {
    //       const title = item.meta.title as string;
    //       if (title && title.indexOf('.') > 0) {
    //         item.meta.title = Global.t(title);
    //       }
    //     }
    //     if (item.children) translateTitle(item.children);
    //   });
    // }
    return {};
  },
});
</script>
