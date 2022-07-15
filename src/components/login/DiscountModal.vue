<template lang="pug">
#delModal.modal.fade.modal-xl(tabindex='-1' role='dialog'
aria-labelledby='exampleModalLabel' aria-hidden='true' ref='modal')
  .modal-dialog(role='document')
    .modal-content.border-0
      .modal-header
        h5.modal-title
          span 新增優惠卷
        button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
      .modal-body
        .row
          .col-12
            .box_all
              .box_name
                label(for="name") 優惠卷名稱 :
                input(type="text" id='name' placeholder="請輸入名稱"
                v-model="newcount.title")
              .box_name
                label(for="name") 優惠瑪 :
                input.inputcount(type="text" id='name' placeholder="請輸入名稱"
                v-model="newcount.code")
            .box_all
              .box_name
                label(for="count") 折扣百分比 :
                input(type="number" id='count' placeholder="請輸入折扣比"
                v-model="newcount.percent")
              .box_name
                label(for="data") 到期日期 :
                input(type="date" id='data' placeholder="選擇到期日期"
                v-model="due_date")
              .box_name
                label(for="yes")  是否啟用 :
                input.input_check(type="checkbox" id='yes' :true-value="1" :false-value="0"
                v-model="newcount.is_enabled")
      .modal-footer
        button.btn.btn-outline-secondary(type='button' @click="$emit('data-up', newcount)") 新增
        button.btn.btn-danger(type='button' data-bs-dismiss='modal' ) 取消
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
      newcount: {
        is_enabled: 0,
      },
      due_date: '',
    };
  },
  watch: {
    newdata() {
      this.newcount = this.newdata;
      const dateAndTime = new Date(this.newcount.due_date * 1000).toISOString().split('T');
      [this.due_date] = dateAndTime;
    },
    due_date() {
      this.newcount.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  mounted() {
  },
  mixins: [modalMixin],
};
</script>
<style lang="sass">
@import '@/assets/login/discountModal.sass'
</style>
