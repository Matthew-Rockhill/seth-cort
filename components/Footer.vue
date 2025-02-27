<template>
    <footer class="site-footer">
      <div class="container">
        
        <!-- Bottom Bar with Copyright -->
        <div class="footer-bottom">
          <div class="copyright">
            &copy; {{ currentYear }} {{ name }}. All rights reserved.
          </div>
          
          <!-- Optional Bottom Links (e.g. Privacy, Terms) -->
          <div class="footer-legal-links" v-if="legalLinks.length > 0">
            <ul>
              <li v-for="link in legalLinks" :key="link.url">
                <a :href="link.url">{{ link.text }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    name: {
      type: String,
      default: 'Seth Cort'
    },
    logo: {
      type: String,
      default: ''
    },
    tagline: {
      type: String,
      default: 'Folk Singer-Songwriter'
    },
    email: {
      type: String,
      default: 'booking@sethcort.com'
    },
    managementEmail: {
      type: String,
      default: 'management@sethcort.com'
    },
    navigation: {
      type: Array,
      default: () => [
        { url: '#about', text: 'About' },
        { url: '#discovery', text: 'Music' },
        { url: '#performance', text: 'Videos' },
        { url: '#contact', text: 'Contact' }
      ]
    },
    socialLinks: {
      type: Array,
      default: () => [
        { platform: 'Instagram', url: 'https://instagram.com/sethcort' },
        { platform: 'Twitter', url: 'https://twitter.com/sethcort' },
        { platform: 'YouTube', url: 'https://youtube.com/sethcort' },
        { platform: 'Spotify', url: 'https://open.spotify.com/artist/sethcort' },
      ]
    },
    legalLinks: {
      type: Array,
      default: () => [
        { url: '/privacy', text: 'Privacy Policy' },
        { url: '/terms', text: 'Terms of Use' }
      ]
    }
  });
  
  const currentYear = computed(() => new Date().getFullYear());
  </script>
  
  <style scoped>
  .site-footer {
    background-color: #0a0a0a;
    padding: 4rem 0 2rem;
    color: var(--color-text-50, rgba(255, 255, 255, 0.5));
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  @media (min-width: 768px) {
    .footer-content {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 992px) {
    .footer-content {
      grid-template-columns: 2fr 1fr 1fr 1fr;
    }
  }
  
  .footer-brand {
    margin-bottom: 1rem;
  }
  
  .footer-logo {
    margin-bottom: 1rem;
  }
  
  .footer-logo img {
    max-height: 50px;
  }
  
  .footer-logo h3 {
    font-size: 1.8rem;
    color: var(--accent-color, #BC9C76);
    margin: 0;
  }
  
  .tagline {
    font-size: 0.9rem;
    color: var(--color-text-30, rgba(255, 255, 255, 0.3));
  }
  
  h4 {
    color: #fff;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    position: relative;
  }
  
  h4::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: var(--accent-color, #BC9C76);
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 0.8rem;
  }
  
  a {
    color: var(--color-text-50, rgba(255, 255, 255, 0.5));
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  a:hover {
    color: var(--accent-color, #BC9C76);
  }
  
  .contact-label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: #fff;
  }
  
  .footer-bottom {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  @media (min-width: 768px) {
    .footer-bottom {
      flex-direction: row;
      justify-content: space-between;
    }
  }
  
  .copyright {
    font-size: 0.9rem;
    color: var(--color-text-30, rgba(255, 255, 255, 0.3));
    margin-bottom: 1rem;
  }
  
  @media (min-width: 768px) {
    .copyright {
      margin-bottom: 0;
    }
  }
  
  .footer-legal-links ul {
    display: flex;
    gap: 1.5rem;
  }
  
  .footer-legal-links a {
    font-size: 0.9rem;
  }
  
  .social-links li {
    margin-bottom: 0.5rem;
  }
  </style>