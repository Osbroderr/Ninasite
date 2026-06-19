<template>
  <main class="shorts container">
    <header class="shorts__head">
      <p class="eyebrow" data-reveal>Vertical / {{ String(shorts.length).padStart(2, '0') }}</p>
      <h1 class="shorts__title" data-reveal>Shorts</h1>
      <p class="shorts__intro" data-reveal>Quick cuts and experiments, made for the small screen.</p>
    </header>

    <div class="rail" ref="rail">
      <article v-for="(s, i) in shorts" :key="s.id" class="short" data-reveal>
        <div class="short__screen">
          <iframe
            :src="`https://www.youtube.com/embed/${s.id}?rel=0&modestbranding=1`"
            :title="s.name"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="short__label">
          <span class="meta">{{ String(i + 1).padStart(2, '0') }}</span>
          <h2 class="short__name">{{ s.name }}</h2>
        </div>
      </article>
    </div>

    <div class="rail__nav">
      <button class="rail__btn" aria-label="Previous" @click="scroll(-1)">‹</button>
      <button class="rail__btn" aria-label="Next" @click="scroll(1)">›</button>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { shorts } from '../lib/projects.js'

const rail = ref(null)
function scroll(dir) {
  const el = rail.value
  if (!el) return
  el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.7, 420), behavior: 'smooth' })
}
</script>

<style scoped>
.shorts { padding-top: clamp(7rem, 16vh, 11rem); }
.shorts__head { margin-bottom: clamp(2.5rem, 6vw, 4rem); }
.shorts__title { font-size: var(--display); color: var(--blush); margin: 0.4rem 0 1rem; line-height: 0.9; }
.shorts__intro { color: var(--muted); max-width: 40ch; }

.rail {
  display: flex;
  gap: clamp(1rem, 3vw, 2rem);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 1rem;
  /* déborde des gouttières pour un effet plein cadre */
  margin-inline: calc(var(--gutter) * -1);
  padding-inline: var(--gutter);
}
.rail::-webkit-scrollbar { height: 4px; }

.short {
  flex: 0 0 auto;
  width: min(78vw, 320px);
  scroll-snap-align: start;
}
.short__screen {
  position: relative;
  aspect-ratio: 9 / 16;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--ink-2);
  border: 1px solid var(--ink-line);
}
.short__screen iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

.short__label { display: flex; align-items: baseline; gap: 0.8rem; margin-top: 0.9rem; }
.short__name { font-size: var(--step-1); color: var(--blush); }

.rail__nav { display: flex; gap: 0.8rem; margin-top: 1.6rem; }
.rail__btn {
  width: 46px; height: 46px;
  border: 1px solid var(--ink-line);
  border-radius: 99px;
  color: var(--blush);
  font-size: 1.5rem;
  line-height: 1;
  transition: border-color 0.3s var(--ease), color 0.3s var(--ease), background 0.3s var(--ease);
}
.rail__btn:hover { border-color: var(--blush); color: var(--ink); background: var(--blush); }

@media (max-width: 600px) { .rail__nav { display: none; } }
</style>
