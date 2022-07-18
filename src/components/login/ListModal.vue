<template lang="pug">
#delModal.modal.fade.modal-xl(tabindex='-1' role='dialog'
aria-labelledby='exampleModalLabel' aria-hidden='true' ref='modal')
  .modal-dialog(role='document')
    .modal-content.border-0
      .modal-header
        h5.modal-title
          span 新增文章
        button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
      .modal-body
        .row
          .col-4
            .box_name
              label(for="img") 圖片連結
              input(type="text" id='img' placeholder="請輸入圖片網址" v-model="newlist.image")
            .box_name
              label(for="img") 上傳圖片
              input(type="file" id='img' placeholder="請上傳圖片" ref='fileInput' @change='uploadFile')
            img(:src="newlist.image", alt="" :class='{ img_size : newlist.image }')
          .col-8
            .box_all
              .box_name
                label(for="title") 文章名稱
                input(type="text" id='title' placeholder="請輸入名稱"
                v-model="newlist.title")
              .box_name
                label(for="author") 輸入作者
                input(type="text" id='author' placeholder="請輸入作者"
                v-model="newlist.author")
            .box_all
              .box_name
                label(for="data") 到期日期
                input(type="date" id='data' placeholder="選擇到期日期"
                v-model="create_at")
              .box_name
                label(for="isPublic")  是否啟用
                input.input_check(type="checkbox" id='isPublic'
                :true-value="true" :false-value="false" :value="false"
                v-model="newlist.isPublic")
            .box_all
              .box_name
                label(for="text") #tag
                input(type="text" id='text' placeholder="輸入tag"
                v-model="newlist.tag[0]")
              .box_name(v-for='(tag, key) in newlist.tag' :key='tag.key')
                label(for="text") #tag
                input(type="text" id='text' placeholder="輸入tag" v-model="newlist.tag[key+1]")
            .box_text
              label(for="description") 輸入描述
              textarea(type='text' placeholder="請輸入描述內容"
              v-model="newlist.description")
            .box_text
              label(for="content") 輸入內容
              textarea.itemin(type='text' placeholder="請輸入文章內容"
              v-model="newlist.content")
      .modal-footer
        button.bun_gree(type='button' @click='$emit("item-data", newlist)') 新增
        button.bun_grary(type='button' data-bs-dismiss='modal' ) 取消
</template>
<script>
import modalMixin from '@/mixin/modalMixuns';

export default {
  props: {
    newdata: {
      type: Object,
      default() { return {}; },
    },
  },
  data() {
    return {
      modal: {},
      newlist: {
        isPublic: false,
        tag: [],
      },
      create_at: '',
    };
  },
  watch: {
    newdata() {
      this.newlist = this.newdata;
      const dateAndTime = new Date(this.newlist.create_at * 1000).toISOString().split('T');
      [this.create_at] = dateAndTime;
    },
    create_at() {
      this.newlist.create_at = Math.floor(new Date(this.create_at) / 1000);
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
          this.newlist.image = response.data.imageUrl;
        }
      });
    },
  },
  mounted() {
  },
  mixins: [modalMixin],
};
</script>
<style lang="sass">
@import '@/assets/login/listmodal.sass'
</style>
