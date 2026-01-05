import type { RouteRecordRaw } from 'vue-router';

const mainLayout = {
  path: '/bigscreen',
  name: 'bigscreen',
  component: () => import('layouts/bigScreen/index.vue'),
  meta: {
    title: '',
  },
  children: [
    {
      path: '/bigscreen/index',
      name: 'bigscreen-index',
      meta: {
        title: '飞行场景-三维',
      },
      component: () => import('pages/bigScreen/indexView.vue'),
    },
    // {
    //   path: '/bigscreen/map2d',
    //   name: 'bigscreen-map2d',
    //   meta: {
    //     title: '飞行场景-二维',
    //   },
    //   component: () => import('pages/bigScreen/map2DView.vue'),
    // },
  ],
} as RouteRecordRaw;
export default mainLayout;
