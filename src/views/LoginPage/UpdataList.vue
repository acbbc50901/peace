<template lang="pug">
.sech_box
  .sech_input_box
    input(type="search" placeholder='搜尋' v-model="search")
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
      tr(v-for='item in seAllitem ' :key='item.id')
        td {{ item.title }}
        td {{ $filters.date(item.create_at) }}
        td {{ item.tag.toString() }}
        td {{ Array.from(item.description).slice(0,30).join().replace(/,/g, "") }}
        td
          p.isUse(v-if='item.isPublic') 啟用
          p.isNotUse(v-else) 不啟用
        td
          button.greebnt(type='button' @click='openListModal(false, item)') 編輯
          button.redbnt(type='button' @click='opendelItem(item)') 刪除
ListModal(ref='listmodal' :newdata='itemtempProduct' @item-data='updatelist')
DelModal(ref='count_del_model' :data='itemtempProduct' @del-item='DelModal')
</template>
<script>
import ListModal from '@/components/login/ListModal.vue';
import DelModal from '@/components/login/DelModal.vue';

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
    DelModal,
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
        this.itemtempProduct = { create_at: new Date().getTime() / 1000, isPublic: false, tag: [] };
      } else {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;
        this.$http.get(api)
          .then((res) => {
            if (res.data.success) {
              this.itemtempProduct = res.data.article;
            }
          });
      }
      const listmodal222 = this.$refs.listmodal;
      listmodal222.showModal();
      this.is_New = isNew;
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
    opendelItem(item) {
      this.itemtempProduct = { ...item };
      const delmodle = this.$refs.count_del_model;
      delmodle.showModal();
    },
    DelModal() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.itemtempProduct.id}`;
      this.$http.delete(url).then((response) => {
        console.log(response.data, 6666);
        const delComponent = this.$refs.count_del_model;
        delComponent.hideModal();
        this.$httpMessage(response, '更新狀態');
        this.getList();
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
