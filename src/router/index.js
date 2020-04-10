import Vue from 'vue'
import VueRouter from 'vue-router'
import TableFields from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TableFields
  },
  {
    path: '/statistic',
    name: 'Statistic',
    // route level code-splitting
    // this generates a separate chunk (statistic.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "statistic" */ '../views/Statistic.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
