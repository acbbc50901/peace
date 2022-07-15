import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('../views/ShopView.vue'),
  },
  {
    path: '/call',
    name: 'call',
    component: () => import('../views/CallView.vue'),
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/ProductView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/loginborad',
    name: 'loginborad',
    component: () => import('../views/LoginPage/AllProductsBoardView.vue'),
    children: [
      {
        path: 'allproduct',
        name: 'allpriduct',
        component: () => import('../views/LoginPage/UpdataProduct.vue'),
      },
      {
        path: 'discount',
        name: 'discount',
        component: () => import('../views/LoginPage/UpdataDiscount.vue'),
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('../views/LoginPage/UpdataList.vue'),
      },
      {
        path: 'allorder',
        name: 'allorder',
        component: () => import('../views/LoginPage/AllOrder.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
