<template>
  <div class="login-top-center">用户登录</div>
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
    <div class="login-center-img"><img src="img/login/password.png" /></div>
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
  <div class="login-bottom-line">
    <span>忘记密码</span>
    <q-separator vertical />
    <span>注册新账号</span>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { IUser } from 'xframelib';
import { getVueURL, Global, login } from 'xframelib';

const formState = reactive({
  username: '',
  password: '',
});
const nameInput = ref<HTMLInputElement>();
const pwdInput = ref<HTMLInputElement>();
const currentRoute = useRoute();
const systemID = currentRoute.query.sysid;

let canLoginClicked = true;
const isPassVerify = false;
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
    return Global.Message.warn('用户名或密码不能为空！');
  }

  //编码后的
  const logindata: IUser = {
    username: formState.username.trim(),
    pwd: formState.password.trim(),
  };
  //TODO:用户登录
  const data = await login(logindata).catch((ex) => {
    Global.Message.warn(`登录失败:${ex.message}!`);
    canLoginClicked = true;
  });
  if (data) {
    //用户Token
    const token: string = data.Userinfo.Doubletoken.AccessToken.TokenContent;
    if (systemID) {
      //单系统登录
      Global.Logger().info('当前登录id', data.System);
      //TODO:跳转
      const sysURL = '';
      const rightUrl = getVueURL(sysURL);
      window.open(rightUrl + '?tk=' + token, '_self');
    } //多系统登录
    else {
      Global.OneUserInfo = data.Userinfo;
      const router = useRouter();
      //跳转到展示登录列表页面
      router.push('onelogin-portal');
    }
  }
};

function onblur() {
  if (nameInput.value) nameInput.value.placeholder = '请输入账号';
  if (pwdInput.value) pwdInput.value.placeholder = '请输入密码';
}
</script>

<style scoped lang="scss"></style>
