<template>
  <main class="home">
    <!-- HERO -->
    <section class="hero">
      <div class="hero__media">
        <video
          autoplay muted loop playsinline
          :poster="asset('projets/cyberpunk.jpg')"
        >
          <source src="https://archive.org/download/filmintrosite/filmintrosite.mp4" type="video/mp4" />
        </video>
        <div class="hero__scrim"></div>
      </div>

      <div class="hero__content container">
        <p class="eyebrow hero__eyebrow">Digital artist &nbsp;·&nbsp; VJ &nbsp;·&nbsp; Paris</p>
        <h1 class="hero__name" :class="{ 'is-on': settled }">Nina<br />Gaillard</h1>
        <p class="hero__line">
          Audiovisual installations, live visuals and photography —
          light bent into something that moves.
        </p>
        <router-link to="/work" class="pill hero__cta">Enter the work →</router-link>
      </div>

      <div class="hero__cue meta">Scroll</div>
    </section>

    <!-- STATEMENT -->
    <section class="section container statement" data-reveal>
      <p class="eyebrow">Practice</p>
      <p class="statement__text">
        I build images that don't sit still — projections, screens and sound
        wired together until the room itself becomes part of the piece.
      </p>
    </section>

    <!-- SELECTED WORK -->
    <section class="section container">
      <header class="sel__head" data-reveal>
        <h2 class="sel__title">Selected work</h2>
        <router-link to="/work" class="link sel__all">All projects →</router-link>
      </header>

      <div class="sel__grid">
        <router-link
          v-for="(p, i) in featured"
          :key="p.slug"
          :to="`/work/${p.slug}`"
          class="tile"
          :class="`tile--${i}`"
          data-reveal
        >
          <div class="tile__frame">
            <img :src="asset(p.cover)" :alt="p.title" loading="lazy" />
          </div>
          <div class="tile__row">
            <h3 class="tile__name">{{ p.title }}</h3>
            <span class="meta">{{ p.medium[0] }}</span>
          </div>
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { projects } from '../lib/projects.js'
import { asset } from '../lib/asset.js'

const featured = projects.filter((p) =>
  ['racines', 'cyberpunk', 'memoire'].includes(p.slug)
)
const settled = ref(false)
onMounted(() => requestAnimationFrame(() => (settled.value = true)))
</script>

<style scoped>
.home { padding-top: 0; }

/* HERO */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.hero__media { position: absolute; inset: 0; z-index: 0; }
.hero__media video { width: 100%; height: 100%; object-fit: cover; }
.hero__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(10,10,12,0.45) 0%, rgba(10,10,12,0.1) 35%, rgba(10,10,12,0.85) 100%),
    radial-gradient(80% 60% at 50% 120%, rgba(237,135,179,0.18), transparent 70%);
}

.hero__content {
  position: relative;
  z-index: 1;
  padding-bottom: clamp(3.5rem, 9vh, 7rem);
  padding-top: 6rem;
}
.hero__eyebrow { margin-bottom: 1.2rem; }
.hero__name {
  font-size: var(--display);
  color: var(--blush);
  letter-spacing: 0.005em;
  text-shadow: -10px 0 var(--ghost-cyan), 10px 0 var(--ghost-violet);
}
.hero__name.is-on { animation: rgb-settle 1.1s var(--ease) forwards; }
.hero__line {
  margin-top: 1.6rem;
  max-width: 34ch;
  font-size: var(--step-1);
  color: var(--paper);
}
.hero__cta { margin-top: 2.2rem; }

.hero__cue {
  position: absolute;
  bottom: 1.4rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  writing-mode: vertical-rl;
  letter-spacing: 0.3em;
  color: var(--muted);
  animation: cue 2.4s var(--ease) infinite;
}
@keyframes cue {
  0%, 100% { transform: translate(-50%, 0); opacity: 0.5; }
  50% { transform: translate(-50%, 8px); opacity: 1; }
}

/* STATEMENT */
.statement { border-top: 1px solid var(--ink-line); }
.statement__text {
  margin-top: 1.4rem;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 1rem + 4vw, 4rem);
  line-height: 1.04;
  color: var(--blush);
  max-width: 22ch;
}

/* SELECTED */
.sel__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: clamp(1.8rem, 4vw, 3rem);
}
.sel__title { font-size: var(--step-2); }
.sel__all { font-family: var(--font-mono); font-size: var(--step--1); letter-spacing: 0.1em; }

.sel__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: clamp(1rem, 2.5vw, 2rem);
}
.tile { grid-column: span 2; display: block; }
/* première tuile plus large pour casser la grille */
.tile--0 { grid-column: span 4; }
.tile--1 { grid-column: span 2; }
.tile--2 { grid-column: span 6; }

.tile__frame {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--ink-2);
  aspect-ratio: 4 / 3;
}
.tile--2 .tile__frame { aspect-ratio: 21 / 9; }
.tile__frame img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.7s var(--ease), filter 0.7s var(--ease);
  filter: saturate(0.85);
}
.tile:hover .tile__frame img { transform: scale(1.05); filter: saturate(1.15); }

.tile__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.9rem;
}
.tile__name {
  font-size: var(--step-1);
  color: var(--blush);
  transition: text-shadow 0.3s var(--ease), color 0.3s var(--ease);
}
.tile:hover .tile__name {
  color: var(--rose);
  text-shadow: -3px 0 var(--ghost-cyan), 3px 0 var(--ghost-violet);
}

@media (max-width: 760px) {
  .sel__grid { grid-template-columns: 1fr; }
  .tile, .tile--0, .tile--1, .tile--2 { grid-column: 1 / -1; }
  .tile__frame, .tile--2 .tile__frame { aspect-ratio: 4 / 3; }
}
</style>
