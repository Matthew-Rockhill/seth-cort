<template>
  <div class="ticker-wrapper">
    <div class="image-ticker-container">
      <!-- Left fade gradient -->
      <div class="fade-overlay fade-left"></div>
      
      <!-- Ticker content -->
      <div 
        class="image-ticker"
        :style="{ transform: `translateX(-${tickerPosition}px)` }"
        ref="tickerRef"
      >
        <div v-for="(image, index) in duplicatedImages" :key="`image-${index}`" class="ticker-item">
          <img :src="image.src" :alt="image.alt" />
        </div>
      </div>
      
      <!-- Right fade gradient -->
      <div class="fade-overlay fade-right"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  speed: {
    type: Number,
    default: 1 // Pixels per frame
  },
  autoplay: {
    type: Boolean,
    default: true
  }
});

// Images with correct filenames
const images = [
  { src: '/images/Seth_Cort_PR_(3).JPG', alt: '' },
  { src: '/images/Seth_Cort_PR_(4).jpeg', alt: '' },
  { src: '/images/Seth_Cort_PR_(5).jpg', alt: '' },
  { src: '/images/Seth_Cort_PR_(6).JPG', alt: '' },
  { src: '/images/Seth_Cort_PR_(9).jpg', alt: '' },
  { src: '/images/Seth_Cort_PR_(14).jpg', alt: '' },
  { src: '/images/Seth_Cort_PR_(15).jpg', alt: '' },
  { src: '/images/Seth_Cort_PR_(2).jpg', alt: '' }
];

// Duplicate images to create infinite scroll effect
const duplicatedImages = computed(() => [...images, ...images]);

const tickerPosition = ref(0);
const tickerRef = ref(null);
const tickerWidth = ref(0);
const singleSetWidth = ref(0);
let animationFrameId = null;

// Animation function
const animate = () => {
  if (!props.autoplay) return;
  
  tickerPosition.value += props.speed;
  
  // Reset position when first set of images is completely scrolled
  if (tickerPosition.value >= singleSetWidth.value) {
    tickerPosition.value = 0;
  }
  
  animationFrameId = requestAnimationFrame(animate);
};

// Initialize sizes and start animation
onMounted(() => {
  // Calculate sizes
  if (tickerRef.value) {
    tickerWidth.value = tickerRef.value.scrollWidth;
    singleSetWidth.value = tickerWidth.value / 2; // Half because we duplicated the images
  }
  
  // Start animation
  animationFrameId = requestAnimationFrame(animate);
});

// Clean up
onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
/* Wrapper for full-width effect */
.ticker-wrapper {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background-color: #121212;
}

.image-ticker-container {
  position: relative;
  overflow: hidden;
  /* Using transparent background to avoid color matching issues */
  background-color: transparent;
  padding: 2rem 0;
  max-width: 100%;
}

/* Ticker styling */
.image-ticker {
  display: flex;
  transition: transform 0.1s linear;
  white-space: nowrap;
}

.ticker-item {
  flex-shrink: 0;
  padding: 0 1rem;
}

.ticker-item img {
  height: 500px;
  width: auto;
  object-fit: cover;
}

/* Fade overlay elements */
.fade-overlay {
  position: absolute;
  top: 0;
  height: 100%;
  width: 25%; /* Wider fade effect */
  z-index: 10;
  pointer-events: none; /* Allow clicks to pass through */
}

.fade-left {
  left: 0;
  background: linear-gradient(to right, #121212 0%, rgba(18, 18, 18, 0) 100%);
}

.fade-right {
  right: 0;
  background: linear-gradient(to left, #121212 0%, rgba(18, 18, 18, 0) 100%);
}
</style>