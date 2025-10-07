import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BarbersView from '@/views/BarbersView.vue'
import ServicesView from '@/views/ServicesView.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/barbers',
    component: BarbersView
  },
  {
    path: '/services',
    component: ServicesView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
