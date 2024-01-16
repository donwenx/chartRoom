<template>
  <div class="chat">
    <div class="l-menu">
      <div class="l-menu-head">当前在线人数: 0</div>
      <a-divider />
      <div class="l-menu-container">
        <div class="l-menu-container-item" v-for="item in 22" :key="item">
          <div class="l-menu-container-avatar">
            <img src="../assets/avatar/02.png" alt="">
          </div>
          <div class="l-menu-container-name">汤姆01 </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-head">
        聊天室
      </div>
      <div class="chat-room">
        聊天区
      </div>
      <div class="input-box">
        <a-input v-model:value="input" placeholder="Basic usage">
        </a-input>
        <a-button type="primary">发送</a-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const input = ref<string>('')
</script>
<style scoped lang="less">
.chat {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #e8e8e9;

  .l-menu {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    background: #fff;
    border-radius: 25px;


    .l-menu-head {
      font-size: 24px;
      font-weight: 600;
      display: flex;
      justify-content: center;
    }

    .l-menu-container {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 200px);

      overflow: hidden;
      overflow-y: scroll;

      .l-menu-container-item {
        display: flex;
        align-items: center;

        &+.l-menu-container-item {
          margin-top: 20px;
        }

        .l-menu-container-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .l-menu-container-name {
          margin-left: 20px;
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          white-space: nowrap;
        }
      }

    }
  }

  .content {
    box-sizing: border-box;
    padding: 20px;
    margin-left: 40px;
    min-height: calc(100vh - 40px);
    height: 100%;
    flex: 1;
    background: #fff;
    border-radius: 25px;

    .content-head {}

    .chat-room {}

    .input-box {}
  }
}</style>