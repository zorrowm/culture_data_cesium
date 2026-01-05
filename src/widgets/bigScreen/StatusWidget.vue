<template>
  <div class="footerStatus">
    <a :href="websiteURL" target="_blank">
      <span class="copyright">{{ copyinfo }}</span>
    </a>
    <div class="fl msginfo">{{ statusInfo }}</div>
  </div>
</template>

<script lang="ts" setup>
import { OnStatusHandler } from 'src/events';
import { getCurrentInstance, onMounted, ref } from 'vue';
import { Global } from 'xframelib';

defineOptions({
  name: 'Copyright',
});

const copyinfo = ref(Global.Config.UI?.CopyRight);
const statusInfo = ref('');
const websiteURL = ref(Global.Config.UI?.WebSite);
onMounted(() => {
  //监听：全局提示信息
  OnStatusHandler((data) => {
    statusInfo.value = data;
  });
  const instance = getCurrentInstance();
  console.log('5555555555', instance?.proxy?.$options);
  const wid = instance?.proxy?.$options.id;
  const layoutid = instance?.proxy?.$options.layoutID;
  setTimeout(() => {
    console.log('开始卸载自身');
    if (wid) Global.LayoutMap.get(layoutid)?.unloadWidget(wid);
  }, 2000);
});
</script>

<style scoped>
.footerStatus {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 20px;
  /* margin: -20px auto 0; */
  text-align: center;
  line-height: 20px;
  /* background-color: red; */
  overflow: hidden;
  pointer-events: none !important;
}
.msginfo {
  margin: 0px 0 0 10px;
  width: 90%;
  color: #333;
  display: inline-block;
  font-size: 12px;
  line-height: 20px;
  text-align: left;
}
.copyright {
  color: #333;
  font-size: 12px;
  line-height: 20px;
  font-weight: 600;
}
</style>
