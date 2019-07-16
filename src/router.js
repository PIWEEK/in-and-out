import Vue from 'vue'
import Router from 'vue-router'
import Login from './auth/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: '',
      alias: '/',
      component () { return import(/* webpackChunkName: "register" */ '@/register') },
    },
  ],
})
