<template lang='pug'>
header
  <Header></Header>
section#about
  <About></About>
section
  <Number></Number>
</template>
<script>
import Header from '@/components/about/HeardView.vue';
import About from '@/components/about/AboutsView.vue';
import Number from '@/components/about/NumberView.vue';

export default {
  components: {
    Header,
    About,
    Number,
  },
};
</script>
<style lang="sass">

</style>
