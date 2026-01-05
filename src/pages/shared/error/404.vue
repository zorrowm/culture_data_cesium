<template>
  <div class="page-container">
    <div
      style="
        background-image: url(img/404.gif);
        background-size: contain;
        width: 400px;
        height: 176px;
      "
    ></div>
    <br />
    <div>
      <h4>当前页面不存在...</h4>
      <q-space></q-space>
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="返回首页？"
        no-caps
      />
      <q-btn
        v-if="isLogined"
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        label="退出系统？"
        no-caps
        @click="doLogout"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';
import { clearRight, Global, logout } from 'xframelib';
export default defineComponent({
  name: '404View',
  setup() {
    Global.Loading('end');
    const $q = useQuasar();
    const isLogined = ref(Global.User);
    // 退出登录
    const doLogout = () => {
      $q.dialog({
        //dark: true,
        title: '退出登录',
        message: '您确定要退出登录吗？',
        cancel: true,
        // persistent: true
      })
        .onOk(() => {
          logout();
          clearRight();
          Global.Message.msg('成功退出登录');
          window.open(window.location.pathname, '_self');
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    };
    return {
      doLogout,
      isLogined,
    };
  },
});
</script>

<style scoped>
.page-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
}
</style>
