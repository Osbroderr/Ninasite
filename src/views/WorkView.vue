<template>
  <main class="work container">
    <header class="work__head">
      <p class="eyebrow" data-reveal>Index / {{ String(projects.length).padStart(2, '0') }}</p>
      <h1 class="work__title" data-reveal>Work</h1>
      <p class="work__intro" data-reveal>
        Installations, live visuals and photographs. Each piece is a way of
        making light behave.
      </p>
    </header>

    <div class="grid">
      <router-link
        v-for="(p, i) in projects"
        :key="p.slug"
        :to="`/work/${p.slug}`"
        class="card"
        :style="cardStyle(i)"
        data-reveal
      >
        <div class="card__frame" :style="{ aspectRatio: layouts[i].ratio }">
          <img :src="asset(p.cover)" :alt="p.title" loading="lazy" />
          <span class="card__idx meta">{{ String(i + 1).padStart(2, '0') }}</span>
        </div>
        <div class="card__row">
          <h2 class="card__name">{{ p.title }}</h2>
          <span class="meta card__medium">{{ p.medium.join(' · ') }}</span>
        </div>
      </router-link>
    </div>
  </main>
</template>

<script setup>
import { projects } from '../lib/projects.js'
import { asset } from '../lib/asset.js'

// Gabarit éditorial : largeurs et ratios variés pour casser la monotonie.
const layouts = [
  { span: 3, ratio: '4 / 3' },  // racines
  { span: 3, ratio: '4 / 3' },  // title
  { span: 2, ratio: '3 / 4' },  // montage
  { span: 4, ratio: '16 / 9' }, // memoire
  { span: 4, ratio: '16 / 9' }, // cyberpunk
  { span: 2, ratio: '3 / 4' },  // jardin
  { span: 3, ratio: '4 / 3' },  // mapping
  { span: 3, ratio: '4 / 3' },  // concert
]
const cardStyle = (i) => ({ gridColumn: `span ${layouts[i].span}` })
</script>

<style scoped>
.work {
  padding-top: clamp(7rem, 16vh, 11rem);
}
.work__head { margin-bottom: clamp(2.5rem, 6vw, 5rem); max-width: 60ch; }
.work__title {
  font-size: var(--display);
  color: var(--blush);
  margin: 0.4rem 0 1rem;
  line-height: 0.9;
}
.work__intro { color: var(--muted); max-width: 40ch; }

.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: clamp(1rem, 2.2vw, 2.2rem);
}
.card { display: block; }

.card__frame {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--ink-2);
}
.card__frame img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: saturate(0.82) brightness(0.95);
  transition: transform 0.8s var(--ease), filter 0.8s var(--ease);
}
.card:hover .card__frame img { transform: scale(1.06); filter: saturate(1.2) brightness(1.02); }

.card__idx {
  position: absolute;
  top: 0.8rem; left: 0.9rem;
  color: var(--blush);
  mix-blend-mode: difference;
  letter-spacing: 0.2em;
}

.card__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.85rem;
}
.card__name {
  font-size: var(--step-1);
  color: var(--blush);
  transition: color 0.3s var(--ease), text-shadow 0.3s var(--ease);
}
.card:hover .card__name {
  color: var(--rose);
  text-shadow: -3px 0 var(--ghost-cyan), 3px 0 var(--ghost-violet);
}
.card__medium { white-space: nowrap; }

@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .card { grid-column: span 1 !important; }
  .card__frame { aspect-ratio: 4 / 3 !important; }
}
@media (max-width: 520px) {
  .grid { grid-template-columns: 1fr; gap: 2rem; }
  .card__row { flex-direction: column; align-items: flex-start; gap: 0.25rem; }
  .card__medium { white-space: normal; font-size: 0.72rem; }
}
</style>
