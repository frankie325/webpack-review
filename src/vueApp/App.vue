<template>
  <div id="app">
    <button @click="increment">{{ count }}</button>
    <span class="iconfont icon-kafei"></span>
    <div class="c-red">red</div>
    <img src="../assets/image/paper.jpg" alt="" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const count = ref(0);

// 用来修改状态、触发更新的函数
function increment() {
  count.value++;
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`);
});
</script>

<style lang="less">
html {
  margin: 0;
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
