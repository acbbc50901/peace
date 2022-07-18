<template lang="pug">
.sech_box
  .sech_input_box
    input(type="search" placeholder='搜尋'
    v-model="search")
  .sech_nav_box
    button(type='button' @click='openListModal(true)') 全部刪除
.allproduct_box
  table
    thead
      tr
        th id
        th 日期
        th 購買人
        th 總金額
        th 付款
        th 詳細
    tbody
      tr(v-for='(item, key) in filterorder' :key='item.id')
        td {{Array.from(item.id).slice(0,10).join().replace(/,/g, "")}}
        td {{$filters.date(item.create_at)}}
        td {{item.user.name}}
        td {{$filters.currency(item.total)}}
        td
          p.isUse(v-if='item.is_paid') 已付款
          p.isNotUse(v-else) 未付款
        td
          button.greebnt 詳細
          button.greebnt 修改
          button.redbnt(type='button') 刪除
delModal(ref='delmodal' :data='allorder')
</template>
<script>
import delModal from '@/components/login/DleOrders.vue';

export default {
  data() {
    return {
      allorder: {},
      search: '',
    };
  },
  components: {
    delModal,
  },
  computed: {
    filterorder() {
      return Object.values(this.allorder).filter((item) => item.id.match(this.search));
    },
  },
  methods: {
    getAllorders(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data, 'order');
            this.allorder = res.data.orders;
          }
        });
    },
  },
  mounted() {
    this.getAllorders();
  },
};
</script>

<style lang='sass'>
@import '@/assets/login/allProduct.sass'
.sech_box
  .sech_nav_box
    button
      background-color: $color_red
</style>
