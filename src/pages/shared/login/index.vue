<template>
  <div class="dc-container">
    <div class="login-logo">
      <img src="img/logo.png" alt="" />
      <span class="login-title">{{ systemTitle }}</span>
    </div>
    <div class="login">
      <!-- <div class="login-top">用户登录</div> -->
      <div class="login-content">
        <div class="login-center clearfix">
          <div class="login-center-img">账号</div>
          <div class="login-center-input">
            <input
              ref="nameInput"
              type="text"
              :placeholder="'请输入账号'"
              onfocus="this.placeholder=''"
              @blur="onblur()"
              v-model="formState.username"
            />
            <div class="login-center-input-text">账号</div>
          </div>
        </div>
        <div class="login-center clearfix">
          <div class="login-center-img">密码</div>
          <div class="login-center-input">
            <input
              ref="pwdInput"
              type="password"
              :placeholder="'请输入密码'"
              onfocus="this.placeholder=''"
              @blur="onblur()"
              v-model="formState.password"
              @keyup.enter="handleSubmit"
            />
            <div class="login-center-input-text">密码</div>
          </div>
        </div>
        <div class="login-button" @click="handleSubmit">登录</div>
      </div>
    </div>
    <div class="login-copyright">{{ copyRightInfo }}</div>
  </div>
</template>

<script lang="ts">
//调试时用

//登录界面样式
import 'src/css/login.css';

import { getRightRoutes } from 'src/permission';
import doTokenCheck from 'src/permission/tokenCheck';
import { userStore } from 'src/stores';
import { getSystemID } from 'src/utils/sysTool';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { IUser } from 'xframelib';
import {
  checkAddDefaultRoute,
  checkDoRefreshToken,
  getLocalToken,
  GetSignalRClient,
  getSystemRoleRight,
  Global,
  login,
  logout,
  setLocalToken,
} from 'xframelib';

