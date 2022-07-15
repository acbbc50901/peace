<template lang="pug">
.row
  .col-1
    LoginNav
  .col-11
    router-view
</template>
<script>
import LoginNav from '@/components/login/LoginNav.vue';

export default {
  components: {
    LoginNav,
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${token}`;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api, this.user).then((res) => {
      console.log(res);
      if (!res.data.success) {
        this.$router.push('/login');
      }
    });
  },
};
</script>

<style lang="sass">
.row
  margin-top: 80px
  .col-1
    position: relative
    padding: 0
    margin: 0
  .col-11
    padding: 0
    margin: 0
</style>
