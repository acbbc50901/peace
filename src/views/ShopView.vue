<template lang="pug">
.shop_box_img_box(ref='scorrl')
  a(href="")
    img(src="@/assets/img/hear.png", alt="" ref='imgwhidt')
  a(href="")
    img(src="@/assets/img/bgc.jpg", alt="")
  a(href="")
    img(src="@/assets/img/hear.png", alt="")
  a(href="")
    img(src="@/assets/img/hear.png", alt="")
button(@click='click_img') 666
</template>
<script>
import { gsap } from 'gsap/all';

export default {
  data() {
    return {
    };
  },
  methods: {
    click_img() {
      const scorrl2 = this.$refs.scorrl;
      const imgw = this.$refs.imgwhidt;
      gsap.to(scorrl2, {
        scrollLeft: '100%',
      });
      console.log(scorrl2);
      console.dir(imgw);
    },
  },
};
</script>
<style lang="sass">
@import '@/assets/shop/shop.sass'
</style>
