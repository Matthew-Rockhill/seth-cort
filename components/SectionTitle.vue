<template>
  <div class="section-title-wrapper">
    <!-- Title on the left -->
    <h2 class="title">{{ title }}</h2>
  
    <!-- Line container -->
    <div class="line-container">
      <div class="line-gray"></div>
      <div class="line-accent"></div>
      <div class="greater-than"></div>
    </div>
  </div>
</template>
  
<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
  
<style scoped>
/* Overall layout */
.section-title-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  width: 100%;
}
  
/* Title styling */
.title {
  margin: 0 1.5rem 0 0;
  font-size: 2rem;
  color: var(--accent-color, #BC9C76);
  text-transform: uppercase;
  white-space: nowrap;
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 700;
  line-height: 1;
}
  
/* The container for the line segments and arrow */
.line-container {
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 1;
  height: 4px;
}
  
/* Grey segment */
.line-gray {
  flex-grow: 1;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  margin-right: 0;
  transition: margin-right 0.3s ease;
}
  
/* Accent segment */
.line-accent {
  width: 60px;
  height: 100%;
  background-color: var(--accent-color, #BC9C76);
  transition: width 0.3s ease, margin-right 0.3s ease;
  margin-right: 0;
}

/* Greater than sign */
.greater-than {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 14px; 
  height: 28px; /* Increased height to accommodate wider angle */
  opacity: 0;
  transition: opacity 0.3s ease;
}

.greater-than::before,
.greater-than::after {
  content: "";
  position: absolute;
  background: var(--accent-color, #BC9C76);
  width: 16px; /* Slightly longer lines for bigger arrow */
  height: 4px;
  left: 0;
  transform-origin: left center;
}

.greater-than::before {
  top: 2px;
  transform: rotate(45deg); /* Increased angle */
}

.greater-than::after {
  bottom: 2px;
  transform: rotate(-45deg); /* Increased angle */
}
  
/* Hover state effects */
.section-title-wrapper:hover .line-gray {
  margin-right: 24px;
}

.section-title-wrapper:hover .line-accent {
  width: 150px;
  margin-right: 24px;
}
  
.section-title-wrapper:hover .greater-than {
  opacity: 1;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
}
</style>