export default defineComponent({
  setup() {
    const pwdLogin = ref(true);
    Global.Loading('end');
    const formState = reactive({
      username: '',
      password: '',
    });
    const nameInput = ref<HTMLInputElement>();
    const pwdInput = ref<HTMLInputElement>();
    const systemTitle = ref<string>('');
    systemTitle.value = Global.Config.UI?.SiteTitle;
    const copyRightInfo = ref<string>('');
    copyRightInfo.value = Global.Config.UI?.CopyRight;
    const router = useRouter();
    const route = useRoute();
    let toPath = decodeURIComponent((route.query?.redirect || '/') as string);
    //判断是否有Token
    const localToken = getLocalToken();
    let tokenValue: string | undefined;
    if (localToken) {
      checkDoRefreshToken(); //刷新KEY
      if (router)
        router.replace(toPath).then((_) => {
          if (route.name == 'login') {
            router.replace('/');
          }
        });
      return;
    }
    let canLoginClicked = true;
    const isPassVerify = true;
    const handleSubmit = async () => {
      if (!isPassVerify) {
        Global.Message?.warn('请先人机验证！');
        return;
      }
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
      //获取系统列表
      // initSystemList();

      //WM:全局变量，为了解决刷新浏览器路由丢失问题
      Global.User = userState.id;
      const sysID = getSystemID();
      //是否是超级管理员
      const isSuperLevel = userState.DefaultMaxRoleLevel === 0;
      let roleRight: any = undefined;
      if (!Global.Config.UI.OnlyUserVerify) {
        //获取系统角色权限
        let sysregister = true;
        roleRight = await getSystemRoleRight(sysID, isSuperLevel).catch((ex) => {
          sysregister = false;
          Global.Message?.err('该系统未注册！');
        });
        canLoginClicked = true;
        if (!sysregister) {
          return;
        }
        Global.Logger().debug(roleRight, '登录后的系统权限');
      } else {
        canLoginClicked = true;
        roleRight = true;
      }

      if (roleRight) {
        const menus = getRightRoutes();
        Global.Logger().debug(menus, '系统路由权限');
        let first: any;
        menus?.forEach((item) => {
          if (!first) first = item;
          router.addRoute(item);
        });
        if (first) checkAddDefaultRoute(router, first);
      } else {
        Global.Message?.warn(formState.username + '无系统权限，无法登录！');
        return;
      }

      const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
      if (router) {
        Global.Logger().debug(toPath, 'toPath');
        if (toPath.startsWith('http://') || toPath.startsWith('https://')) {
          const localToken = getLocalToken();
          window.open(toPath + '#/?tk=' + localToken.token, '_self');
        } else {
          router.replace(toPath).then((_) => {
            if (route.name == 'login') {
              router.replace('/');
            }
          });
        }
      }
      Global.Message?.msg('登录成功');
    }

    onMounted(async () => {
      tokenValue = undefined;
      if (toPath) {
        //检查是否有Token
        tokenValue = route.query?.tk?.toString();
      }
      if (tokenValue) {
        const isAvailble = await doTokenCheck(tokenValue);
        if (isAvailble) {
          const userToken = getLocalToken();
          if (userToken) {
            if (toPath?.indexOf('?') > 0) toPath += '&tk=' + userToken.token;
            else toPath += '?tk=' + userToken.token;
            router.replace(toPath).then((_) => {
              if (route.name == 'login') {
                router.replace('/');
              }
            });
          }
        }
      }
    });
    function onblur() {
      if (nameInput.value) nameInput.value.placeholder = '请输入账号';
      if (pwdInput.value) pwdInput.value.placeholder = '请输入密码';
    }
    async function changeLoginType(pstate: boolean) {
      pwdLogin.value = pstate;
      await initSignalR();
    }

    let authSignalConnection: any = null;
    let connid = '';
    const imageUrl = ref();
    const scanUser = ref();
    //二维码持续时间定时任务
    let timerId: any;
    //一分钟
    const timeout = 1000 * 60 * 2;
    //需要刷新
    let needRefresh = true;
    const authUrl = Global.Config.ServiceURL.LoginAuthURL; // 'http://192.168.1.123:5000'
    async function initSignalR() {
      if (Global.authSignalConnection == null) {
        Global.authSignalConnection = GetSignalRClient(`${authUrl}/chathub`);

        // new signalR.HubConnectionBuilder()
        //   .withUrl(`${authUrl}/chathub`,{
        //     skipNegotiation: true,
        //     transport: signalR.HttpTransportType.WebSockets
        //   })
        //   .withAutomaticReconnect()
        //   .build();

        Global.authSignalConnection.serverTimeoutInMilliseconds = 24e4;
        Global.authSignalConnection.keepAliveIntervalInMilliseconds = 12e4;

        //获取连接id
        Global.authSignalConnection.on('ReturnConnectionId', (value) => {
          connid = value;
          getQRCodeImage();
        });

        //二维码验证
        Global.authSignalConnection.on('QRCodeCheckMessage', (item1, item2) => {
          scanUser.value = item1;
        });

        //授权登录
        Global.authSignalConnection.on('QRCodeSendMessage', async (value) => {
          const info = JSON.parse(value);
          // console.log(info,'23232322332')
          if (info.success && info.userinfo != null) {
            LoginSuccessMessage(true);
            if (timerId) {
              clearTimeout(timerId);
            }

            setLocalToken(info.userinfo.doubletoken);
            await loginSuccess(info.userinfo);
          } else {
            Global.Message.info('授权登录取消');
            scanUser.value = '';
          }
        });

        //pc端退出时监听
        Global.authSignalConnection.on('ExitLoginMessage', async (value, value2) => {
          console.log('登录退出消息');
          Global.authSignalConnection = null;
          logout();
          router.replace('login');
        });
        await Global.authSignalConnection.start();

        authSignalConnection = Global.authSignalConnection;
      }
    }
    //获取图片
    function getQRCodeImage() {
      if (connid) {
        if (!needRefresh) {
          return;
        }
        needRefresh = false;
        resetTimeOut();
        imageUrl.value = `${authUrl}/api/getqrcode?connId=${connid}`;
        return;
      }
      Global.Message.err('获取二维码失败');
    }
    //登录成后返回信息
    async function LoginSuccessMessage(state) {
      try {
        await authSignalConnection.invoke('LoginSuccessMessage', state);
      } catch (err) {
        console.error(err);
      }
    }
    /**
     * 计时器重新计时
     */
    function resetTimeOut() {
      Global.Logger().log('重新开始计时……');
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        needRefresh = true;
        imageUrl.value = '';
      }, timeout);
    }

    return {
      formState,
      systemTitle,
      handleSubmit,
      onblur,
      nameInput,
      pwdInput,
      copyRightInfo,
      pwdLogin,
      changeLoginType,
      imageUrl,
      scanUser,
      getQRCodeImage,
    };
  },
});
</script>
