<template lang="pug">
header(ref='scrll')
  .header_box
    img(src="@/assets/img/hear.png", alt="")
    .border_box
      h1 聯絡我們
section#call
  .call_box
    .map_box
      iframe(:src="map_img")
    .call_text_box
      .text_box
        h1 門市資訊
        p 地址: {{ call.map }}
        p 營業時間: {{ call.time }}
        p 手機電話: {{ call.phone }}
        p 市內電話: {{ call.call }}

</template>
<script>
// import { gsap, ScrollTrigger } from 'gsap/all';

export default {
  data() {
    return {
      map_img: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15930.09343071691!2d-62.22463526524201!3d-3.465283741120543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91e8605342744385%3A0x3d3c6dc1394a7fc7!2z5Lqe6aas6YGc6Zuo5p6X!5e0!3m2!1szh-TW!2stw!4v1657852420535!5m2!1szh-TW!2stw',
      call: {
        phone: '09-8888-9999',
        call: '02-2288-9900',
        map: 'Codajás, 科達雅斯 - 亞馬遜州69450-000巴西',
        time: '08:00 - 20:00',
      },
    };
  },
  methods: {
    scorrllll() {
    },
  },
  mounted() {
  },
};
</script>
<style lang="sass">
@import '@/assets/about/heard.sass'
@import '@/assets/call/call.sass'
</style>
