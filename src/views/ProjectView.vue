<template>
  <main v-if="project" class="project container">
    <router-link to="/work" class="link project__back">← All work</router-link>

    <header class="project__head">
      <p class="eyebrow" data-reveal>{{ project.medium.join(' / ') }}</p>
      <h1 class="project__title" data-reveal>{{ project.title }}</h1>

      <div class="project__info">
        <p class="project__summary" data-reveal>{{ project.summary }}</p>
        <dl class="project__meta" data-reveal>
          <div><dt class="meta">Year</dt><dd>{{ project.year }}</dd></div>
          <div><dt class="meta">Medium</dt><dd>{{ project.medium.join(', ') }}</dd></div>
          <div v-if="project.credits"><dt class="meta">With</dt><dd>{{ project.credits.replace(/^with /, '') }}</dd></div>
        </dl>
      </div>
    </header>

    <!-- Blocs -->
    <div class="blocks">
      <section
        v-for="(block, bi) in project.blocks"
        :key="bi"
        class="block"
        data-reveal
      >
        <h2 v-if="block.title" class="block__title">{{ block.title }}</h2>

        <!-- Vidéo -->
        <div v-if="block.type === 'video'" class="video">
          <iframe
            :src="`https://www.youtube.com/embed/${block.id}?rel=0&modestbranding=1`"
            :title="project.title"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <!-- Galerie -->
        <div v-else-if="block.type === 'gallery'" class="gallery">
          <button
            v-for="(img, i) in block.images"
            :key="img"
            class="gallery__item"
            :class="{ 'is-static': !block.lightbox }"
            :disabled="!block.lightbox"
            @click="block.lightbox && open(block.images, i)"
          >
            <img :src="asset(img)" :alt="`${project.title} — ${i + 1}`" loading="lazy" />
          </button>
        </div>
      </section>
    </div>

    <!-- Projet suivant -->
    <router-link :to="`/work/${next.slug}`" class="next" data-reveal>
      <span class="meta">Next project</span>
      <span class="next__name">{{ next.title }}</span>
      <span class="next__arrow">→</span>
    </router-link>

    <Lightbox v-model="lbIndex" :images="lbImages" />
  </main>

  <NotFound v-else />
</template>

<script setup>
import { ref, computed } from 'vue'
import { projects, getProject } from '../lib/projects.js'
import { asset } from '../lib/asset.js'
import Lightbox from '../components/Lightbox.vue'
import NotFound from './NotFound.vue'

const props = defineProps({ slug: String })

const project = computed(() => getProject(props.slug))
const next = computed(() => {
  const i = projects.findIndex((p) => p.slug === props.slug)
  return projects[(i + 1) % projects.length]
})

const lbImages = ref([])
const lbIndex = ref(null)
function open(images, i) {
  lbImages.value = images.map(asset)
  lbIndex.value = i
}
</script>

<style scoped>
.project { padding-top: clamp(6.5rem, 14vh, 10rem); }
.project__back {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  letter-spacing: 0.1em;
  display: inline-block;
  margin-bottom: clamp(2rem, 5vw, 4rem);
}

.project__title {
  font-size: var(--display);
  color: var(--blush);
  margin: 0.6rem 0 clamp(2rem, 5vw, 3.5rem);
  line-height: 0.88;
}

.project__info {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: clamp(1.5rem, 5vw, 5rem);
  align-items: start;
  padding-bottom: clamp(2.5rem, 6vw, 4.5rem);
  border-bottom: 1px solid var(--ink-line);
}
.project__summary { font-size: var(--step-1); color: var(--paper); max-width: 52ch; }
.project__meta { display: flex; flex-direction: column; gap: 1.1rem; }
.project__meta dt { margin-bottom: 0.2rem; letter-spacing: 0.18em; }
.project__meta dd { color: var(--blush); font-family: var(--font-mono); font-size: 0.95rem; }

/* Blocs */
.blocks { margin-top: clamp(3rem, 7vw, 5.5rem); display: flex; flex-direction: column; gap: clamp(3rem, 8vw, 6rem); }
.block__title {
  font-size: var(--step-2);
  color: var(--blush);
  margin-bottom: 1.4rem;
}

.video {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--ink-2);
}
.video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: clamp(0.8rem, 2vw, 1.4rem);
}
.gallery__item {
  display: block;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--ink-2);
  aspect-ratio: 3 / 2;
}
.gallery__item img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.7s var(--ease), filter 0.7s var(--ease);
}
.gallery__item:not(.is-static) { cursor: zoom-in; }
.gallery__item:not(.is-static):hover img { transform: scale(1.05); filter: saturate(1.15); }
.gallery__item.is-static { cursor: default; }

/* Next */
.next {
  display: flex;
  align-items: baseline;
  gap: 1.2rem;
  flex-wrap: wrap;
  margin-top: clamp(3.5rem, 9vw, 6rem);
  padding-top: clamp(2rem, 5vw, 3rem);
  border-top: 1px solid var(--ink-line);
  transition: color 0.3s var(--ease);
}
.next__name {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 1rem + 6vw, 5rem);
  color: var(--blush);
  line-height: 1;
  transition: color 0.3s var(--ease), text-shadow 0.3s var(--ease);
}
.next__arrow { font-size: var(--step-2); color: var(--rose); transition: transform 0.3s var(--ease); }
.next:hover .next__name { color: var(--rose); text-shadow: -3px 0 var(--ghost-cyan), 3px 0 var(--ghost-violet); }
.next:hover .next__arrow { transform: translateX(10px); }

@media (max-width: 720px) {
  .project__info { grid-template-columns: 1fr; gap: 2rem; }
}
</style>
