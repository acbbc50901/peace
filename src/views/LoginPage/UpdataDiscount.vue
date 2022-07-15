<template lang="pug">
.sech_box
  .sech_input_box
    input(type="search" placeholder='搜尋' v-model="search")
  .sech_nav_box
    button(type='button' @click='openModel(true)') 新增折價卷
.allproduct_box
  table
    thead
      tr
        th 名稱
        th 到期日
        th 折價
        th 啟用
        th 編輯
    tbody
      tr(v-for='(item, key) in filterCount' :key='item.id')
        td {{item.title}}
        td {{$filters.date(item.due_date)}}
        td {{item.percent}}
        td
          p.isUse(v-if='item.is_enabled') 啟用
          p.isNotUse(v-else) 不啟用
        td
          button.greebnt(type='button' @click='openModel(false, item)') 編輯
          button.redbnt(type='button' @click='opendelItem(item)') 刪除
DiscountModel(ref='count_model' :newdata='tempDiscount' @data-up='updateDiscount')
Deldiscount(ref='count_del_model' :data='tempDiscount' @del-item='delItem')
</template>
<script>
import DiscountModel from '@/components/login/DiscountModal.vue';
import Deldiscount from '@/components/login/DelModal.vue';

export default {
  data() {
    return {
      allCount: {},
      pagination: {},
      search: '',
      tempDiscount: {},
      is_New: false,
    };
  },
  components: {
    DiscountModel,
    Deldiscount,
  },
  computed: {
    filterCount() {
      return Object.values(this.allCount).filter((item) => item.title.match(this.search));
    },
  },
  methods: {
    getDiscount(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons/?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data, 'count');
            this.allCount = res.data.coupons;
            this.pagination = res.data.pagination;
          }
        });
    },
    openModel(isNew, item) {
      this.isNew = isNew;
      console.log(item, isNew);
      if (isNew) {
        this.tempDiscount = { due_date: new Date().getTime() / 1000, is_enabled: 0 };
      } else {
        this.tempDiscount = { ...item };
      }
      const Modelopen = this.$refs.count_model;
      Modelopen.showModal();
    },
    updateDiscount(item) {
      console.log(item);
      const Modelopen = this.$refs.count_model;
      if (this.isNew) {
        const httpMethod = 'post';
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.$http[httpMethod](api, { data: item })
          .then((response) => {
            console.log(response, item);
            this.getDiscount();
            Modelopen.hideModal();
            this.$httpMessage(response, '更新狀態');
          });
      } else {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
        const httpMethod = 'put';
        this.$http[httpMethod](api, { data: item })
          .then((response) => {
            console.log(response, item);
            this.getDiscount();
            Modelopen.hideModal();
            this.$httpMessage(response, '更新狀態');
          });
      }
    },
    opendelItem(item) {
      this.tempDiscount = { ...item };
      const delmodle = this.$refs.count_del_model;
      delmodle.showModal();
    },
    delItem() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempDiscount.id}`;
      this.$http.delete(url).then((response) => {
        console.log(response.data, 6666);
        const delComponent = this.$refs.count_del_model;
        delComponent.hideModal();
        this.$httpMessage(response, '更新狀態');
        this.getDiscount();
      });
    },
  },
  mounted() {
    this.getDiscount();
  },
};
</script>
<style lang="sass">
@import '@/assets/login/allProduct.sass'
</style>
