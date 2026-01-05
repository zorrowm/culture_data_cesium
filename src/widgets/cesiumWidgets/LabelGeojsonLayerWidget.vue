<template>
    <div></div>
</template>
<script setup lang="ts">

import { onMounted, onUnmounted } from 'vue';
import { Global } from 'xframelib';
import { Cesium,LabelGeojsonLayer, XViewer } from 'xgis-cesium';

const poiList = [
    {
        id: 'city_poi',
        url: '/SampleData/cityPOI.json',
        layerName: '市名',
        styleOptions: {
            show: true,
            // minLevel: 3,
            // maxLevel: 7,
            near:300000, 
            far:1000000,
            weight: 3,
            offset: -15,
            fontColor: "#FFD9D9",
            fontFamily: "黑体",
            fontSize: 16,
            labelField: "市",
            filterField: "市",
            outlineColor: "#000000",
            outlineWidth: 2,
            imgUrl: "/img/style/city1.png",
            imgWidth: 20,
            imgHeight: 20,
        },
    },
    {
        id: 'county_poi',
        url: '/SampleData/coutyPOI.json',
        layerName: '县名',
        styleOptions: {
            show: true,
            // minLevel: 7,
            // maxLevel: 10,
            near:40000, 
            far:500000,
            weight: 2,
            offset: -15,
            fontColor: "#EEE",
            fontFamily: "黑体",
            fontSize: 14,
            labelField: "NAME",
            outlineColor: "#000000",
            outlineWidth: 2
        }
    },
]



function loadLabelLayer(data:any) {
    const viewer:XViewer = Global.CesiumViewer; 
    const styleOptions = data.styleOptions;
    const labelLayer = new LabelGeojsonLayer(data.id,data.url,styleOptions);
    labelLayer.attr = {
        type: '注记',//'model3d',
        layerID: data.id,
        layerName: data.layerName,
        kind: 'geojson'
    }
    viewer.addLayer(labelLayer);
}

onMounted(() => {
    //遍历加载行政区划
    poiList.forEach(item => {
        loadLabelLayer(item);
    });

});
onUnmounted(() => {
    const viewer: XViewer = Global.CesiumViewer;
    if (viewer) {
        poiList.forEach(item => {
            viewer.removeLayerByID(item.id);
        });
    }
})
</script>
