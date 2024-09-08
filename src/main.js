// Import global styles
import './assets/main.scss'

// Import Vue and Pinia
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Import root component
import App from './App.vue'

// Import vue-router
import router from './router'

// Create Pinia store instance
const pinia = createPinia()

// Create Vue application instance
const app = createApp(App)

// Dynamically import all components from specified directories
const modules = import.meta.glob([
  './components/**/*.vue',
  './layouts/**/*.vue',
  './views/**/*.vue'
])

// Function to load and register components globally
const loadComponents = async () => {
  // Create an array of promises to load components
  const componentPromises = Object.keys(modules).map(async (path) => {
    // Dynamically import the component
    const mod = await modules[path]()
    // Derive component name from the file path
    const componentName = path
      .split('/')
      .pop()
      .replace(/\.\w+$/, '')
    // Register the component globally
    app.component(componentName, mod.default)
  })

  // Wait for all components to be loaded and registered
  await Promise.all(componentPromises)
}

// Load components and then mount the application
loadComponents().then(() => {
  // Use Pinia for state management
  app.use(pinia)
  // Use vue-router for routes management
  app.use(router)
  // Mount the application to the DOM
  app.mount('#app')
})
