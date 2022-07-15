<template lang="pug">
nav.nav(ref="nav")
  .nav_bar
    .img_box(@click="indexpoen")
      router-link(to="/")
        img(src="@/assets/img/logo2.png", alt="")
    .all_box
      .list_box
        ul
          li(v-for="item in nav_list")
            router-link( :to="`${item.to}`" @click="callList(item)" :ref="`${item.name}`"
            :class="{ bottonbd: item.isYou}") {{item.name}}
      .icon_box
        router-link(to="/login")
          i.bi.bi-person-fill
        i.bi.bi-cart-fill(@click="openModal")
          .order {{cart_data}}
    .box(@click='listshow')
      .span.span2(:class="{ rig_ber: isOpen }")
      .span(:class="{ lef_ber: isOpen }")
ShopModal(ref='modals' @update-product="OutData")
</template>
<style lang="sass">
@import "../assets/sass/navbar.sass"
</style>
<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import ShopModal from '@/components/AllOrderModal.vue';
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      nav_list: [
        {
          name: '關於我們',
          to: '/about',
          isYou: false,
        },
        {
          name: '所有甜點',
          to: '/shop',
          isYou: false,
        },
        {
          name: '熱銷商品',
          to: '/product',
          isYou: false,
        },
        {
          name: '聯絡資訊',
          to: '/call',
          isYou: false,
        },
      ],
      isShow: false,
      isOpen: false,
      cart_data: 0,
      outdata: '',
    };
  },
  components: {
    ShopModal,
  },
  methods: {
    callList(item) {
      const itemin = item;
      const navControl = this.nav_list;
      navControl.forEach((res) => {
        const ccc = res;
        ccc.isYou = false;
      });
      itemin.isYou = true;
      document.body.scrollTop = 0;
    },
    indexpoen() {
      const navControl = this.nav_list;
      navControl.forEach((res) => {
        const ccc = res;
        ccc.isYou = false;
      });
    },
    listshow() {
      if (!this.isShow) {
        gsap.to('.all_box', {
          left: '50%',
          opacity: 1,
        });
        this.isShow = true;
        this.isOpen = true;
      } else {
        gsap.to('.all_box', {
          left: '-50%',
          opacity: 0,
        });
        this.isShow = false;
        this.isOpen = false;
      }
    },
    openModal() {
      const modalref = this.$refs.modals;
      modalref.showModal();
      modalref.getPordeut();
    },
    getPordeut() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api)
        .then((res) => {
          this.cart_data = res.data.data.carts.length;
        });
    },
    OutData() {
      this.getPordeut();
    },
  },
  mounted() {
    emitter.on('sendData', () => {
      setTimeout(() => {
        this.getPordeut();
      }, 500);
    });
    this.getPordeut();
    gsap.registerPlugin(ScrollTrigger);
    const lt = gsap.timeline;
    lt({
      scrollTrigger: {
        trigger: '.nav',
        start: '20px',
        onLeave: () => {
          gsap.to('.nav', { backgroundColor: '#fff' });
        },
        onLeaveBack: () => {
          gsap.to('.nav', { backgroundColor: 'transparent' });
        },
      },
    });
  },
};
</script>
