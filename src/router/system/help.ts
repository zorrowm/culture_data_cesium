const help = {
  path: '/help/:name',
  name: 'help',
  meta: {
    title: '相关内部系统功能',
    isSystem: true,
  },
  component: () => import('pages/shared/help/index.vue'),
};

export default [help];
