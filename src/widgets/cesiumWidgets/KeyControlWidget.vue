<template>
    <div class="key-control-panel">
        <div class="closePanel" @click="doClick">    
            <Icon  v-tooltip.right="'键盘控制'" :icon="rightIcon" width="30" height="30" color="#fff"></Icon>
        </div>
        <div :class="contentStyle">
            <h6>键盘控制说明</h6>
            <p>W/S: 前进/后退</p>
            <p>A/D: 左移/右移</p>
            <p>Q/E: 上升/下降</p>
            <p>+/-: 缩放控制</p> 
        </div>
     </div>
    </template>
    
    <script setup lang="ts">
    import { OffEventHandler, OnEventHandler } from 'src/events';
    import SystemsEvent from 'src/events/modules/SystemsEvent';
    import { computed, onMounted, onUnmounted,ref } from 'vue';
    import { Global } from 'xframelib';
    import type { XViewer } from 'xgis-cesium';
    
    // 键盘控制标志
    const flags = {
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        moveUp: false,
        moveDown: false
    };
    //是否显示
    const isShowRef=ref(false);
    const contentStyle=computed(()=>{
    return isShowRef.value?'contentPanel':'contentPanel-hide';
    });
    const  rightIcon=computed(()=>{
        return isShowRef.value?'ant-design:close-circle-outlined':'ant-design:compress-outlined';
    })
    function doClick()
    {
        isShowRef.value=!isShowRef.value;
    }
    
    function listenKeyDownHandle(e:any)
    {
        const viewer = Global.CesiumViewer as XViewer
        switch (e.key.toLowerCase()) {
            case 'w': flags.moveForward = true; break;
            case 's': flags.moveBackward = true; break;
            case 'a': flags.moveLeft = true; break;
            case 'd': flags.moveRight = true; break;
            case 'q': flags.moveUp = true; break;
            case 'e': flags.moveDown = true; break;
            case '+':
            // console.log('00000',e.key, viewer?.camera);
                viewer?.camera.zoomIn(100);
             break;
            case '-': viewer?.camera.zoomOut(100);
             break;
        }

    }
    
    
    function listenKeyHandle(e) {
        switch (e.key.toLowerCase()) {
            case 'w': flags.moveForward = false; break;
            case 's': flags.moveBackward = false; break;
            case 'a': flags.moveLeft = false; break;
            case 'd': flags.moveRight = false; break;
            case 'q': flags.moveUp = false; break;
            case 'e': flags.moveDown = false; break;
        }
    }
    
    function listenOnTickHandle() {
    
        const viewer = Global.CesiumViewer as XViewer
        if (viewer) {
    
            const camera = viewer.scene.camera;
            const moveRate = 1000.0;
    
            // console.log('3333333333',flags);
            if (flags.moveForward) {
                camera.moveForward(moveRate);
                console.log('111111111');
            }
            if (flags.moveBackward) {
                camera.moveBackward(moveRate);
                console.log('22222222222');
            }
            if (flags.moveLeft) {
                camera.moveLeft(moveRate);
                console.log('3333333333');
            }
            if (flags.moveRight) {
                camera.moveRight(moveRate);
                console.log('4444444444444');
            }
            if (flags.moveUp) {
                camera.moveUp(moveRate);
                console.log('55555555555');
            }
            if (flags.moveDown) {
                camera.moveDown(moveRate);
            }
        }
    }
    
            // 确保所有相机控制都已启用
  function ensureControlsEnabled(viewer:any) {
            const controller = viewer.scene.screenSpaceCameraController;
            
            controller.enableInputs = true;
            controller.enableTranslate = true;
            controller.enableZoom = true;
            controller.enableRotate = true;
            controller.enableTilt = true;
            controller.enableLook = true;
        }
    function initHandler()
    {

            // 键盘事件监听
            document.addEventListener('keydown', listenKeyDownHandle,false);
            document.addEventListener('keyup', listenKeyHandle,false);
            const viewer = Global.CesiumViewer as XViewer
            ensureControlsEnabled(viewer);
            // 每帧更新相机位置
            viewer.clock.onTick.addEventListener(listenOnTickHandle);
            console.log('99999999999999999',viewer?.clock,viewer.scene.mode);
    }
    let eventOn=false;
    onMounted(() => {
        eventOn=false;
        if (Global.CesiumViewer) {
            initHandler();
            console.log('666666666666');
        }
        else
        {
            console.log('111111111111111');
            eventOn=true;
            OnEventHandler(SystemsEvent.CesiumWidgetLoaded, initHandler);
        }
    })
    onUnmounted(() => {
        document.removeEventListener('keydown', listenKeyDownHandle,false);
        document.removeEventListener('keyup', listenKeyHandle,false);
        if(eventOn)
        OffEventHandler(SystemsEvent.CesiumWidgetLoaded, initHandler);
        const viewer = Global.CesiumViewer as XViewer
        if (viewer) {
            const canvas = viewer.scene.canvas;
            canvas.removeAttribute('tabindex');
            viewer.clock.onTick.removeEventListener(listenOnTickHandle);
        }
    })
    </script>
    <style lang="scss" scoped>
        .key-control-panel {
          position: absolute;
          bottom: 128px;
          left: 34px;
          border-radius: 5px;
          color: white;
          z-index: 999;
          .closePanel
          {      
            position: absolute;
            top:0px;
            right: 0px;
          }
          .contentPanel
          {
           background: rgba(42, 42, 42, 0.6);
           padding:10px;
          }
          .contentPanel-hide
          {
            display:none;
          }
        }
    </style>