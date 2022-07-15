<template lang="pug">
.sech_box
  .sech_input_box
    input(type="search" placeholder='搜尋' v-model="search")
  .sech_nav_box
    ul(@click="list_open = !list_open") 商品排序
      .list_box(:class ="{ list_open : list_open} ")
        li(@click='chang') 新到舊
        li(@click='chang2') 舊到新
    button(type='button' @click='PorductshowModel') 新增商品
.allproduct_box
  table
    thead
      tr
        th.small 種類
        th.small.dnone 商品圖片
        th 名稱
        th.small.dnone 金額
        th.small 是否啟用
        th.small 編輯
    tbody
      tr(v-for="item in fillterdata")
        td {{item.category}}
        td.dnone
          img(:src="item.imageUrl", alt="")
        td {{item.title}}
        td.dnone {{$filters.currency(item.price)}} NT
        td
          .isUse(v-if="item.is_enabled") 啟用
          .isNotUse(v-else) 不啟用
        td
          button.greebnt(type='button' @click='PorductshowModel(false, item)') 編輯
          button.redbnt(type='button' @click='opendleModal(item)' ) 刪除
ProductModal(ref='modals' :data='tempProuct' @update-data='updateProduct')
DelModal(ref='demodals' :data='tempProuct' @del-item='delProduct')
</template>

<script>
import ProductModal from '@/components/login/LoginModal.vue';
import DelModal from '@/components/login/DelModal.vue';

export default {
  data() {
    return {
      AllList: '',
      list_open: false,
      tempProuct: {},
      search: '',
      is_New: false,
      is_sort: {
        new_and_old: true,
        old_and_new: false,
      },
      is_sort2: true,
    };
  },
  watch: {
    list_open() {
    },
  },
  computed: {
    fillterdata() {
      return this.datachang();
    },
  },
  components: {
    ProductModal,
    DelModal,
  },
  methods: {
    getData() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/all`;
      this.$http.get(api)
        .then((res) => {
          this.AllList = res.data.products;
          console.log(res.data);
        });
    },
    PorductshowModel(isNew, item) {
      if (isNew) {
        this.tempProuct = {};
      } else {
        this.tempProuct = { ...item };
      }
      const newModal = this.$refs.modals;
      newModal.showModal();
      this.isNew = isNew;
    },
    updateProduct(item) {
      this.tempProduct = item;
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      const productComponent = this.$refs.modals;
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((response) => {
          console.log(response);
          productComponent.hideModal();
          this.getData();
          this.$httpMessage(response, '更新狀態');
        });
    },
    datachang() {
      let aa = () => ('');
      if (this.is_sort.new_and_old) {
        aa = () => (
          Object.values(this.AllList).reverse().filter((item) => item.title.match(this.search))
        );
        this.is_sort.old_and_new = false;
      }
      if (this.is_sort.old_and_new) {
        aa = () => (
          Object.values(this.AllList).filter((item) => item.title.match(this.search))
        );
        this.is_sort.new_and_old = false;
      }
      return aa();
    },
    chang() {
      if (this.is_sort.old_and_new) {
        this.is_sort.new_and_old = true;
        this.is_sort.old_and_new = false;
        console.log(6);
      }
    },
    chang2() {
      if (this.is_sort.new_and_old) {
        this.is_sort.old_and_new = true;
        this.is_sort.new_and_old = false;
        console.log(6666);
      }
    },
    opendleModal(item) {
      const dleModal = this.$refs.demodals;
      this.tempProuct = { ...item };
      dleModal.showModal();
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProuct.id}`;
      this.$http.delete(url).then((response) => {
        console.log(response.data, 6666);
        const delComponent = this.$refs.demodals;
        delComponent.hideModal();
        this.$httpMessage(response, '更新狀態');
        this.getData();
      });
    },
  },
  mounted() {
    this.getData();
  },

};
</script>
<style lang="sass">
@import '@/assets/login/allProduct.sass'
</style>
