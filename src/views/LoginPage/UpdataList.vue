<template lang="pug">
.sech_box
  .sech_input_box
    input(type="search" placeholder='搜尋')
  .sech_nav_box
    button(type='button' @click='openListModal(true)') 新增文章
.allproduct_box
  table
    thead
      tr
        th 名稱
        th 日期
        th #tag
        th 描述
        th 啟用
        th 編輯
    tbody
      tr(v-for='item in item' :key='item.id')
        td {{ item.title }}
        td {{ $filters.date(item.create_at) }}
        td {{ item.tag.toString() }}
        td {{ Array.from(item.description).slice(0,30).join().replace(/,/g, "") }}
        td
          p.isUse(v-if='item.isPublic') 啟用
          p.isNotUse(v-else) 不啟用
        td
          button.greebnt(type='button' @click='openListModal(false, item)') 編輯
          button.redbnt(type='button') 刪除
ListModal(ref='listmodal' :newdata='itemtempProduct' @item-data='updatelist')
</template>
<script>
import ListModal from '@/components/login/ListModal.vue';

export default {
  data() {
    return {
      item: {},
      itemtempProduct: {},
      pagination: {},
      search: '',
      is_New: false,
    };
  },
  components: {
    ListModal,
  },
  computed: {
    seAllitem() {
      return Object.values(this.item).filter((item) => item.title.match(this.search));
    },
  },
  methods: {
    getList(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles/?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data, 'item');
            this.item = res.data.articles;
            this.pagination = res.data.pagination;
          }
        });
    },
    openListModal(isNew, item) {
      if (isNew) {
        this.itemtempProduct = {};
      } else {
        this.itemtempProduct = { ...item };
      }
      const listmodal222 = this.$refs.listmodal;
      listmodal222.showModal();
      this.isNew = isNew;
    },
    updatelist(item) {
      this.itemtempProduct = item;
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`;
      let httpMethod = 'post';
      if (!this.is_New) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;
        httpMethod = 'put';
      }
      const productComponent = this.$refs.listmodal;
      this.$http[httpMethod](api, { data: this.itemtempProduct })
        .then((response) => {
          console.log(response);
          productComponent.hideModal();
          this.getList();
          this.$httpMessage(response, '更新狀態');
        });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="sass">
@import '@/assets/login/allProduct.sass'
</style>
