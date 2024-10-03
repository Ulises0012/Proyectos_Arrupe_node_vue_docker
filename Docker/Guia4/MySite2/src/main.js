
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/AboutView.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('./views/ServiceView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/ContactView.vue')
    }
  ]
})

const app = createApp(App)

app.use(router)

app.mount('#app')