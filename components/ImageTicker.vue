<template>
  <div class="image-ticker-container">
    <div class="image-ticker" :style="{ '--speed': speed + 's' }">
      <div class="image-track">
        <div 
          v-for="(image, index) in duplicatedImages" 
          :key="`${image.src}-${index}`"
          class="image-item"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            loading="lazy"
            class="ticker-image"
            @load="handleImageLoad"
            @error="handleImageError"
            decoding="async"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  speed: {
    type: Number,
    default: 1.5
  }
})

const loadedImages = ref(0)
const totalImages = computed(() => props.images.length)

// Duplicate images for seamless scrolling
const duplicatedImages = computed(() => {
  const duplicateCount = Math.ceil(window?.innerWidth / 200) || 10
  const duplicated = []
  
  for (let i = 0; i < duplicateCount; i++) {
    duplicated.push(...props.images)
  }
  
  return duplicated
})

const handleImageLoad = () => {
  loadedImages.value++
}

const handleImageError = (event) => {
  console.warn('Failed to load image:', event.target.src)
}

onMounted(() => {
  // Preload the first few images for better perceived performance
  const imagesToPreload = props.images.slice(0, 3)
  imagesToPreload.forEach(image => {
    const img = new Image()
    img.src = image.src
  })
})
</script>

<style scoped>
.image-ticker-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 200px;
  /* Optimize for better performance */
  contain: layout style;
  will-change: transform;
}

.image-ticker {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.image-track {
  display: flex;
  align-items: center;
  height: 100%;
  animation: scroll var(--speed) linear infinite;
  /* Optimize for better performance */
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.image-item {
  flex-shrink: 0;
  width: 200px;
  height: 100%;
  margin-right: 1rem;
  /* Optimize for better performance */
  contain: layout style;
}

.ticker-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  /* Optimize image rendering */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  transition: opacity 0.3s ease;
  decoding: async;
}

.ticker-image:hover {
  opacity: 0.8;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* Pause animation on hover for better UX */
.image-ticker-container:hover .image-track {
  animation-play-state: paused;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .image-ticker-container {
    height: 150px;
  }
  
  .image-item {
    width: 150px;
    margin-right: 0.5rem;
  }
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .image-track {
    animation: none !important;
  }
}
</style>