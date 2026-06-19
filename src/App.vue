<template>
  <SiteNav />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <SiteFooter />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'

let observer = null
let mutObs = null
let rafId = null

function reveal() {
  if (!observer) return
  document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => observer.observe(el))
}

function scheduleReveal() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(reveal)
}

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )

  // Déclenche reveal dès que de nouveaux éléments apparaissent dans le DOM
  // (navigation SPA, rendu async, etc.) — évite tout problème de timing
  mutObs = new MutationObserver(scheduleReveal)
  mutObs.observe(document.body, { childList: true, subtree: true })

  reveal()
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  observer?.disconnect()
  mutObs?.disconnect()
})
</script>
