<template>
    <section :id="id" class="section-layout" :class="[bgColor, { 'no-padding': noPadding }]">
      <div class="section-content">
        <slot></slot>
      </div>
    </section>
  </template>
  
  <script setup>
  defineProps({
    id: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: 'bg-default' // Options: bg-default, bg-dark, bg-accent
    },
    noPadding: {
      type: Boolean,
      default: false
    }
  });
  </script>
  
  <style scoped>
  .section-layout {
    width: 100%;
    padding: 48px 16px; /* Mobile padding */
  }
  
  .section-layout.no-padding {
    padding: 0;
  }
  
  .section-content {
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
  }
  
  /* Background color variations */
  .bg-default {
    background-color: var(--color-bg, #121212);
  }
  
  .bg-dark {
    background-color: #0a0a0a;
  }
  
  .bg-accent {
    background-color: rgba(188, 156, 118, 0.1);
  }
  
  /* Desktop padding */
  @media (min-width: 768px) {
    .section-layout {
      padding: 96px 24px;
    }
  }
  </style>