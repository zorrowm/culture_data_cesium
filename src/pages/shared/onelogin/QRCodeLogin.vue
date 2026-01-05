<template>
  <div>
    <div class="login-top-center">扫码登录</div>
    <div class="login-center">
      <div v-if="codeName" class="box">
        <span>{{ codeName }}正在登录...</span>
      </div>
      <div v-else class="box" @click="getLoginQRCode">
        <div class="scaninfo">请打开微信小程序【XX授权宝】扫码登录</div>
        <div class="imgInfo">
          <div v-if="needRefresh && imgUrl" class="mask">
            <q-btn flat color="primary" label="点我刷新" />
          </div>
          <img :src="imgUrl" alt="用户登录二维码" style="width: 100%" />
        </div>
      </div>
      <div class="login-bottom-line">
        <span>密码登录</span>
        <q-separator dark vertical />
        <span>注册新账号</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="QRCodeLogin">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { GetSignalRClient, getVueURL, Global, requestGet } from 'xframelib';

let timerId: any;
const timeout = 1000 * 60;

const imgUrl = ref<string>('');
//需要更新
const needRefresh = ref<boolean>(false);
const codeName = ref<string>('');

let signalRConnection: any;
/**
 * 获取刷新二维码
 */
function getLoginQRCode() {
  if (!signalRConnection && !signalRConnection.connectionId)
    //尚未建立连接
    return;
  const currentRoute = useRoute();
  const systemID = currentRoute.query.sysid;
  const connId = signalRConnection.connectionId;
  //TODO:修改临时的地址
  const baseUrl = 'https://gis-auth.digsur.com';
  const apiUrl = '/api/getqrcode';
  //请求二维码
  requestGet(apiUrl, baseUrl, { connId, sys: systemID ?? '' }, undefined, 'blob').then((res) => {
    Global.Logger().log('axios调用结果', res);
    needRefresh.value = false;
    resetTimeOut();
    const url = URL.createObjectURL(res.data);
    imgUrl.value = url;
  });
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
    needRefresh.value = true;
  }, timeout);
}
function init() {
  const signalRUrl = 'http://192.168.1.123:5000/chathub'; //Global.Config.ServiceURL.LoginAuthURL + Global.Config.APIPath?.SignalR;
  const connection = GetSignalRClient(signalRUrl);
  if (connection) {
    signalRConnection = connection;

    //建立连接
    connection
      .start()
      .then(() => {
        if (connection.state === 'Connected') {
          signalRConnection = connection;

          //获取二维码
          getLoginQRCode();
        }
      })
      .catch((err) => {
        Global.Logger().error('连接SignalR服务出错了！', err);
      });
    //业务监听
    connection.on('QRCodeCheckMessage', function (uname, ischeck) {
      if (ischeck && uname) {
        codeName.value = uname;
      }
      Global.Logger().log('QRCodeCheckMessage', uname, ischeck);
    });
    connection.on('QRCodeSendMessage', function (info) {
      const sendData: object = JSON.parse(info);
      Global.Logger().log('QRCodeSendMessage', sendData);
      if (sendData?.Success) {
        //用户Token
        const token: string = sendData?.Userinfo.Doubletoken.AccessToken.TokenContent;
        if (sendData.System) {
          Global.Logger().info('当前登录id', sendData.System);
          //TODO:跳转
          const sysURL = '';
          const rightUrl = getVueURL(sysURL);
          window.open(rightUrl + '?tk=' + token, '_self');
        } else {
          // 没有指定就列出有权限的所有系统
          Global.OneUserInfo = sendData.Userinfo;
          // let roles: Array<object> = sendData.Userinfo?.Roles
          // let result: Array<object> = []
          // roles.forEach(current => {
          //     result.push(...(current?.Syslist))
          // })
          // Global.Logger().info("权限列表", result)
          // loginInfoState.info = result;
          const router = useRouter();
          //跳转到展示登录列表页面
          router.push('onelogin-portal');
        }
      } else {
        codeName.value = '';
        getLoginQRCode();
        Global.Message.warn('登录失败！请重新扫码登录');
      }
    });
  }
}
init();

onMounted(() => {
  resetTimeOut(); //记时
});
onUnmounted(() => {
  clearTimeout(timerId);
  if (signalRConnection) {
    signalRConnection.off('QRCodeCheckMessage');
    signalRConnection.off('QRCodeSendMessage');
    signalRConnection.stop();
  }
});
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.scaninfo {
  height: 20px;
  line-height: 20px;
  margin-top: -30px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666666;
}

.imgInfo {
  position: relative;

  width: 250px;
  height: 200px;
  border: 1px solid #666;

  &:hover {
    .mask {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .mask {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-size: 24px;
    background-color: rgba($color: #fff, $alpha: 0.7);
  }
}
</style>
