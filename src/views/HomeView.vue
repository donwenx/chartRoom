<template>
  <div class="home">
    <div class="container">
      <div class="head">聊天室</div>
      <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名！' }]">
          <a-input v-model:value="formState.username" placeholder="请输入用户名">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码！' }]">
          <a-input-password v-model:value="formState.password" placeholder="请输入密码">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="#">忘记密码</a>
        </a-form-item>

        <a-form-item>
          <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
            登录
          </a-button>
          <!-- Or -->
          <!-- <a href="">register now!</a> -->
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter()

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});
const onFinish = (values: any) => {
  console.log('Success:', values);

  // 跳转到聊天室
  router.push('/chat')
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
</script>
<style scoped lang="less">
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #e8e8e9;
  min-height: 100vh;
  height: 100%;

  .container {
    width: 500px;
    padding: 50px 100px;
    background: #fff;
    border-radius: 25px;

    .head {
      display: flex;
      justify-content: center;
      margin-bottom: 50px;
      font-size: 42px;
      font-weight: 600;
    }

    .login-form {
      width: 100%;

      .login-form-forgot {
        float: right;
      }

      .login-form-button {
        width: 100%;
      }
    }
  }
}
</style>