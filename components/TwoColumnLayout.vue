<template>
    <div class="two-column-layout" :class="[`gap-${gap}`, { 'reverse': reverse }]">
      <div class="column left-column" :style="{ flex: leftWidth }">
        <slot name="left"></slot>
      </div>
      <div class="column right-column" :style="{ flex: rightWidth }">
        <slot name="right"></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    // Column width ratio (left:right)
    leftWidth: {
      type: [String, Number],
      default: 1
    },
    rightWidth: {
      type: [String, Number],
      default: 1
    },
    // Gap between columns (1-6)
    gap: {
      type: [String, Number],
      default: 4,
      validator: (value) => {
        const num = parseInt(value);
        return num >= 1 && num <= 6;
      }
    },
    // Reverse the order on mobile (right column appears first)
    reverse: {
      type: Boolean,
      default: false
    }
  });
  </script>
  
  <style scoped>
  .two-column-layout {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  @media (min-width: 768px) {
    .two-column-layout {
      flex-direction: row;
    }
  }
  
  .column {
    width: 100%;
  }
  
  /* Gap sizes */
  .gap-1 {
    gap: 0.5rem;
  }
  
  .gap-2 {
    gap: 1rem;
  }
  
  .gap-3 {
    gap: 1.5rem;
  }
  
  .gap-4 {
    gap: 2rem;
  }
  
  .gap-5 {
    gap: 3rem;
  }
  
  .gap-6 {
    gap: 4rem;
  }
  
  /* Mobile ordering */
  @media (max-width: 767px) {
    .two-column-layout.reverse .left-column {
      order: 2;
    }
    
    .two-column-layout.reverse .right-column {
      order: 1;
    }
    
    .column {
      margin-bottom: var(--gap, 2rem);
    }
    
    .column:last-child {
      margin-bottom: 0;
    }
  }
  </style>