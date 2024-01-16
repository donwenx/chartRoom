<template>
  <div class="chat">
    <div class="l-menu">
      <div class="l-menu-head">当前在线人数: {{ numPeople }}</div>
      <a-divider />
      <div class="l-menu-container">
        <div v-if="numPeople !== 0">
          <div class="l-menu-container-item" v-for="item in people" :key="item.id">
            <div class="l-menu-container-avatar">
              <img :src="item.avatar" alt="">
            </div>
            <div class="l-menu-container-name">{{ item.name }}</div>
          </div>
        </div>
        <div v-else>暂无</div>
      </div>
    </div>
    <div class="content">
      <div class="content-head">
        聊天室 —— {{ user.name }}
      </div>
      <div class="chat-room">
        <div class="chat-room-list">
          <div class="chat-room-item" v-for="item in info" :key="item.id">
            <div class="chat-room-item-avatar">
              <img :src="item.avatar" alt="">
            </div>
            <div class="chat-room-item-info">
              <div class="chat-room-item-user">
                <div class="chat-room-item-user-name">{{ item.name }}</div>
                <div class="chat-room-item-user-time">{{ item.time }}</div>
              </div>
              <div class="chat-room-item-message" :class="{ 'chat-room-item-message-active': item.id === user.id }">{{
                item.message }}</div>
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

interface User {
  id: string;
  name: string;
  avatar: string;
}
interface Info {
  id: string;
  name: string;
  avatar: string;
  time: string;
  message: string;
}

// 聊天信息
const info = ref<Info[]>([
  { id: '01', name: '汤姆猫01', avatar: 'avatar/02.png', time: '2024-1-16', message: 'hi!' },
  { id: '02', name: '杰克01', avatar: 'avatar/01.png', time: '2024-1-16', message: 'xxxxxxxxxxxxxx' },
  { id: '02', name: '杰克01', avatar: 'avatar/01.png', time: '2024-1-16', message: 'hi' },
])
// 当前用户
const user = ref({
  id: '01',
  name: '汤姆01'
})
// 在线人数
const people = ref<User[]>([])
people.value = info.value.filter((item, index, arr) => { 
    return arr.findIndex(t => t.name === item.name) === index; 
});

const numPeople = ref<number>(0)
numPeople.value = people.value.length
const input = ref<string>('')

const onClickInput = () => {
  if (input.value !== '') {
    console.log('input:', input.value)
    input.value = ''
  }
}
const ws = new WebSocket('ws://localhost:3000')
ws.addEventListener('open', () => {
  console.log('连接上服务器')
  // send 发送数据
  ws.send('来新订单了！')
})
// 收到的消息
ws.addEventListener('message', ({ data }) => {
  console.log(data)
})
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
}
</style>