import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
<<<<<<< HEAD
      path: '/ativos',
      name: 'ativos',
      component: () => import(/* webpackChunkName: "Ativos" */ '../views/Ativos.vue')
  }
=======
    path: '/bicicletas',
    name: 'bicicletas',
    component: () => import(/* webpackChunkName: "bicicletas" */ '../views/Bicicletas.vue')
  }

>>>>>>> 85526e5c703732a8c115ac4a5546642d938d78b4
]

const router = new VueRouter({
  routes
})

export default router
