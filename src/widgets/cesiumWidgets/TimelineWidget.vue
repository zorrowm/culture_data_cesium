<template>
<div class="timelinePanel">
 <q-timeline :side="side" color="primary">
      <!-- <q-timeline-entry heading>Timeline heading</q-timeline-entry> -->

      <q-timeline-entry
        title="九眼楼长城-冬季"
        subtitle="2020年12月3日"
        side="right"
        :icon="iconOne"
        
        @click="doSelect(1)"
      >
      </q-timeline-entry>

      <q-timeline-entry
        title="九眼楼长城-夏季"
        subtitle="2022年7月8日"
        side="right"
        :icon="iconTwo"
        @click="doSelect(2)"
      >
      </q-timeline-entry>
    </q-timeline>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {Global} from 'xframelib';

const side=ref('left');
const iconOne=ref('check');
const iconTwo=ref('');

function doSelect(id:number)
{
    let info='冬季';
    if(id===1)
    {
        info='冬季';
        iconOne.value='check';
        iconTwo.value='';
        Global.JiuBuilding1.show=true;
        Global.JiuBuilding2.show=false;
        Global.JiuBuilding1.locate(Global.CesiumViewer)
    }
    else
    {
        info='夏季';
        iconOne.value='';
        iconTwo.value='check';
        Global.JiuBuilding1.show=false;
        Global.JiuBuilding2.show=true;
        Global.JiuBuilding2.locate(Global.CesiumViewer)
    }
    console.log('选中了：',info);
}
</script>

<style lang="scss" scoped>
.timelinePanel
{
    position:absolute;
    right:30px;
    top:30%;
    width:200px;
    // height:200px;

}
</style>