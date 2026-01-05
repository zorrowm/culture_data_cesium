<template>
    <div class="map3DView">
    </div>
</template>

<script lang="ts" setup>


import { OffEventHandler,OnEventHandler } from 'src/events';
import { otherStore } from 'src/stores/index';
import { nextTick,onMounted, onUnmounted } from 'vue';
import { Global, LayoutManager, SysEvents } from 'xframelib';

const otherState = otherStore();

let layoutManager: LayoutManager | undefined;
function layoutLoaded(data)
{
    if(data&&data.layoutID==='bigScreenLayout')
    {
        init();
    }
}

function init()
{
    layoutManager = Global.LayoutMap.get('bigScreenLayout');
    if (layoutManager) {
        layoutManager.loadWidget('cesiumWidget');
        layoutManager.loadWidget('menuBarWidget');
    }
    else {
     OnEventHandler(SysEvents.LayoutContainerLoaded,layoutLoaded);
    }
}
onMounted(() => {
    otherState.currentRoute='/bigscreen/index';
    init();
});
onUnmounted(() => {

    OffEventHandler(SysEvents.LayoutContainerLoaded,layoutLoaded);
    if (layoutManager) {
        layoutManager.unloadWidget('cesiumWidget');
        layoutManager.unloadWidget('menuBarWidget');
        //卸载
        layoutManager.unloadWidget('SyncCesiumWidget');
        //二维
        layoutManager.unloadWidget('XMapContainerWidget');
        layoutManager.unloadWidget('MapproxyWidget');
    }
});
</script>