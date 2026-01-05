<template>
  <div class="q-gutter-sm row items-center no-wrap">
    <q-btn
      dense
      flat
      icon="fa-brands fa-github"
      href="https://github.com/york11122/quasar-admin-vue3-typescript"
      target="_blank"
    >
      <q-tooltip>github</q-tooltip>
    </q-btn>

    <q-btn
      v-if="$q.screen.gt.sm"
      dense
      flat
      :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
      @click="$q.fullscreen.toggle()"
    >
      <q-tooltip>全屏</q-tooltip>
    </q-btn>

    <dark-mode />
    <q-btn dense flat icon="refresh" @click="appState.reloadPage(200)" v-if="$q.screen.gt.sm">
      <q-tooltip>刷新页面</q-tooltip>
    </q-btn>

    <q-btn round dense flat icon="notifications">
      <q-badge color="red" text-color="" floating>2</q-badge>
      <q-tooltip>通知</q-tooltip>
    </q-btn>
    <q-btn round flat>
      <q-avatar color="primary" text-color="white">U</q-avatar>
      <q-menu>
        <q-list dense>
          <q-item>
            <q-item-section>
              <strong>{{ userState.name }}</strong>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable>
            <q-item-section>
              {{ userState.roles ? userState.roles[0].name : '' }}
            </q-item-section>
          </q-item>
          <q-separator />

          <q-item clickable>
            <q-item-section @click="doLogout">
              <Icon icon="ant-design:logout-outlined" />
              退出
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>

      <q-tooltip>用户</q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import DarkMode from 'src/components/Quasar/Toolbar/DarkMode.vue';
import { appStore } from 'src/stores';
import { userStore } from 'src/stores';
import { Global } from 'xframelib';
defineOptions({ name: 'ToolbarItem' });

const appState = appStore();
const userState = userStore();
const $q = useQuasar();

const doLogout = () => {
  $q.dialog({
    //dark: true,
    title: '退出',
    message: '您确定要退出登录吗？',
    cancel: true,
    // persistent: true
  })
    .onOk(() => {
      //退出登录
      userState.clear();
      Global.Message.msg('成功退出登录');
      // 移除标签页
      // localStorage.removeItem(TABS_ROUTES)
      window.open(window.location.pathname, '_self');
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    });
};
</script>
