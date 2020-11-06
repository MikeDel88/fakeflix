import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/accueil',
    name: 'Accueil',
    component: () => import('../views/Accueil.vue')
  },
  {
    path:'/movie/:id',
    name:'/Movie',
    component: () => import('../views/Movie.vue')
  },
  {
    path: '/favoris',
    name: 'Favoris',
    component: () => import('../views/Favoris.vue')
  },
  {
    path: '/voir',
    name: 'Voir',
    component: () => import('../views/Voir.vue')
  }
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
