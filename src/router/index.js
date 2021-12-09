import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

//GERENCIA AS URL's 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pedidos', //qual caminho para acessar a rota
    name: 'Pedidos', //qual Vue que vai ser utilizado para acessar a rota
    component: () => import(/* webpackChunkName: "about" */ '../views/Pedidos.vue') //import da Vue
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
