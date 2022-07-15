<template lang="pug">
#exampleModal.modal.fade(tabindex='-1' aria-labelledby='exampleModalLabel'
aria-hidden='true' ref='modal')
  .modal-dialog.modal-xl(role='document')
    .modal-content
      .modal-header
        h5.modal-title 新增商品
        button.btn-close(type='button' data-bs-dismiss='modal')
      .modal-body
        .row.rowrow
          .col-4
            .mb-3
              label.form-label(for='image') 輸入圖片網址
              input#image.form-control(type='text' v-model='tempProduct.imageUrl'
              placeholder='請輸入圖片連結')
            .mb-3
              label.form-label(for='customFile')
                | 或 上傳圖片
                i.fas.fa-spinner.fa-spin
              input#customFile.form-control(type='file' ref='fileInput' @change='uploadFile')
            img.img-fluid(:src='tempProduct.imageUrl' alt='')
            .mt-5(v-if='tempProduct.images')
              .mb-3.input-group(v-for='(image, key) in tempProduct.images'
              :key='key')
                input.form-control.form-control(type='url' v-model='tempProduct.images[key]'
                placeholder='請輸入連結')
                button.btn.btn-outline-danger(type='button'
                @click='tempProduct.images.splice(key, 1)') 移除
                img.img-fluid(:src='tempProduct.images' alt='')
              div(v-if='tempProduct.images')
                button.btn.btn-outline-primary.btn-sm.d-block.w-100(
                  @click="tempProduct.images.push('')") 新增圖片
          .col-8
            .box_tital_type
              .input_box
                label(for='tital') 標題
                input#tital(type='text' placeholder="請輸入標題"
                v-model="tempProduct.title")
              .input_box
                label(for='type') 分類
                input#type(type='text' placeholder="請輸入分類"
                v-model="tempProduct.category")
            .box_tital_type
              .input_box
                label(for='price') 售價
                input#price(type='number' placeholder="請輸入價格"
                v-model.number="tempProduct.price")
              .input_box
                label(for='orprice') 原價
                input#orprice(type='number' placeholder="請輸入價格"
                v-model.number="tempProduct.origin_price")
            .box_tital_type
              .input_box
                label(for='unit') 單位
                input#unit(type='text' placeholder="請輸入價格"
                v-model="tempProduct.unit")
              .input_box
                label(for='checkbox') 是否啟用
                input#checkbox(type='checkbox' placeholder="請輸入價格" :true-value="1"
                      :false-value="0" v-model="tempProduct.is_enabled")
            .textarea_box
              label(for='description')
              textarea#description(type='text' placeholder="請輸入產品描述"
              v-model="tempProduct.description")
            .textarea_box
              label(for='content')
              textarea#content(type='text' placeholder="請輸入產品說明內容"
              v-model="tempProduct.content")
      .modal-footer
        button(type='button' @click="$emit('update-data', tempProduct)") 送出訂單
</template>
<script>
import modelMixin from '@/mixin/modalMixuns';

export default {
  props: {
    data: {
      type: Object,
      default() { return {}; },
    },
  },
  data() {
    return {
      modal: {},
      tempProduct: {
      },
      tempdata: {
        loadingItem: '',
      },
      is_Has: false,
    };
  },
  watch: {
    data() {
      this.tempProduct = this.data;
      if (!this.tempProduct.images) {
        this.tempProduct.images = [];
      }
    },
  },
  methods: {
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData).then((response) => {
        if (response.data.success) {
          this.tempProduct.imageUrl = response.data.imageUrl;
        }
      });
    },
  },
  mixins: [modelMixin],
};
</script>
<style lang="sass">
@import '@/assets/login/ProdeuctModal.sass'
</style>
