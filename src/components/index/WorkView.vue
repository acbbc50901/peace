<template lang="pug">
h1 熱銷商品
.all_box_card
  .card_box_out(v-for="item in porducts" :key="item.id")
    router-link(to="/")
      .card_box
        .border_img
          img(:src="item.imageUrl", alt="")
        p {{item.title}}
        button(type='button' @click='add2Cart(item.id)' ) 加入購物車
.button_box
  button(type='button' @click="randomProduct()") 換一批
</template>
<script>
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      porducts: {},
      tempdata: {
        loadingItem: '',
      },
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api)
        .then((res) => {
          const newdata = res.data.products;
          const randomdata = newdata.sort(() => Math.random() - 0.5).slice(0, 3);
          this.porducts = randomdata;
        });
    },
    randomProduct() {
      this.getProduct();
    },
    add2Cart(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.$http.post(api, { data: cart })
        .then((res) => {
          this.tempdata.loadingItem = '';
          this.$httpMessage(res, '更新狀態');
        });
      emitter.emit('sendData', cart);
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style lang="sass">
@import '@/assets/index/work.sass'
</style>
