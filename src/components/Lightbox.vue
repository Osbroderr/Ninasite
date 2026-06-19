<template>
  <transition name="lb">
    <div
      v-if="modelValue !== null"
      class="lb"
      @click.self="close"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <button class="lb__close" aria-label="Close" @click="close">×</button>
      <button class="lb__nav lb__nav--prev" aria-label="Previous" @click.stop="prev">‹</button>

      <figure class="lb__stage">
        <img :src="images[index]" :alt="`Image ${index + 1}`" />
        <figcaption class="meta">{{ index + 1 }} / {{ images.length }}</figcaption>
      </figure>

      <button class="lb__nav lb__nav--next" aria-label="Next" @click.stop="next">›</button>
    </div>
  </transition>
</template>

<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  images: { type: Array, required: true },
  modelValue: { type: Number, default: null }, // index courant ou null = fermé
})
const emit = defineEmits(['update:modelValue'])

const index = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

function close() { emit('update:modelValue', null) }
function next() { index.value = (index.value + 1) % props.images.length }
function prev() { index.value = (index.value - 1 + props.images.length) % props.images.length }

function onKey(e) {
  if (props.modelValue === null) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

let startX = 0
function onTouchStart(e) { startX = e.changedTouches[0].clientX }
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - startX
  if (Math.abs(dx) > 50) (dx < 0 ? next() : prev())
}

watch(() => props.modelValue, (v) => {
  document.body.style.overflow = v !== null ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.lb {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: color-mix(in srgb, var(--ink) 94%, black);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: clamp(1rem, 4vw, 3rem);
}
.lb__stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
}
.lb__stage img {
  max-width: min(92vw, 1400px);
  max-height: 82vh;
  object-fit: contain;
  border-radius: var(--radius);
}
.lb__close {
  position: absolute;
  top: clamp(1rem, 3vw, 2rem);
  right: clamp(1rem, 3vw, 2rem);
  font-size: 2.6rem;
  line-height: 1;
  color: var(--blush);
  transition: color 0.25s var(--ease), transform 0.25s var(--ease);
}
.lb__close:hover { color: var(--rose); transform: rotate(90deg); }
.lb__nav {
  font-size: clamp(2.4rem, 6vw, 4rem);
  color: var(--blush);
  padding: 0 0.4em;
  transition: color 0.25s var(--ease), transform 0.25s var(--ease);
  z-index: 1;
}
.lb__nav:hover { color: var(--rose); }
.lb__nav--prev:hover { transform: translateX(-4px); }
.lb__nav--next:hover { transform: translateX(4px); }

.lb-enter-active, .lb-leave-active { transition: opacity 0.3s var(--ease); }
.lb-enter-from, .lb-leave-to { opacity: 0; }

@media (max-width: 600px) {
  .lb { grid-template-columns: 1fr; }
  .lb__nav { position: absolute; top: 50%; transform: translateY(-50%); }
  .lb__nav--prev { left: 0; }
  .lb__nav--next { right: 0; }
}
</style>
