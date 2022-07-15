<template lang="pug">
.footer_box
  .footer_img
    img(src="@/assets/img/logo2.png", alt="")
  .footer_list
    li
      router-link(to="/about") 關於我們
      router-link(to="/shop") 所有甜點
      router-link(to="/product") 熱銷商品
      router-link(to="/call") 聯絡資訊
  .footer_text
    h5 ©2022 Snichi ALL rights reserved
</template>

<style lang="sass">
@import "../assets/sass/footer.sass"
</style>
