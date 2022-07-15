<template lang="pug">
#exampleModal.modal.fade(tabindex='-1' aria-labelledby='exampleModalLabel'
aria-hidden='true' ref='modal')
  .modal-dialog.modal-xl(role='document')
    .modal-content
      .modal-header
        h5.modal-title 購物車
        button.btn-close(type='button' data-bs-dismiss='modal'
        @click="$emit('update-product', tempProduct)")
      .modal-body
        table
          thead
            tr
              th.samll 商品圖片
              th 商品名稱
              th.samll 數量
              th.samll
          tbody
            tr(v-for='item in tempProduct.carts')
              td
                img(:src="item.product.imageUrl", alt="")
              td {{item.product.title}}
              td
                input(type="number" min=1 :value="item.product.num")
              td
                button(type='button' @click='dalPordect(item)') 刪除
      .modal-footer
        .count_box
          input(type="text" placeholder="輸入折扣碼" :disabled="is_Has ? true:false")
          p(v-if="!is_Has") 未使用
          p(v-else) 已使用
        .total_box
          p 總金額 :
            span {{tempProduct.total}} NT
          button(type='button') 送出訂單
</template>
<script>
import modelMixin from '@/mixin/modalMixuns';

export default {
  data() {
    return {
      modal: {},
      tempProduct: {},
      tempdata: {
        loadingItem: '',
      },
      is_Has: false,
    };
  },
  methods: {
    getPordeut() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api)
        .then((res) => {
          this.tempProduct = res.data.data;
        });
    },
    dalPordect(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.tempdata.loadingItem = item.id;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      this.$http.delete(api, { data: cart }).then((res) => {
        console.log(res);
        this.tempdata.loadingItem = '';
        this.$httpMessage(res, '更新狀態');
        this.getPordeut();
      });
    },
  },
  created() {
    this.getPordeut();
  },
  mixins: [modelMixin],
};
</script>
<style lang="sass">
@import "../assets/sass/OrderModal.sass"
</style>
