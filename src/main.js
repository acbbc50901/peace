import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import $httpMessage from './methods/pushMessage';
import { currency, date } from './methods/filters';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);
app.component('LoadIng', Loading);
app.use(VueAxios, axios);
app.use(router);
app.config.globalProperties.$filters = {
  currency,
  date,
};
app.config.globalProperties.$httpMessage = $httpMessage;
app.mount('#app');
