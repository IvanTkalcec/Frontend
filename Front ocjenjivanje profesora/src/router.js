import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Kolegiji from "./views/Kolegiji";
import Anketa from "./views/Anketa";
import Zahvala from "./views/Zahvala";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/kolegiji',
      name: 'kolegiji',
      component: Kolegiji
    },
    {
      path: '/anketa',
      name: 'anketa',
      component: Anketa,
      props: true
    },
    {
      path: '/zahvala',
      name: 'zahvala',
      component: Zahvala
    },
  ]
})
