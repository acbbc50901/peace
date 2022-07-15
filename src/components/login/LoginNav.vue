<template lang="pug">
.navbar_box(:class='{ navbar_chang : is_change }')
  router-link(to='/loginborad/allproduct')
    p(v-if="is_change") 新增產品
    i.bi.bi-clipboard-check(v-else)
  router-link(to='/loginborad/discount')
    p(v-if="is_change") 新增折價卷
    i.bi.bi-ticket-perforated(v-else)
  router-link(to='/loginborad/list')
    p(v-if="is_change") 新增文章
    i.bi.bi-card-list(v-else)
  router-link(to='/loginborad/allorder')
    p(v-if="is_change") 總訂單
    i.bi.bi-clipboard(v-else)
  .close_box
    button.bi.bi-caret-right-fill.changeicon_none(:class='{ changeicon : is_change }'
    @click='is_change = !is_change')
</template>
<script>
export default {
  data() {
    return {
      is_change: false,
    };
  },
  methods: {
  },
};
</script>
<style lang="sass">
@import '@/assets/login/loginnav.sass'
</style>
