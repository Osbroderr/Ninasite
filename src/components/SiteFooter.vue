<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__lead">
        <p class="eyebrow">Let's make something glow</p>
        <a class="footer__mail" href="mailto:gailnina@orange.fr">gailnina@orange.fr</a>
      </div>

      <div class="footer__cols">
        <div class="footer__col">
          <span class="meta">Index</span>
          <router-link class="link" to="/work">Work</router-link>
          <router-link class="link" to="/shorts">Shorts</router-link>
          <router-link class="link" to="/about">About</router-link>
        </div>
        <div class="footer__col">
          <span class="meta">Elsewhere</span>
          <a class="link" href="https://www.instagram.com/vjninadj/" target="_blank" rel="noopener">Instagram</a>
          <a class="link" href="mailto:gailnina@orange.fr">Email</a>
        </div>
      </div>
    </div>

    <div class="container footer__base">
      <span class="meta">© {{ year }} Nina Gaillard</span>
      <button class="footer__top meta" @click="toTop">Back to top ↑</button>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--ink-line);
  padding-block: clamp(3rem, 7vw, 6rem) 2rem;
  margin-top: clamp(4rem, 10vw, 8rem);
}
.footer__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2.5rem;
}
.footer__lead { max-width: 30ch; }
.footer__mail {
  display: inline-block;
  margin-top: 0.6rem;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 1rem + 4vw, 3.4rem);
  color: var(--blush);
  line-height: 1;
  transition: color 0.3s var(--ease);
  word-break: break-word;
}
.footer__mail:hover { color: var(--rose); }

.footer__cols { display: flex; gap: clamp(2.5rem, 6vw, 5rem); }
.footer__col { display: flex; flex-direction: column; gap: 0.7rem; }
.footer__col .meta { margin-bottom: 0.3rem; }

.footer__base {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: clamp(3rem, 7vw, 5rem);
  padding-top: 1.4rem;
  border-top: 1px solid var(--ink-line);
}
.footer__top { color: var(--muted); transition: color 0.3s var(--ease); }
.footer__top:hover { color: var(--rose); }

@media (max-width: 600px) {
  .footer__cols { width: 100%; justify-content: flex-start; }
}
</style>
