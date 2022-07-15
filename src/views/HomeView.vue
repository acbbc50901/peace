<template lang="pug">
header
  img(src="@/assets/img/bgc.jpg", alt="alt")
section#hotpr
  <Hotpr></Hotpr>
section#more
  <More></More>
section#work
  <Work></Work>
section#Interducet
  <Intreduct></Intreduct>
</template>
<script>
import Hotpr from '@/components/index/HotView.vue';
import Intreduct from '@/components/index/InterducetView.vue';
import Work from '@/components/index/WorkView.vue';
import More from '@/components/index/MoreView.vue';

export default {
  name: 'HomeView',
  data() {
    return {
    };
  },
  components: {
    Hotpr,
    Intreduct,
    Work,
    More,
  },
  created() {
  },
};
</script>
<style lang="sass">
@import '@/assets/sass/index.sass'
body,html
  margin: 0
  box-sizing: border-box
  height: 100%
.row
  margin: 0
  padding: 0
  height: 100%
  .col-3,.col-9
    margin: 0
    padding: 0
  .col-3
    height: 100%
.fade-enter-active,.fade-leave-active
  transition: opacity 0.5s
  transform: 0.5s
.fade-enter-from,.fade-leave-to
  opacity: 0
</style>
