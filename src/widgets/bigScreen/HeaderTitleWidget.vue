<template>
  <div class="mainHeader">
    <q-toolbar class="justify-between items-end" style="height: 100%; line-height: 100%">
      <div class="leftFilterIcon" @click="doLoadFilterWidget">
        <!-- <Icon class="filterIcon" v-tooltip="'机场查询'" icon="icon-park-solid:filter" ></Icon> -->
      </div>
      <!-- <div class="leftMapIcon" v-tooltip="'切换二三维地图'" @click="doChangeMapView">
        <Icon icon="ri:exchange-fill" class="leftMapChangeIcon" />
      </div> -->
      <q-btn class="lt-md" flat dense round icon="menu" aria-label="目录">
        <!-- <q-menu>
          <q-list>
            <q-item>
              <q-item-section>
                <router-link to="/bigscreen" :style="getStyle('/bigscreen/index')">三维飞行场景</router-link>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <router-link to="/bigscreen/map2d" :style="getStyle('/bigscreen/map2d')">二维飞行场景</router-link>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <router-link  :style="getStyle('back')">多路航线</router-link>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <router-link :style="getStyle('/main/document')">碰撞模拟</router-link>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu> -->
      </q-btn>

      <div class="gt-sm row col-3  q-gutter-x-md justify-around no-wrap">

        <!-- <div class="title">
          <router-link to="/bigscreen/index" :style="getStyle('/bigscreen/index')">三维飞行场景</router-link>
        </div>
        <div class="title">
          <router-link to="/bigscreen/map2d" :style="getStyle('/bigscreen/map2d')">二维飞行场景</router-link>
        </div> -->
      </div>

      <div v-media="'titlefont.md titlefont2.lt.md'" class="absolute-center titleInfo">
        {{ siteTitle }}
      </div>
      <q-space />
      <div class="gt-sm row col-3  q-gutter-x-sm justify-around">

        <!-- <div class="title">
          <router-link  :style="getStyle('back')">多路航线</router-link>
        </div>
        <div class="title">
          <router-link :style="getStyle('/main/document')">碰撞模拟</router-link>
        </div> -->
      </div>
      <div class="text-grey-1 q-gutter-x-sm">
        <!-- <span v-if="isBackView('back')">
          <Icon v-if="showCollapseIcon" :icon="leftCollapsed ? 'ant-design:menu-unfold-outlined' : 'ant-design:menu-fold-outlined'" @click="toggleCollapse" />
        </span>
        <FullScreen :target="fullScreenElem" color="#fff" />
        <q-btn flat text-color="white" class="text-h7">
          <span style="text-transform: none">{{ userState.name }}</span>
          <q-menu style="width:120px">
            <q-list dense>
              <q-item>
                <q-item-section>
                  <div>
                    <strong>{{ userState.DefaultMaxRole }}</strong>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item v-if="isShowAdmin">
                <q-item-section @click="goUserAdmin">
                  <div>
                    <Icon icon="ant-design:user-outlined" />
                     <span class="q-ml-sm">用户管理</span>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator  v-if="isShowAdmin"/>
              <q-item clickable class="outlist">
                <q-item-section @click="showUserModal">
                  <div>
                    <Icon icon="ant-design:info-circle-outlined" />
                    <span class="q-ml-sm">修改密码</span>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />

              <q-item clickable class="outlist">
                <q-item-section @click="doLogout">
                  <div>
                    <Icon icon="ant-design:logout-outlined" />
                    <span class="q-ml-sm">退出登录</span>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <q-tooltip>角色:{{ userState.DefaultMaxRole }}</q-tooltip>
        </q-btn> -->
      </div>
    </q-toolbar>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { openURL, useQuasar } from 'quasar';
import { appStore, otherStore, userStore } from 'src/stores/index';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { doLoadModal,getLocalToken,Global, logout } from 'xframelib';

import FullScreen from '@/components/FullScreen.vue';

const router = useRouter();
const appState = appStore();
const otherState = otherStore();
const { leftCollapsed } = storeToRefs(appState);
const $q = useQuasar();
const siteTitle = ref(Global.Config.UI?.SiteTitle);
const userState = userStore();
const fullScreenElem = ref(window.document.documentElement);
const showCollapseIcon = ref(appState.headerSetting.showCollapseIcon);

const route = useRoute();

function toggleCollapse() {
  appState.toggleCollapse();
}

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

//修改密码框
function showUserModal() {
  const rowData = undefined;
  const modalData = {
    modalID: 'changeMyPWD',
    extraData: {
      title: '修改密码',
    },
    width: 500,
    rowData,
  };
  doLoadModal(modalData);
}

const isShowAdmin=computed(()=>{

  return userState.DefaultMaxRoleLevel<2;
})
function goUserAdmin()
{
  const localToken=getLocalToken();
  const url= Global.Config.ServiceURL.LoginAuthURL+'?tk='+localToken.token;
  window.open(url,'_blank');
}

function isBackView(url: string) {
  if (route.path.indexOf(url) >= 0)
    return true;
  return false;
}
function getStyle(url: string) {
  const selectedColor = "color:#0ecfed";
  if (route.path === url)
    return selectedColor;
  if (route.path.indexOf(url) >= 0)
    return selectedColor;
  return 'color:#fff';
}

function doChangeMapView() {
  otherState.toggleMapRoute(router);
}

function doLoadFilterWidget() {

  const layoutManager = Global.LayoutMap.get('bigScreenLayout')
  if (layoutManager) {
    layoutManager.loadWidget('AirportSearchPanelWidget');
  }
}

</script>

<style lang="scss" scoped>
.iconify {
  color: #fff;
}

.mainHeader {
  width: 100%;
  height: var(--header-top-height);
  background-image: url('/img/home/titleBack.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
}

.header {
  width: 30%;
  height: 100%;
  line-height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.titleInfo {
  color: #D6E7FF;
  font-size: 30px;
  font-weight: 600;
}

.titlefont {
  font-size: 26px;
}

.titlefont2 {
  font-size: 18px;
}

.title {
  background-image: url('/img/home/titleContentBack.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  line-height: 100%;
  background-position: center;
  color: white;
  height: 28px;
  line-height: 28px;
  width: 120px;
}

.leftMapIcon {

  // background-color: #f00;
  .leftMapChangeIcon {
    width: 28px;
    height: 28px;
  }

  &:hover {
    background-color: #36f;
  }
}

.leftFilterIcon {
  .filterIcon {
    width: 28px;
    height: 28px;
  }

  &:hover {
    background-color: #36f;
  }

  margin-right:10px;
}
</style>
