<template lang="pug">
#exampleModal.modal.fade(tabindex='-1' aria-labelledby='exampleModalLabel'
aria-hidden='true' ref='modal')
  .modal-dialog(role='document')
    .modal-content
      .modal-header.header-modal
        h5.modal-title 刪除
        button.btn-close(type='button' data-bs-dismiss='modal')
      .modal-body.body_modal
        .text_box
          span 確認要刪除
          span.fzbig {{data.id}}
          span 嗎?
      .modal-footer
        button.bntt(type='button' @click="$emit('del-item')") 刪除
</template>
<style lang='sass'>
@import '@/assets/login/delModel.sass'
</style>

<script>
import modelMixin from '@/mixin/modalMixuns';

export default {
  props: {
    data: {},
  },
  data() {
    return {
      modal: {},
    };
  },
  mounted() {
  },
  mixins: [modelMixin],
};
</script>
