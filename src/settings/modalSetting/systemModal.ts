import type { IModalConfig } from 'xframelib';

/**
 * 组件配置项
 */
const defaultModalConfig: Array<IModalConfig> = [
  {
    id: 'changeMyPWD',
    label: '修改自己的密码',
    component: () => import('src/components/User/ChangePwd.vue'),
  },
  {
    id: 'loginModal',
    label: '用户登录-对话框',
    component: () => import('pages/shared/login/modals/loginModal.vue'),
  },
];

export default defaultModalConfig;
