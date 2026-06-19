<template>
  <header :class="['nav', { 'nav--solid': solid, 'nav--open': open }]">
    <div class="nav__inner">
      <router-link to="/" class="nav__logo" @click="close">
        Nina Gaillard
      </router-link>

      <nav class="nav__links" aria-label="Primary">
        <router-link
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="nav__link"
        >
          <span class="nav__idx">{{ item.idx }}</span>{{ item.label }}
        </router-link>
      </nav>

      <button
        class="nav__burger"
        :aria-expanded="open"
        aria-label="Menu"
        @click="open = !open"
      >
        <span></span><span></span>
      </button>
    </div>

    <!-- Overlay mobile -->
    <transition name="overlay">
      <div v-if="open" class="nav__overlay">
        <router-link
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="nav__big"
          @click="close"
        >
          <span class="nav__idx">{{ item.idx }}</span>{{ item.label }}
        </router-link>
        <a
          class="nav__contact link"
          href="mailto:gailnina@orange.fr"
          @click="close"
        >gailnina@orange.fr</a>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const open = ref(false)
const scrolled = ref(false)

const items = [
  { to: '/work', label: 'Work', idx: '01' },
  { to: '/shorts', label: 'Shorts', idx: '02' },
  { to: '/about', label: 'About', idx: '03' },
]

// barre pleine dès qu'on quitte le haut, ou hors de la home
const solid = computed(() => scrolled.value || route.name !== 'home')

function onScroll() {
  scrolled.value = window.scrollY > 24
}
function close() {
  open.value = false
}

// verrouille le scroll quand l'overlay est ouvert
watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})
watch(() => route.fullPath, close)

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1000;
  transition: background 0.4s var(--ease), backdrop-filter 0.4s var(--ease),
    border-color 0.4s var(--ease);
  border-bottom: 1px solid transparent;
}
.nav--solid {
  background: color-mix(in srgb, var(--ink) 78%, transparent);
  backdrop-filter: blur(14px) saturate(1.2);
  border-bottom-color: var(--ink-line);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  max-width: var(--maxw);
  margin-inline: auto;
  padding: clamp(0.9rem, 2vw, 1.4rem) var(--gutter);
}

.nav__logo {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 1.1rem + 1.6vw, 2.4rem);
  line-height: 1;
  color: var(--blush);
  letter-spacing: 0.02em;
  transition: color 0.3s var(--ease);
}
.nav__logo:hover { color: var(--rose); }

.nav__links {
  display: flex;
  gap: clamp(1.5rem, 3vw, 3rem);
}
.nav__link {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--paper);
  position: relative;
  padding-bottom: 2px;
  transition: color 0.3s var(--ease);
}
.nav__idx {
  color: var(--rose);
  margin-right: 0.5em;
  font-size: 0.72em;
  vertical-align: 0.2em;
}
.nav__link::after {
  content: '';
  position: absolute;
  left: 0; bottom: -4px;
  height: 1px; width: 100%;
  background: var(--rose);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.35s var(--ease);
}
.nav__link:hover { color: var(--blush); }
.nav__link:hover::after,
.nav__link.router-link-active::after { transform: scaleX(1); transform-origin: left; }
.nav__link.router-link-active { color: var(--blush); }

/* Burger */
.nav__burger {
  display: none;
  width: 30px; height: 22px;
  position: relative;
}
.nav__burger span {
  position: absolute;
  left: 0; height: 2px; width: 100%;
  background: var(--blush);
  transition: transform 0.4s var(--ease), opacity 0.3s var(--ease);
}
.nav__burger span:nth-child(1) { top: 4px; }
.nav__burger span:nth-child(2) { bottom: 4px; }
.nav--open .nav__burger span:nth-child(1) { top: 10px; transform: rotate(45deg); }
.nav--open .nav__burger span:nth-child(2) { bottom: 10px; transform: rotate(-45deg); }

/* Overlay */
.nav__overlay {
  position: fixed;
  inset: 0;
  background: var(--ink);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(1.2rem, 4vw, 2rem);
  padding: var(--gutter);
}
.nav__big {
  font-family: var(--font-display);
  font-size: clamp(3rem, 14vw, 6rem);
  line-height: 0.95;
  color: var(--blush);
  transition: color 0.3s var(--ease);
}
.nav__big:hover { color: var(--rose); }
.nav__big .nav__idx {
  font-family: var(--font-mono);
  font-size: 1rem;
  vertical-align: super;
}
.nav__contact {
  margin-top: 1.5rem;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  font-size: 0.95rem;
}

.overlay-enter-active, .overlay-leave-active { transition: opacity 0.35s var(--ease); }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }

@media (max-width: 760px) {
  .nav__links { display: none; }
  .nav__burger { display: block; }
}
</style>
