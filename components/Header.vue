<template>
  <header class="header" :class="{ 'scrolled': isScrolled }">
    <div class="header-content">
      <div class="logo">
        <!-- Logo with fallback -->
        <a href="/">
          <img v-if="logoUrl" :src="logoUrl" alt="Seth Cort" />
          <span v-else class="logo-text">Seth Cort</span>
        </a>
      </div>
      
      <div class="menu" style="position: relative;">
        <button @click="toggleMenu" class="hamburger" :class="{ 'is-active': isOpen }">
          <span class="line line-top"></span>
          <span class="line line-middle"></span>
          <span class="line line-bottom"></span>
        </button>
      </div>
    </div>
    
    <!-- Slide-Out Menu -->
    <div class="slide-menu" :class="{ 'is-open': isOpen }">
      <div class="slide-menu-header">
        <button @click="closeMenu" class="close-button">
          <XMarkIcon class="close-icon" />
          <span>Close</span>
        </button>
      </div>
      
      <nav class="slide-menu-nav">
        <ul>
          <li v-for="(item, index) in navItems" :key="index">
            <a :href="item.url" @click="closeMenu">{{ item.text }}</a>
          </li>
        </ul>
      </nav>
      
      <div class="social-links">
        <a href="https://instagram.com/seth.cort" target="_blank" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="social-icon">
            <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
          </svg>
        </a>
        <a href="https://x.com/seth_cort" target="_blank" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="social-icon">
            <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5549 21H20.7996L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
          </svg>
        </a>
        <a href="https://youtube.com/@seth.cort." target="_blank" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="social-icon">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>
      </div>
    </div>
    
    <!-- Overlay Background when menu is open -->
    <div class="menu-overlay" :class="{ 'is-visible': isOpen }" @click="closeMenu"></div>
  </header>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  logoUrl: {
    type: String,
    default: '/images/logo.png'
  },
  navItems: {
    type: Array,
    default: () => [
      { text: 'About', url: '#about' },
      { text: 'Discovery', url: '#discovery' },
      { text: 'Performance', url: '#performance' },
      { text: 'Contact', url: '#contact' }
    ]
  }
});

const isOpen = ref(false);
const isScrolled = ref(false);

// Handle scroll event to add shadow when scrolled
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

// Add and remove scroll event listener
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  
  // Set initial header height as CSS variable
  const headerHeight = document.querySelector('.header').offsetHeight;
  document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function toggleMenu() {
  isOpen.value = !isOpen.value;
  
  // Prevent scrolling when menu is open
  if (isOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeMenu() {
  isOpen.value = false;
  document.body.style.overflow = '';
}
</script>
  
<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(18, 18, 18, 0.9);
  backdrop-filter: blur(8px);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  height: var(--header-height, 100px); /* Use the variable here */
}

.header-content {
  max-width: var(--content-max-width, 1280px);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.5rem;
  height: 100%;
}

.logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo img {
  height: 70px;
  width: auto;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent-color, #BC9C76);
}

/* Hamburger Menu Button */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
  position: relative;
}

.hamburger .line {
  height: 2px;
  background-color: #fff;
  transition: all 0.3s ease;
  position: absolute;
  transform-origin: center;
  left: 0;
}

.line-top {
  width: 100%;
  top: 0;
}

.line-middle {
  width: 70%;
  top: 50%;
  transform: translateY(-50%);
}

.line-bottom {
  width: 100%;
  bottom: 0;
}

/* Hover effect - all lines become the same length */
.hamburger:hover .line-middle {
  width: 100%;
}

/* Active state (when menu is open) */
.hamburger.is-active .line-top {
  transform: rotate(45deg);
  top: 9px;
}

.hamburger.is-active .line-middle {
  opacity: 0;
  width: 0;
}

.hamburger.is-active .line-bottom {
  transform: rotate(-45deg);
  bottom: 9px;
}

/* Slide-Out Menu */
.slide-menu {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100vh;
  background-color: #0a0a0a;
  z-index: 1002;
  transition: right 0.3s ease;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.slide-menu.is-open {
  right: 0;
}

.slide-menu-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: flex-end;
}

.close-button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0;
}

.close-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.slide-menu-nav {
  flex: 1;
  padding: 2rem 0;
  overflow-y: auto;
}

.slide-menu-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.slide-menu-nav li {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.slide-menu-nav a {
  display: block;
  font-size: 1.3rem;
  color: #fff;
  text-decoration: none;
  padding: 1rem 2rem;
  transition: all 0.2s ease;
}

.slide-menu-nav a:hover {
  color: var(--accent-color, #BC9C76);
  background-color: rgba(255, 255, 255, 0.05);
  padding-left: 2.5rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.social-link {
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s ease;
}

.social-icon {
  width: 24px;
  height: 24px;
}

.social-link:hover {
  color: var(--accent-color, #BC9C76);
}

/* Dark overlay behind the menu when it's open */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.menu-overlay.is-visible {
  visibility: visible;
  opacity: 1;
}

/* Responsive styles */
@media (min-width: 768px) {
  .header-content {
    padding: 1rem 2rem;
  }
  
  .logo img {
    height: 70px;
  }
}

/* Add a shadow when scrolling for better visual separation */
.header.scrolled {
  background-color: rgba(10, 10, 10, 0.95);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>