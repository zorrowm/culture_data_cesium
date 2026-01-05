<template>
  <div>
    <div class="valid-portal-header">统一权限验证系统导航页</div>
    <div class="valid-portal-content">
      <div v-if="isOneLogin" class="q-pa-md row items-start q-gutter-md">
        <q-card v-for="item in data" :key="item.title" class="my-card bg-purple text-white">
          <q-card-section>
            <div class="text-h6">{{ item.title }}}</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>

          <q-card-actions>
            <q-btn flat>Action 1</q-btn>
            <q-btn flat>Action 2</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div v-else>
        <img />
        <span class="">
          5秒后跳转，或点击
          <a href="/#/onelogin">统一验证登录界面</a>
          跳转
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Global } from 'xframelib';

const isOneLogin = ref<boolean>(true);
if (Global.UserInfo) {
  const roles: Array<object> = Global.UserInfo?.Roles;
  const result: Array<object> = [];
  roles.forEach((current) => {
    if (current && current.Syslist) result.push(...current.Syslist);
  });
  Global.Logger().info('权限列表', result);
} else {
  isOneLogin.value = false;
  const router = useRouter();
  setTimeout(() => {
    router.push('onelogin');
  }, 5000);
}

interface DataItem {
  title: string;
}
const data: DataItem[] = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];
</script>

<style lang="scss" scoped>
.valid-portal-header {
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 28px;
  line-height: 40px;
  background-color: aqua;
}
.valid-portal-content {
  width: 60%;
  height: calc(100vh - 40px);
  margin: 0 auto;
  background-color: #f00;
}
</style>
