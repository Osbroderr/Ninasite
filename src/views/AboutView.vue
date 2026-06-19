<template>
  <main class="about container">
    <div class="about__grid">
      <div class="about__col about__text">
        <p class="eyebrow" data-reveal>About</p>
        <h1 class="about__hi" data-reveal>Hey, I'm Nina.</h1>

        <div class="about__body" data-reveal>
          <p>
            Nice to meet you. Right now I'm building an installation made of
            photographs, video and sound.
          </p>
          <p>
            I studied theatre, then a BTS Audiovisuel in image, where I learned
            the technical craft of filmmaking. After that I worked in a structure
            for refugees, running art workshops and putting together an exhibition
            with them.
          </p>
          <p>
            Now I'm finishing a master's at IMAC — digital art, web design,
            programming, 3D and installation.
          </p>
        </div>

        <div class="about__cv" data-reveal>
          <a class="pill" :href="asset('about/cvNina.pdf')" download>CV (FR) ↓</a>
          <a class="pill" :href="asset('about/resumeNina.pdf')" download>Resume (EN) ↓</a>
        </div>
      </div>

      <aside class="about__col about__side" data-reveal>
        <div class="about__portrait">
          <img :src="asset('about/nina.png')" alt="Nina Gaillard" />
        </div>
        <div class="about__contact">
          <a class="link" href="mailto:gailnina@orange.fr">gailnina@orange.fr</a>
          <a class="link" href="https://www.instagram.com/vjninadj/" target="_blank" rel="noopener">@vjninadj</a>
        </div>
      </aside>
    </div>
  </main>
</template>

<script setup>
import { asset } from '../lib/asset.js'
</script>

<style scoped>
.about { padding-top: clamp(7rem, 16vh, 11rem); }
.about__grid {
  display: grid;
  grid-template-columns: 1.3fr 0.8fr;
  gap: clamp(2.5rem, 7vw, 6rem);
  align-items: start;
}

.about__hi {
  font-size: clamp(2.6rem, 1.4rem + 6vw, 6rem);
  color: var(--blush);
  margin: 0.5rem 0 1.8rem;
  line-height: 0.92;
}
.about__body { display: flex; flex-direction: column; gap: 1.1rem; max-width: 46ch; }
.about__body p { font-size: var(--step-1); color: var(--paper); }

.about__cv { display: flex; flex-wrap: wrap; gap: 0.9rem; margin-top: 2.2rem; }

.about__side { position: sticky; top: 6rem; display: flex; flex-direction: column; gap: 1.4rem; }
.about__portrait {
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--ink-2);
}
.about__portrait img {
  width: 100%;
  display: block;
  filter: saturate(0.9);
  transition: filter 0.6s var(--ease), transform 0.6s var(--ease);
}
.about__portrait:hover img { filter: saturate(1.15); transform: scale(1.02); }

.about__contact { display: flex; flex-direction: column; gap: 0.5rem; font-family: var(--font-mono); letter-spacing: 0.06em; }

@media (max-width: 820px) {
  .about__grid { grid-template-columns: 1fr; }
  .about__side { position: static; max-width: 360px; }
}
</style>
