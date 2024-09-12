import { createRouter, createWebHashHistory } from 'vue-router'
import { useBaseUrl } from '@/helpers/useBaseUrl'

// Get the base URL dynamically using the useBaseUrl helper function
const baseUrl = useBaseUrl()

// Define route configuration with dynamically loaded components
const routes = [
  {
    path: '/',
    component: () => import('@/views/MainView.vue')
  },
  {
    path: '/about',
    component: () => import('@/views/MarkdownPage.vue')
  },
  {
    path: '/pages/:file?',
    component: () => import('@/views/MarkdownPage.vue')
  }
]

// Create a Vue Router instance with hash history mode and the defined routes
const router = createRouter({
  history: createWebHashHistory(baseUrl), // Use the base URL for history mode
  routes // Pass the routes array
})

// Export the router instance to be used in the main.js file
export default router
