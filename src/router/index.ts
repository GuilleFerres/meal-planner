import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // Sin argumentos: en el navegador la base es pathname + search (p. ej. /meal-planner/ en GitHub Pages).
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/platos-favoritos',
      name: 'favorite-dishes',
      component: () => import('../views/FavoriteDishesView.vue'),
    },
  ],
})

export default router
