import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Barbers from '@/components/Barbers.vue'
import Services from '@/components/Services.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/barbers',
    component: Barbers
  },
  {
    path: '/services',
    component: Services
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
