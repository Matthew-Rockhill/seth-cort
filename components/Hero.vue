<template>
  <section class="hero-wrapper container">
    <div class="hero-content">
      <!-- Group 1: Name and Portrait -->
      <div class="hero-name-group">
        <div class="title-container">
          <h1 class="hero-title first-name">{{ firstName }}</h1>
          <div class="portrait-overlay">
            <img src="/images/SETH_CORT_CutOut.svg" alt="Seth Cort Cutout" />
          </div>
          <h1 class="hero-title last-name">{{ lastName }}</h1>
        </div>
      </div>
      
      <!-- Group 2: Star and Description -->
      <div class="hero-details-group">
        <div v-if="showStar" class="star-icon">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
            <path d="M12,0 L15.09,7.26 L23,8.27 L17.5,13.88 L18.92,21.99 L12,18.27 L5.08,21.99 L6.5,13.88 L1,8.27 L8.91,7.26 L12,0 Z" />
          </svg>
        </div>
        
        <div v-if="description" class="hero-description">{{ description }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  backgroundImage: {
    type: String,
    default: '' 
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  showStar: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped>
.hero-wrapper {
  position: relative;
  min-height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--header-height, 100px); /* Use variable with fallback */
  padding: 48px 0;
}

.hero-content {
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 0 1.5rem;
  max-width: var(--content-max-width, 1280px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Group 1: Name and Portrait */
.hero-name-group {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

/* Title container with image overlay */
.title-container {
  position: relative;
  width: 100%;
  text-align: center;
}

.portrait-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%; 
  z-index: 1;
}

.portrait-overlay img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.hero-title {
  position: relative;
  line-height: 1;
  margin: 0;
  text-transform: uppercase;
}

.first-name {
  font-size: 22rem;
  font-weight: 900;
  color: #fff;
  z-index: 0;
  opacity: 0;
  animation: fadeUp 1.2s ease forwards;
  animation-delay: 0.9s;
}

.last-name {
  font-size: 22rem;
  font-weight: 900;
  color: var(--accent-color, #BC9C76);
  z-index: 2;
  opacity: 0;
  animation: fadeUp 1.2s ease forwards;
  animation-delay: 1.1s;
}

/* Group 2: Star and Description */
.hero-details-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Star icon */
.star-icon {
  margin: 1.5rem auto;
  color: var(--accent-color, #BC9C76);
  animation: pulse 3s ease-in-out infinite;
  opacity: 0;
  animation-delay: 1.3s;
  animation-fill-mode: forwards;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  color: #FFF;
  text-align: center;
  animation: fadeIn 1s ease forwards;
  animation-delay: 1.5s;
  opacity: 0;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .first-name {
    font-size: 6rem;
  }
  
  .last-name {
    font-size: 8rem;
  }
}

@media (max-width: 768px) {
  .first-name {
    font-size: 4rem;
  }
  
  .last-name {
    font-size: 6rem;
  }
  
  .portrait-overlay {
    width: 70%;
  }
  
  .hero-description {
    font-size: 1rem;
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .first-name {
    font-size: 3rem;
  }
  
  .last-name {
    font-size: 4.5rem;
  }
  
  .portrait-overlay {
    width: 60%;
  }
}
</style>