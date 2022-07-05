<template>
  <div class="wrapper">
    <div class="c-area local">
      <h2>本地（已启动）</h2>
      <div>
        本地地址：
        <input type="text" readonly />
        <button>启动</button>
        <button>停止</button>
      </div>
      <div class="c-files"></div>
    </div>
    <div class="c-area remote">
      <h2>远程（已连接）</h2>
      <div class="remote-target">
        目标地址：
        <input
          type="text"
          @focus="isShowHistory = true"
          @blur="isShowHistory = false"
        />
        <button>连接</button>
        <button>断开</button>
        <div v-if="isShowHistory" class="history">
          <p>http://127.0.0.1:11223</p>
        </div>
      </div>
      <div class="c-files">
        <webview allowpopups nodeintegration src="http://localhost:5000"></webview>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isShowHistory = ref(false)
</script>

<style lang="scss">
.wrapper {
  height: 100%;
  padding: 20px;
  display: flex;
  input,
  button {
    height: 28px;
  }
  input {
    width: 200px;
    margin-right: 8px;
  }
  button {
    width: 68px;
  }
  .c-area {
    height: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    h2 {
      text-align: center;
      margin-top: 0;
    }
    .c-files {
      border: 1px solid #ccc;
      height: 100%;
      margin-top: 15px;
    }
  }
  .local {
    width: 49%;
    margin-right: 2%;
  }
  .remote {
    width: 49%;
    .remote-target {
      position: relative;
      .history {
        position: absolute;
        top: 30px;
        left: 80px;
        width: 200px;
        padding: 10px;
        background: #fff;
        border: 1px solid #eee;
        box-shadow: 0px 2px 10px 0px #ccc;
        p {
          margin: 0;
          padding: 5px 10px;
          cursor: pointer;
          &:hover {
            background: #eee;
          }
        }
      }
    }
    webview {
      display: inline-flex;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
