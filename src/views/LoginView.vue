<template lang="pug">
.login_box
  .flex_box
    form.form_box(@submit.prevent="signIn")
      .login_box
        h1 請先登入
        .email_box
          label(for="inputEmail") Email address
          input(type="email"
              id="inputEmail"
              placeholder="Email address"
              required
              autofocus
              v-model="user.username"
              )
        .password_box
          label(for="inputPassword") PassWord
          input(type="password"
              id="inputPassword"
              placeholder="Password"
              required
              current-password= no
              autocomplete="off"
              v-model="user.password"
              )
        .button_box
          button(type="submit" @click="singin") 登入
  .flex_box
    form.form_box(@submit.prevent="signIn")
      .login_box
        h1 註冊帳戶
        .email_box
          label(for="addEmail") Email address
          input(type="email"
              id="addEmail"
              placeholder="Email address"
              required
              autofocus
              )
        .password_box
          label(for="addPassword") AddPassWord
          input(type="password"
              id="addPassword"
              placeholder="Password"
              required
              current-password= no
              autocomplete="off"
              )
        .password_box
          label(for="againPassword") AgainPassWord
          input(type="password"
              id="againPassword"
              placeholder="AgainPassWord"
              required
              current-password= no
              autocomplete="off"
              )
        .icon_box
          img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png", alt="")
          img(src="https://www.summers-eve.com.tw/wp-content/uploads/2021/03/Facebook-share-icon.png", alt="")
        .button_box
          button(type="submit") 註冊
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    singin() {
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
            this.$httpMessage(res, '登入');
            this.$router.push('/loginborad/allproduct');
          }
        });
    },
  },
};
</script>
<style lang="sass">
@import '@/assets/login/login.sass'
</style>
