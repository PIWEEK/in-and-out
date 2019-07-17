import Vue from 'vue'
import Router from 'vue-router'
import Login from './auth/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'today' },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component () { return import(/* webpackChunkName: "register" */ '@/register') },
      children: [
        {
          path: ':date',
          name: 'register-detail',
          props: true,
          component () {
            return import(/* webpackChunkName: "register" */ '@/register/RegisterDetail')
          },
        },
      ],
    },
    {
      path: '/today',
      name: 'today',
      component () { return import(/* webpackChunkName: "today" */ '@/today') },
    },
  ],
})
