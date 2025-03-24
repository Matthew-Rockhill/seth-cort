// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Seth Cort | Folk Singer-Songwriter',
      meta: [
        // Basic meta
        { name: 'description', content: 'Seth Cort is a folk singer-songwriter from Cape Town, South Africa, weaving folk traditions with modern storytelling through emotionally resonant music.' },
        { name: 'keywords', content: 'Seth Cort, folk music, singer-songwriter, Cape Town, South Africa, acoustic music' },
        { name: 'author', content: 'Seth Cort' },
        
        // Google verification (replace with your code)
        { name: 'google-site-verification', content: 'YOUR_VERIFICATION_CODE' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.sethcort.com' },
        { property: 'og:title', content: 'Seth Cort | Folk Singer-Songwriter' },
        { property: 'og:description', content: 'Folk singer-songwriter from Cape Town weaving traditional folk with contemporary storytelling.' },
        { property: 'og:image', content: 'https://www.sethcort.com/images/seth-cort-social-share.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://www.sethcort.com' },
        { name: 'twitter:title', content: 'Seth Cort | Folk Singer-Songwriter' },
        { name: 'twitter:description', content: 'Folk singer-songwriter from Cape Town weaving traditional folk with contemporary storytelling.' },
        { name: 'twitter:image', content: 'https://www.sethcort.com/images/seth-cort-social-share.jpg' },
        
        // Theme colors
        { name: 'msapplication-TileColor', content: '#121212' },
        { name: 'theme-color', content: '#121212' }
      ],
      link: [
        // Canonical
        { rel: 'canonical', href: 'https://www.sethcort.com' },
        
        // Favicon
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      script: [
        // Schema.org structured data for a musician
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicGroup",
            "name": "Seth Cort",
            "image": "https://www.sethcort.com/images/seth-cort-social-share.jpg",
            "url": "https://www.sethcort.com",
            "genre": ["Folk", "Singer-Songwriter"],
            "description": "Folk singer-songwriter from Cape Town, South Africa, weaving folk traditions with modern storytelling."
          })
        },
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-1S5DX076W1',
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1S5DX076W1');
          `,
          type: 'text/javascript'
        }
      ]
    }
  }
})