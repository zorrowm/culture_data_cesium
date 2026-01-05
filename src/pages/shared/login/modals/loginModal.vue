<template>
  <div class="container" style="height: 500px">
    <div class="login">
      <div class="login-top">用户登录</div>
      <div class="login-center clearfix">
        <div class="login-center-img"><img src="img/login/name.png" /></div>
        <div class="login-center-input">
          <input
            ref="nameInput"
            v-model="formState.username"
            type="text"
            :placeholder="'请输入账号'"
            onfocus="this.placeholder=''"
            @blur="onblur()"
          />
          <div class="login-center-input-text">账号</div>
        </div>
      </div>
      <div class="login-center clearfix">
        <div class="login-center-img">
          <img src="img/login/password.png" />
        </div>
        <div class="login-center-input">
          <input
            ref="pwdInput"
            v-model="formState.password"
            type="password"
            :placeholder="'请输入密码'"
            onfocus="this.placeholder=''"
            @blur="onblur()"
            @keyup.enter="handleSubmit"
          />
          <div class="login-center-input-text">密码</div>
        </div>
      </div>
      <div class="login-button" @click="handleSubmit">登录</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRightRoutes } from 'src/permission';
import { userStore } from 'src/stores';
import { getSystemID } from 'src/utils/sysTool';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { object, oneOfType } from 'vue-types';
import type { IExtraProperty } from 'xframelib';
import type { IUser } from 'xframelib';
import { getSystemRoleRight, Global, login } from 'xframelib';

import { OffEventHandler, OnEventHandler } from '@/events';
import { EmitMsg } from '@/events/index';
import SystemsEvent from '@/events/modules/SystemsEvent';

const name = 'loginIFrame';
defineOptions({ name: 'loginIFrame' });
const props = defineProps({
  data: oneOfType([Object]).def({}),
  extra: object<IExtraProperty>().isRequired,
});
const router = useRouter();
const formState = reactive({
  username: '',
  password: '',
});
const nameInput = ref<HTMLInputElement>();
const pwdInput = ref<HTMLInputElement>();

function onblur() {
  if (nameInput.value) nameInput.value.placeholder = '请输入账号';
  if (pwdInput.value) pwdInput.value.placeholder = '请输入密码';
}
let canLoginClicked = true;
const handleSubmit = async () => {
  if (!canLoginClicked) {
    Global.Logger().debug('频繁点击登录******');
    return;
  }
  canLoginClicked = false;
  if (formState.username.trim() === '' || formState.password.trim() == '') {
    setTimeout(() => {
      canLoginClicked = true;
    }, 2000);
    return Global.Message?.warn('用户名或密码不能为空！');
  }

  //编码后的
  const logindata: IUser = {
    username: formState.username.trim(),
    pwd: formState.password.trim(),
  };
  //用户登录
  const data = await login(logindata).catch((ex) => {
    Global.Message?.warn(`登录失败:${ex.message}!`);
    canLoginClicked = true;
  });
  if (data) {
    await loginSuccess(data);
  }
};

async function loginSuccess(data) {
  const userState = userStore();
  //初始化
  userState.init(data);
  //WM:全局变量，为了解决刷新浏览器路由丢失问题
  Global.User = userState.id;
  const sysID = getSystemID();
  //是否是超级管理员
  const isSuperLevel = userState.DefaultMaxRoleLevel === 0;
  //获取系统角色权限
  let sysregister = true;
  const roleRight = await getSystemRoleRight(sysID, isSuperLevel).catch((ex) => {
    sysregister = false;
    Global.Message?.err('该系统未注册！');
  });
  canLoginClicked = true;
  if (!sysregister) {
    return;
  }
  Global.Logger().debug(roleRight, '登录后的系统权限');
  if (roleRight) {
    const menus = getRightRoutes();
    Global.Logger().debug(menus, '系统路由权限');
    let first: any;
    menus?.forEach((item) => {
      if (!first) first = item;
      router.addRoute(item);
    });
  } else {
    Global.Message?.warn(formState.username + '无系统权限，无法登录！');
    return;
  }
  //用户登录成功
  EmitMsg(SystemsEvent.UserLoginSuccess, undefined);
  //Global.Message?.msg('登录成功');
}

//#region 固定模板
//确定或取消的处理方法
function OkCancelHandler(isOk: boolean) {
  if (isOk) {
    // onSubmit();
  }
}
onMounted(() => {
  //启动时监听
  OnEventHandler(name, OkCancelHandler);
});
onUnmounted(() => {
  OffEventHandler(name, OkCancelHandler);
});
//#endregion
</script>

<style scoped></style>
