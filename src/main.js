// Import global styles
import './assets/main.scss'

// Import Vue
import { createApp } from 'vue'

// Import root component
import App from './App.vue'

// Import i18n
import i18n from './i18n'

// Import vue-router
import router from './router'

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
loadComponents().then(async () => {
  // Wait for i18next to be initialized before mounting the app
  await i18n(app)

  // Now that i18next is initialized, create Pinia store instance
  const { createPinia } = await import('pinia')
  const pinia = createPinia()
  app.use(pinia)

  // Use vue-router for routes management
  app.use(router)
  // Mount the application to the DOM
  app.mount('#app')
})
