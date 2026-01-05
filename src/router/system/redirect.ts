const routes: Array<RouteRecordRaw> = [
  {
    path: '/redirect/:path*',
    name: 'Redirect',
    component: {},
    meta: {
      index: 70,
      title: '重定向',
      icon: 'SettingOutlined',
      hidden: true,
      isSystem: true,
    },
    children: [
      {
        path: '',
        name: 'Redirect2',
        component: () => import('pages/shared/redirect/index.vue'),
        meta: {
          title: '重定向',
          hidden: true,
          keepAlive: false,
        },
      },
    ],
  },
];

export default routes;
