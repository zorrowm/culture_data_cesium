<template>
  <div class="min-width:200px">
    <q-form>
      <q-input
        v-model="formState.oldPassword"
        type="password"
        label="旧密码"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '请输入密码']"
      />
      <q-input
        v-model="formState.newPassword"
        label="新密码"
        type="password"
        hint="请输入新密码"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0 && val != formState.oldPassword) || '请输入新密码',
        ]"
      />
      <q-input
        v-model="formState.newPassword"
        label="确认密码"
        type="password"
        hint="再次输入新密码"
        :rules="[
          (val) => (val && val.length > 0 && val != formState.newPassword) || '请输入新密码',
        ]"
      />
    </q-form>
  </div>
</template>

<script lang="ts">
import { OffEventHandler, OnEventHandler } from 'src/events';
import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue';
import { object, oneOfType } from 'vue-types';
import type { IExtraProperty } from 'xframelib';
import { changeMyPWD, Global } from 'xframelib';

interface FormState {
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
  showLevel: boolean;
}
const name = 'changeMyPWD';
//验证函数
let validateForm: any;

const componentContent = {
  validateForm: validateForm,
  name,
  props: {
    data: oneOfType([Boolean, Object]).def(false),
    extra: object<IExtraProperty>().isRequired,
  },

  setup(props, { emit }) {
    //#region 对话框模板相关
    //确定或取消的处理方法
    function OkCancelHandler(isOk: boolean) {
      if (isOk) {
        onSubmit();
      } else {
        // formRef.value.resetFields();
        formState.oldPassword = '';
        formState.newPassword = '';
        formState.newPassword2 = '';
      }
    }
    onMounted(() => {
      //启动时监听
      OnEventHandler(name, OkCancelHandler);
    });
    onUnmounted(() => {
      OffEventHandler(name, OkCancelHandler);
    });
    //#endregion

    const formState: FormState = reactive<FormState>({
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
      showLevel: false,
    });

    // let validateOldPass = async (rule: any, value: string) => {
    //   if (value === '') {
    //     return Promise.reject('输入新密码');
    //   } else if (value === formState.oldPassword) {
    //     return Promise.reject('新旧密码不能一样!');
    //   } else {
    //     return Promise.resolve();
    //   }
    // };
    // let validatePass2 = async (rule: Rule, value: string) => {
    //   if (value === '') {
    //     return Promise.reject('请再次输入密码');
    //   } else if (value !== formState.newPassword) {
    //     return Promise.reject('两次输入的不一致!');
    //   } else {
    //     return Promise.resolve();
    //   }
    // };

    // const rules = {
    //   newPassword: [{ required: true, validator: validateOldPass, trigger: 'change' }],
    //   newPassword2: [{ required: true, validator: validatePass2, trigger: 'change' }]
    // };
    /**
     * 校验表格
     */
    // componentContent.validateForm = () => {
    //   return formRef.value.validate();
    // };
    function onSubmit() {
      if (formState.newPassword != formState.newPassword2) {
        Global.Message.warn('两次新密码不一致');
        return;
      }
      const oldpwd = formState.oldPassword;
      const newpwd = formState.newPassword;
      changeMyPWD({
        oldpwd,
        newpwd,
      })
        .then((res) => {
          if (res?.data) {
            Global.Message.info('修改密码成功！');
          } else {
            Global.Message.warn('修改密码失败！');
          }
        })
        .catch((ex) => {
          Global.Message.warn('修改密码失败:' + ex.message);
        });
    }
    return {
      // rules,
      formState,
      onSubmit,
    };
  },
};
export default defineComponent(componentContent);
</script>
