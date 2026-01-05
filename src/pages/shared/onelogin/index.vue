<template>
  <div class="container">
    <div class="login-logo">
      <img src="img/logo.png" alt="" />
      <span class="login-title">统一用户登录</span>
    </div>
    <div class="login">
      <div :class="getRightStyle" @click="changeLoginType()"></div>
      <q-tab-panels v-model="activeKey" animated class="shadow-2 rounded-borders">
        <q-tab-panel name="1">
          <AccountLogin />
        </q-tab-panel>
        <q-tab-panel name="2">
          <QRCodeLogin />
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <div class="login-copyright">{{ copyRightInfo }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Global } from 'xframelib';

import AccountLogin from './AccountLogin.vue';
import QRCodeLogin from './QRCodeLogin.vue';

Global.Loading('end');
const systemTitle = ref<string>('');
systemTitle.value = Global.Config.UI?.SiteTitle;
const copyRightInfo = ref<string>('');
copyRightInfo.value = Global.Config.UI?.CopyRight;

const activeKey = ref('2');
const getRightStyle = computed(() => {
  let style = 'right-login-switch right-login-qrcode';
  if (activeKey.value === '2') style = 'right-login-switch right-login-account';
  return style;
});
function changeLoginType() {
  if (activeKey.value === '1') activeKey.value = '2';
  else activeKey.value = '1';
}
</script>

<!-- 样式都是我写的！ -->
<style lang="scss" scoped>
.right-login-switch {
  position: absolute;
  right: 5px;
  top: 5px;
  vertical-align: middle;
  width: 72px;
  height: 72px;
}
.right-login-account {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQBAMAAAAVaP+LAAAAD1BMVEVHcEx6pf97o/97o/97o//AVc6AAAAABHRSTlMAfdc6588X8wAAAP9JREFUaN7t2M0Jg0AYhOFvtIEctoAcLMAWXLb/mnIKOe33o0NgYd5zeBiMCq6ZUkqppcMxMvVX4Ow5Z4x++tA2sr19qKWhy4eOcPP3CnT/F+Hk3yWIoDMF7TGUvE0WhcK/XpCg6DVCgsCCrLEgsCATtCjUWBBYUDgpDYEFRZPyEFhQMKkAgQX5kyoQWJA7qQSBBXmTahBYkDOpCIEFzSdVIbCg6aQyBBY0m1SHwIImk25AYEHPvzWWg3YWtJGg+OM4fy9dN0457hwgpCf10yiTwkMWZxLlLIgFWWNBYEHWWBBoT3tjQWBB1mjnijpa/Wt6CSz6ElBKKaWUUkqt1get9boWWrC+ugAAAABJRU5ErkJggg==)
    50% no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
}
.right-login-qrcode {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQBAMAAAAVaP+LAAAAD1BMVEVHcEx0nfd2nfV2nvV2nfVOOODYAAAABHRSTlMAfj/dTUCnlQAAARpJREFUaN7t2NFtwkAQRdF5aYGpIEoHLoHtvyZ+nAjbawO7N5ZXevczoKNBkMmECOeccwOWpZSIKOtqP3t6bJsoKJKCREGRFCQKiqQgUVAcQNUnngLt4YYuDeX+27/4IL6EREHrkdohUdBqpA5IFLQcqQf6+p7LTuivH0MH3aZpQiCVcmdeWlKQKCiSgkRBcdtAjTtbFBSGToWE3UfZfvq9dXt/Du3c3g2QKKh+e7dAoqC4JOQGrf4/oKHNoUtAoqD6lznROBICVf+gRONIDORG/q7y+XelGRIF/Y7UD4mC5pEASBS0XJXROxIBLVZl9I6EQPOqBBK2GZOChO3qpCD9x8FkaCQoKUjYNZIUJOw+8l4ady8555w7qwd9UZnv+8v33QAAAABJRU5ErkJggg==)
    50% no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
}
:deep(.ant-tabs) {
  width: 100%;
  height: 100%;

  .ant-tabs-content {
    height: 100%;
  }

  .ant-tabs-nav-list {
    width: 100%;
    .ant-tabs-tab {
      display: none;
    }
  }
}
</style>
