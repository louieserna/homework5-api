import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import cardDetails from './views/cardDetails.vue'
import LoginPage from './views/LoginPage.vue'
import SettingsPage from './views/SettingsPage.vue'

import { useAuth } from './composables/useAuth'
const {isAuthenticated} =useAuth()

const routes = [
  { path: '/homework5-api/', name: 'Home', component: HomePage },
  { path: '/homework5-api/other', name: 'Other', component: () => import('@/views/OtherPage.vue') },
  { path: '/homework5-api/employees/:id', name: 'cardDetails', component: cardDetails },
  { path: '/homework5-api/login', name: 'LoginPage', component: LoginPage },
  { path: '/homework5-api/settings', name: 'SettingsPage', component: SettingsPage, meta: {requiresAuth: true} },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

//navigation guard
router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({name: 'LoginPage', query: {redirect: to.fullPath}})
  } else {
    next()
  }
})

export default router
