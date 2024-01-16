<template>
  <div class="chat">
    <div class="l-menu">
      <div class="l-menu-head">当前在线人数: {{ numPeople }}</div>
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
        <div class="chat-room-list">
          <div class="chat-room-item">
            <div class="chat-room-item-avatar">
              <img src="../assets/avatar/02.png" alt="">
            </div>
            <div class="chat-room-item-info">
              <div class="chat-room-item-user">
                <div class="chat-room-item-user-name">汤姆猫01</div>
                <div class="chat-room-item-user-time">2024-01-16</div>
              </div>
              <div class="chat-room-item-message ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque et
                dicta, consequuntur, ad, corrupti ea dolorem animi non sint ducimus quisquam voluptatum perferendis
                provident hic molestiae sunt sequi voluptate! Eveniet.</div>
            </div>
          </div>
          <div class="chat-room-item">
            <div class="chat-room-item-avatar">
              <img src="../assets/avatar/02.png" alt="">
            </div>
            <div class="chat-room-item-info">
              <div class="chat-room-item-user">
                <div class="chat-room-item-user-name">汤姆猫01</div>
                <div class="chat-room-item-user-time">2024-01-16</div>
              </div>
              <div class="chat-room-item-message chat-room-item-message-active">hi!</div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-box">
        <a-input class="input" v-model:value="input" placeholder="Basic usage">
        </a-input>
        <a-button class="btn" type="primary" @click="onClickInput">发送</a-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const numPeople = ref<number>(0)
const input = ref<string>('')

const onClickInput = () => {
  if(input.value !== '') {
    console.log('input:', input.value)
    input.value = ''
  }
}
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
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 20px 40px 60px;
    margin-left: 40px;
    flex: 1;
    background: #fff;
    border-radius: 25px;

    .content-head {
      font-size: 24px;
      font-weight: 600;
      width: 100%;
      padding-bottom: 8px;
      margin-bottom: 12px;
      border-bottom: 1px solid #f0f0f0;
    }

    .chat-room {
      box-sizing: border-box;
      padding: 20px;
      background: #f6f5f8;
      height: calc(100vh - 230px);
      overflow: hidden;
      overflow-y: scroll;

      .chat-room-list {
        .chat-room-item {
          display: flex;

          &+.chat-room-item {
            margin-top: 16px;
          }

          .chat-room-item-avatar {
            width: 50px;
            height: 50px;
            border-radius: 8px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .chat-room-item-info {
            margin-left: 8px;
            width: 100%;

            .chat-room-item-user {
              display: flex;
              font-size: 12px;

              .chat-room-item-user-name {}

              .chat-room-item-user-time {
                margin-left: 4px;
                color: #999;
              }
            }

            .chat-room-item-message {
              display: inline-block;
              box-sizing: border-box;
              margin-top: 4px;
              min-width: 30px;
              min-height: 40px;
              font-size: 18px;
              padding: 8px;
              background: #fff;
              border-radius: 4px;
            }

            .chat-room-item-message-active {
              // 激活
              background: #12b7f5;
              color: #fff;
            }
          }
        }
      }
    }

    .input-box {
      display: flex;
      align-items: center;
      height: 60px;

      .input {
        height: 100%;
        border-radius: 0 0 0 6px;
      }

      .btn {
        height: 100%;
        width: 150px;
        border-radius: 0 0 6px 0;
      }
    }
  }
}</style>