<template>
  <div>
    <!-- 2个三维球 同步 -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Global } from 'xframelib';
import { MouseEventType,SceneEventType,XViewer } from 'xgis-cesium';

let viewer: XViewer;
let syncViewer: XViewer;

// 关闭之前所有事件
function closeO() {
    try {
        if (syncViewer ) {
            syncViewer.off(MouseEventType.WHEEL, liandong2D3D);
            syncViewer.off(MouseEventType.LEFT_UP, liandong2D3D);
            syncViewer.off(SceneEventType.CAMERA_CHANGED, liandong2D3D);
        }
    } catch (error) { 
                console.log('close0异常',error)
    }
    try {
        if (viewer) {
            viewer.off(MouseEventType.WHEEL, liandong3D2D);
            viewer.off(MouseEventType.LEFT_UP, liandong3D2D);
            viewer.off(SceneEventType.CAMERA_CHANGED, liandong3D2D);
        }
    } catch (error) {
        console.log('close0异常',error)
     }
}

// 进入3d，监听3d事件
function open3d() {
    closeO()
    if (viewer) {
        viewer.on(MouseEventType.WHEEL, liandong3D2D);
        viewer.on(MouseEventType.LEFT_UP, liandong3D2D);
        viewer.on(SceneEventType.CAMERA_CHANGED, liandong3D2D);
    }
}

// 进入2d，监听2d事件
function open2d() {
    closeO()
    if (syncViewer) {
        syncViewer.on(MouseEventType.WHEEL, liandong2D3D);
        syncViewer.on(MouseEventType.LEFT_UP, liandong2D3D);
        syncViewer.on(SceneEventType.CAMERA_CHANGED, liandong2D3D);
        
    }
}
// 3d联动2d
function liandong3D2D() {
    if (viewer&&syncViewer) {
        const rectangle =viewer.camera.position; //viewer.camera.computeViewRectangle();
        const heading=  viewer.camera.heading;
        const pitch=viewer.camera.pitch;
        const roll=viewer.camera.roll;
        if(rectangle)
        {
            syncViewer.camera.setView({
                destination: rectangle,
                orientation: {
                    heading,
                    pitch,
                    roll
                }
            })
        }
    }
}
// 2d联动3d
function liandong2D3D() {
    if (viewer&&syncViewer ) {
       
        const rectangle = syncViewer.camera.position; //syncViewer.camera.computeViewRectangle();
        const heading=  syncViewer.camera.heading;
        const pitch=syncViewer.camera.pitch;
        const roll=syncViewer.camera.roll;
        if(rectangle)
        {
            viewer.camera.setView({
                destination: rectangle,
                orientation: {
                    heading,
                    pitch,
                    roll
                }
            })
        }
    }
}


onMounted(() => {
    viewer = Global.CesiumViewer as XViewer;
    if (viewer) {
        //移入三维
        viewer.on(MouseEventType.MOUSE_MOVE, open3d);
    }
    syncViewer = Global.SyncCesiumViewer as XViewer;
    if (syncViewer) {
        //移入二维
        syncViewer.on(MouseEventType.MOUSE_MOVE, open2d);
        // liandong2D3D();
    }
});

onUnmounted(() => {

    if (viewer) {
        viewer.off(MouseEventType.MOUSE_MOVE, open3d)
    }
    if (syncViewer ) {
        //移入三维
        syncViewer.off(MouseEventType.MOUSE_MOVE, open2d)
    }
});
</script>