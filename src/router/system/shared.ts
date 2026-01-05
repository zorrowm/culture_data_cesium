/**
 * 不需要授权就可以访问的页面
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    meta: {
      index: 10,
      title: '系统登录',
      isSystem: true,
    },
    component: () => import('pages/shared/login/index.vue'), //'pages/shared/login/index.vue'
  },
  {
    path: '/onelogin',
    name: 'onelogin',
    meta: {
      index: 11,
      title: '统一登录',
      isSystem: true,
    },
    component: () => import('pages/shared/onelogin/index.vue'),
  },
 {
  path:'/',//指定首页
  redirect:'/bigscreen/index'
 }
];

export default routes;
