import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import WorkView from './views/WorkView.vue'
import ProjectView from './views/ProjectView.vue'
import ShortsView from './views/ShortsView.vue'
import AboutView from './views/AboutView.vue'
import NotFound from './views/NotFound.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { hero: true } },
  { path: '/work', name: 'work', component: WorkView },
  { path: '/work/:slug', name: 'project', component: ProjectView, props: true },
  { path: '/shorts', name: 'shorts', component: ShortsView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
]

const router = createRouter({
  // Hash history : fonctionne sur n'importe quel hébergement statique
  // sans config serveur (GitHub Pages, Vercel static, etc.).
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    return { top: 0 }
  },
})

export default router
