<template lang="pug">
.intder_box
  .big_box
    .text_box_out
      .text_box
        h1.cscs 茶點
        p 給你最美味的甜點
    .work_box
      .smaller_box(ref="img")
        img(src="https://1.bp.blogspot.com/-n-Y9uKtQK8Y/X2VqTzmTH-I/AAAAAAABbEg/HN7kq9rZwK4Ye86jom66IcU74iSl-IVGwCNcBGAsYHQ/s180-c/sweets_shiratama.png", alt="")
        img(src="https://1.bp.blogspot.com/-aMmz15ik1NU/XzXk13uqrPI/AAAAAAABamc/DcZSNXqRPiYn-omF2aXuBxWufLvnoJ-TwCNcBGAsYHQ/s180-c/fruit_sweets_kinkan_kanroni.png", alt="")
        img(src="https://1.bp.blogspot.com/-lo3ZURN60RE/Xhwqu1HEAqI/AAAAAAABXDk/RuSIKIMAJyU8EL7dMQ7pnwzlwPLKTLK0gCNcBGAsYHQ/s180-c/sweets_cake_chocomint.png", alt="")
        img(src="https://1.bp.blogspot.com/-KROAtyfIq2E/Xbo7pgr_i1I/AAAAAAABV5I/wZTsMz7NC78Ahx2Au2lZT0rvZmqIKEs8QCNcBGAsYHQ/s180-c/sweets_buttersand.png", alt="")
        img(src="https://1.bp.blogspot.com/-ckRQQXz6PjE/XQjuezvDalI/AAAAAAABTSk/NGgomBsGNMwk5leKd59gD7899JjDyTBiACLcBGAs/s180-c/sweets_chocolate_mousse.png", alt="")
        img(src="https://1.bp.blogspot.com/-n-Y9uKtQK8Y/X2VqTzmTH-I/AAAAAAABbEg/HN7kq9rZwK4Ye86jom66IcU74iSl-IVGwCNcBGAsYHQ/s180-c/sweets_shiratama.png", alt="")
        img(src="https://1.bp.blogspot.com/-aMmz15ik1NU/XzXk13uqrPI/AAAAAAABamc/DcZSNXqRPiYn-omF2aXuBxWufLvnoJ-TwCNcBGAsYHQ/s180-c/fruit_sweets_kinkan_kanroni.png", alt="")
        img(src="https://1.bp.blogspot.com/-lo3ZURN60RE/Xhwqu1HEAqI/AAAAAAABXDk/RuSIKIMAJyU8EL7dMQ7pnwzlwPLKTLK0gCNcBGAsYHQ/s180-c/sweets_cake_chocomint.png", alt="")
        img(src="https://1.bp.blogspot.com/-KROAtyfIq2E/Xbo7pgr_i1I/AAAAAAABV5I/wZTsMz7NC78Ahx2Au2lZT0rvZmqIKEs8QCNcBGAsYHQ/s180-c/sweets_buttersand.png", alt="")
        img(src="https://1.bp.blogspot.com/-ckRQQXz6PjE/XQjuezvDalI/AAAAAAABTSk/NGgomBsGNMwk5leKd59gD7899JjDyTBiACLcBGAs/s180-c/sweets_chocolate_mousse.png", alt="")
  .img_box
    .border_box.ingg
      img(src="https://1.bp.blogspot.com/-_zO7P5V2zaI/X7zMIVkiQKI/AAAAAAABcYo/bZ2fpZQ_3i0okGLGRt_u6axbDsVtRIfaACNcBGAsYHQ/s450/job_chocolatiere_woman.png", alt="")
</template>
<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export default {
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    // const lt = gsap.timeline;
    const img2 = this.$refs.img;
    const lemax = img2.scrollWidth - img2.clientWidth;
    gsap.to(img2, {
      scrollLeft: lemax,
      duration: 10,
      yoyo: true,
      repeatDelay: 0.5,
      repeat: -1,
    });
  },
};
</script>
<style lang="sass">
@import '@/assets/index/intreduct.sass'
</style>
