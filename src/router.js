import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import AboutView from '@/views/AboutView.vue'
import { useBaseUrl } from '@/helpers/useBaseUrl'

const baseUrl = useBaseUrl()

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes
})

export default router
