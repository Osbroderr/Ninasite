<template>
  <main class="nf container">
    <p class="eyebrow">Signal lost</p>
    <h1 class="nf__code">404</h1>
    <p class="nf__line">This frame dropped out. The page you're after isn't here.</p>
    <router-link to="/work" class="pill">Back to the work →</router-link>
  </main>
</template>

<script setup></script>

<style scoped>
.nf {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.2rem;
  padding-top: 8rem;
}
.nf__code {
  font-size: var(--display);
  color: var(--blush);
  line-height: 0.9;
  text-shadow: -8px 0 var(--ghost-cyan), 8px 0 var(--ghost-violet);
}
.nf__line { color: var(--muted); max-width: 36ch; margin-bottom: 0.8rem; }
</style>
