<template>
<NavBar ref="navbar"></NavBar>
<ToastMessage></ToastMessage>
  <router-view v-slot="{ Component, route }">
  <transition name="fade">
      <div :key="route.name">
      <component :is="Component"></component>
    </div>
  </transition>
</router-view>
<Foot></Foot>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import Foot from '@/components/FooTer.vue';
import ToastMessage from '@/components/ToastMessage.vue';
import emitter from '@/methods/emitter';

export default {
  components: {
    NavBar,
    Foot,
    ToastMessage,
  },
  provide() {
    return {
      emitter,
    };
  },
};
</script>
<style lang="scss">
@import "./assets/sass/all";
body,html{
  ::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: white;
}
//捲軸寬度
  ::-webkit-scrollbar {
  width: 6px;
  background-color: black;
}
//捲軸本體顏色
  ::-webkit-scrollbar-thumb {
  background-color: #497736;
}
}
.fade-enter-active,.fade-leave-active{
  transition: opacity 0.5s
  transform 1s }
.fade-enter-from,.fade-leave-to{
  transition: opacity 1s
  transform 1s }
</style>
