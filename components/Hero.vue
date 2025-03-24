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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32" style="display: block;">
            <path d="M 50 10 C 60 30, 70 40, 90 50 C 70 60, 60 70, 50 90 C 40 70, 30 60, 10 50 C 30 40, 40 30, 50 10 Z" 
                  fill="#BC9C76" />
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
  margin-top: var(--header-height, 100px);
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
  width: 100%;
  z-index: 1;
  transition: transform 0.3s ease, width 0.3s ease;
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
  font-size: 12rem; /* Increased from 8rem to 12rem */
  font-weight: 900;
  color: #fff;
  z-index: 0;
  opacity: 0;
  animation: fadeUp 1.2s ease forwards;
  animation-delay: 0.9s;
}

.last-name {
  font-size: 14rem; /* Increased from 10rem to 14rem */
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

/* Media Queries - Mobile First Approach */
/* Default is now mobile, and we scale UP to desktop */

/* Tablet */
@media (min-width: 768px) {
  .first-name {
    font-size: 16rem; /* Adjusted for smoother progression */
  }
  
  .last-name {
    font-size: 18rem; /* Adjusted for smoother progression */
  }
  
  .portrait-overlay {
    width: 90%;
  }
  
  .star-icon svg {
    width: 35px;
    height: 35px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .first-name {
    font-size: 22rem;
  }
  
  .last-name {
    font-size: 22rem;
  }
  
  .portrait-overlay {
    width: 80%;
  }
  
  .star-icon svg {
    width: 40px;
    height: 40px;
  }
}

/* Small mobile adjustments */
@media (max-width: 480px) {
  .first-name {
    font-size: 10rem; /* Already increased from 6rem to 10rem */
  }
  
  .last-name {
    font-size: 12rem; /* Already increased from 8rem to 12rem */
  }
  
  .hero-wrapper {
    min-height: 80vh;
  }
  
  /* Increase the portrait overlay size for mobile */
  .portrait-overlay {
    width: 120%; /* Increase from 95% to 110% to make it larger on mobile */
    max-width: none; /* Remove any max-width constraints */
    transform: translate(-50%, -50%) scale(1.15); /* Scale up the image */
  }
}
</style>