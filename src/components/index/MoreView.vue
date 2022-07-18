<template lang="pug">
.more_box
  .derr_box
    .row_box
      .img_box
        p 草莓滿天星
        button(type='button' @click="$router.push('/about')") buy
        img(src="@/assets/img/derr-01.png", alt="")
      .img_box2
        p 花之彩
        button(type='button' @click="$router.push('/')") buy
        img(src="@/assets/img/derr-02.png", alt="")
    .row_box
      .img_box
        p 彩之花
        button(type='button' @click="$router.push('/')") buy
        img(src="@/assets/img/derr-03.png", alt="")
      .img_box2
        p 兩桌三杯
        button(type='button' @click="$router.push('/')") buy
        img(src="@/assets/img/derr-04.png", alt="")
  .big_derr_box
    .big_img_box
      p 甜甜大組合
      button(type='button' @click="$router.push('/')") buy
      img(src="@/assets/img/derr-05.png", alt="")
</template>
<script>
export default {
  data() {
    return {
      img: [
        {
          url: '@/assets/img/derr-01.png',
          to: '/',
        },
        {
          url2: '@/assets/img/derr-02.png',
          to: '/',
        },
        {
          url: '@/assets/img/derr-03.png',
          to: '/',
        },
        {
          url: '@/assets/img/derr-04.png',
          to: '/',
        },
        {
          url: '@/assets/img/derr-05.png',
          to: '/',
        },
      ],
    };
  },
};
</script>

<style lang="sass">
@import '@/assets/index/moreindex.sass'
</style>
