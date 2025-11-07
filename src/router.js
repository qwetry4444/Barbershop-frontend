import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Barbers from '@/components/Barbers.vue'
import Services from '@/components/Services.vue'
import ServiceForm from '@/components/ServiceForm.vue'

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
  },
  {
    path: '/serviceForm',
    component: ServiceForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
