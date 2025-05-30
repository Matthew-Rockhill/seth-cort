<template>
    <div>
      <!-- Header -->
      <Header />
  
      <!-- Hero Section - No padding needed as it's full height -->
      <Hero 
        firstName="Seth" 
        lastName="Cort"
        description="I'm Seth Cort — a folk singer-songwriter and multi-instrumentalist from CapeTown, South Africa."
        showStar="true"
        showScrollIndicator="true"
        backgroundImage="/images/hero-bg.jpg"
      />
  
      <!-- About Section -->
      <SectionLayout id="about">
        <SectionTitle title="About" />
        <TwoColumnLayout leftWidth="2" rightWidth="3" gap="5">
          <template #left>
            <div class="about-content">
              <p class="lead-text">
                My artistry lies in weaving folk traditions with modern storytelling, crafting emotionally resonant songs that bridge authenticity and musical innovation.
              </p>
            </div>
          </template>
          <template #right>
            <div>
              <p>
                Rooted in the rich heritage of folk music and shaped by modern indie influences, my sound weaves together the emotional authenticity of The Lumineers, the narrative depth of Noah Kahan, and the innovative spirit of Mumford & Sons. By incorporating Jeremy Loops' rhythmic energy and James Bay's storytelling prowess, I craft songs that bridge the gap between traditional folk and contemporary expression, creating music that speaks to both heart and mind.
              </p>
            </div>
          </template>
        </TwoColumnLayout>
      </SectionLayout>
  
      <!-- Image Ticker - Use bgColor="bg-dark" for contrast -->
      <SectionLayout bgColor="bg-dark" noPadding>
        <ImageTicker :images="tourImages" :speed="1.5" />
      </SectionLayout>
  
      <!-- Discovery Section -->
      <SectionLayout id="discovery">
        <SectionTitle title="Releases" />
        <div class="section-intro">
          <p>
            Trace his path from breakthrough debut to latest releases - a collection that chronicles both musical growth and personal evolution. Each single marks a milestone, from early collaborations with rock veteran Mark Haze to recent works crafted with emerging producers in the industry.
          </p>
        </div>
        <SinglesShowcase :singles="singlesCollection" />
      </SectionLayout>
  
      <!-- Performance Section -->
      <SectionLayout id="performance" bgColor="bg-dark">
        <SectionTitle title="Performances" />
        <div class="section-intro">
          <p>
            Seth's live performances showcase his versatility as an artist, adapting seamlessly between intimate solo acoustic sets, dynamic duo performances, and full band experiences. His ability to connect with audiences through heartfelt performances has led to notable appearances, including opening at the Simondium Music Festival, performing live on Expresso and Cape Town TV's Home Grown, and collaborating with established artists like Gavin Edwards.
          </p>
        </div>
        <div class="video-grid">
          <VideoPlayer 
            v-for="video in performanceVideos" 
            :key="video.videoId"
            :video-id="video.videoId"
            :platform="video.platform"
            :title="video.title"
            :description="video.description"
            :thumbnail="video.thumbnail"
          />
        </div>
      </SectionLayout>
  
      <!-- Contact Section -->
      <SectionLayout id="contact">
        <SectionTitle title="Contact" />
        <TwoColumnLayout>
          <template #left>
            <div class="contact-info">
              <p class="contact-text">
                For bookings and enquiries feel free to reach out by completing the form or directly through the details below
              </p>
              <ul class="contact-details">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="contact-icon">
                    <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                  </svg>
                  <strong>Location:</strong> 
                  <span>Cape Town, South Africa</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="contact-icon">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                  <strong>Email:</strong> 
                  <a href="mailto:bookings@sethcort.com">bookings@sethcort.com</a>
                </li>
              </ul>
              <div class="social-links">
                <a href="https://instagram.com/seth.cort" target="_blank" class="social-link" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="social-icon" width="64" height="64">
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.987.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.053-.059 1.37-.059 4.04 0 2.672.01 2.988.059 4.04.045.977.207 1.505.344 1.858.181.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.059 4.04.059 2.672 0 2.988-.01 4.04-.059.977-.045 1.505-.207 1.858-.344.466-.181.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.054.059-1.37.059-4.04 0-2.672-.01-2.987-.059-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.059-4.04-.059zm0 3.064A5.135 5.135 0 0 1 17.135 12 5.135 5.135 0 0 1 12 17.135 5.135 5.135 0 0 1 6.865 12 5.135 5.135 0 0 1 12 6.865zm0 8.468A3.333 3.333 0 1 0 12 8.667a3.333 3.333 0 0 0 0 6.666zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
                  </svg>
                </a>
                <a href="https://www.facebook.com/music.seth.cort/" target="_blank" class="social-link" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="social-icon" width="32" height="32">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://youtube.com/@seth.cort." target="_blank" class="social-link" aria-label="YouTube">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="social-icon" width="32" height="32">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
            </div>
            </div>
          </template>
          <template #right>
            <ContactForm />
          </template>
        </TwoColumnLayout>
      </SectionLayout>
  
      <!-- Footer -->
      <Footer />
      <SpeedInsights />
    </div>
  </template>
  
  <script setup>
  import Header from '~/components/Header.vue'
  import SectionTitle from '~/components/SectionTitle.vue'
  import TwoColumnLayout from '~/components/TwoColumnLayout.vue'
  import ImageTicker from '~/components/ImageTicker.vue'
  import SinglesShowcase from '~/components/SinglesShowcase.vue'
  import VideoPlayer from '~/components/VideoPlayer.vue'
  import ContactForm from '~/components/ContactForm.vue'
  import SectionLayout from '~/components/SectionLayout.vue'
  import Hero from '~/components/Hero.vue'
  import Footer from '~/components/Footer.vue'
  import { ref } from 'vue'
  import { SpeedInsights } from '@vercel/speed-insights/vue'
  
// Singles collection data
const singlesCollection = ref([
  {
    title: "Chance To Grow",
    releaseYear: "2025",
    coverArt: "/images/chance_to_grow_cover_art.png",
    description: "A gentle but powerful reminder that the most meaningful connections often need time, patience, and space to truly flourish. The song explores the delicate balance between vulnerability and love, conveying a heartfelt plea for patience, understanding, and emotional space within a developing relationship to avoid unintentional emotional harm.",
    previewUrl: "/audio/chance-to-grow-preview.mp3",
    streamingLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/track/1fbgS4G5skBihaUmPlVgDB?si=43bfa5698cae419c' },
      { platform: 'Apple Music', url: 'https://music.apple.com/us/album/chance-to-grow-single/1802951709' },
      { platform: 'YouTube', url: 'https://youtu.be/35PcJQGRe2Q?si=thr7LxSZOU2RabM3' }
    ]
  },
  {
    title: "Heart's Repair",
    releaseYear: "2024",
    coverArt: "/images/hearts_repair_cover_art.png", // Use the anatomical heart image
    description: "A track that captures raw emotion through folk instrumentation, exploring themes of healing and emotional restoration. Produced by Janco Mouton, the song showcases Seth's matured musical identity with deeper connections to his folk influences.",
    previewUrl: "/audio/hearts-repair-preview.mp3",
    streamingLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/track/7AHDl2OX7zQuTOK5mjYoVC?si=96944656154a4855' },
      { platform: 'Apple Music', url: 'https://music.apple.com/us/album/hearts-repair/1733293664?i=1733293665' },
      { platform: 'YouTube', url: 'https://youtu.be/X6ySZrelDLg?si=_Lmn_DccJUxEMyaO' }
    ]
  },
  {
    title: "Wait Too Long",
    releaseYear: "2024",
    coverArt: "/images/wait_too_long_cover_art.png", // Use the dark circle in clouds image
    description: "Released in October 2024, this track captures raw emotion and longing, exploring themes of solitude and elusive love. It's about being shown how to love and that love is the way to navigate feelings of solitude, uncertainty and emotional intensity amid the confusion and chaos of life.",
    previewUrl: "/audio/wait-too-long-preview.mp3",
    streamingLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/track/3ZfFp1UElLu4hOtcFqg1z4?si=dea8af799a4e4869' },
      { platform: 'Apple Music', url: 'https://music.apple.com/us/album/wait-too-long/1764870698?i=1764870699' },
      { platform: 'YouTube', url: 'https://youtu.be/Q4_acGdRpi0?si=LyojWFQz3K_2NT3D' }
    ]
  },
  {
    title: "Hold On",
    releaseYear: "2023",
    coverArt: "/images/hold_on_cover_art.png", // Use the silhouette image
    description: "Seth's debut single, produced by Mark Haze, reached the Top 10 at radio stations like Oasis SA Radio and Banks Radio Australia. This inspirational alt-folk track features introspective lyrics and showcases Seth's signature sound blending traditional folk elements with contemporary production.",
    previewUrl: "/audio/hold-on-preview.mp3",
    streamingLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/track/0E2qf13pwm47jdHSn14JZ6?si=e6c52f39ba7f4eb4' },
      { platform: 'Apple Music', url: 'https://music.apple.com/us/album/hold-on/1675960861?i=1675960862' },
      { platform: 'YouTube', url: 'https://youtu.be/DHC1SDgN3FM?si=-XlRkVy_lp3JVTeD' }
    ]
  },
  {
    title: "Left to Burn",
    releaseYear: "2023",
    coverArt: "/images/left_to_burn_cover_art.jpg", // You'll need to provide this image
    description: "The second single from Seth's EP explores the courage needed to end relationships that no longer serve us. With poignant lyrics and melodic folk arrangements, this song resonates with listeners navigating difficult transitions and emotional growth.",
    previewUrl: "/audio/left-to-burn-preview.mp3",
    streamingLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/track/3ReOJjOZH484pIwQ1UQGUi?si=952fae11794e4364' },
      { platform: 'Apple Music', url: 'https://music.apple.com/us/album/left-to-burn/1717670357?i=1717670359' },
      { platform: 'YouTube', url: 'https://youtu.be/Mzwj9AjmMJU?si=Na0-z_W3kGmUc2We' }
    ]
  },
  {
    title: "Just Friends",
    releaseYear: "2023",
    coverArt: "/images/ep_cover_art.png", // Use the studio image
    description: "Featured on Seth's debut EP 'Some Songs from Highschool', this track delves into the complexity of relationships and unspoken feelings. With its warm acoustic tones and heartfelt vocals, the song captures the bittersweet experience of unrequited love.",
    previewUrl: "/audio/just-friends-preview.mp3",
    streamingLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/track/2VuQHPDJBK0lTnSTffmIbJ?si=538f15dd1b264f22' },
      { platform: 'Apple Music', url: 'https://music.apple.com/us/album/just-friends/1717670357?i=1717670360' },
      { platform: 'YouTube', url: 'https://youtu.be/NEA5SJAytPk?si=Qm2r0xs3r8EQN1HQ' }
    ]
  }

]);
  
  // Sample data for performance videos
  const performanceVideos = ref([
  {
    videoId: 'BeoGehYi4mc',
    platform: 'youtube',
    title: 'Seth Cort - Hold On (feat Mark Haze)',
    description: 'The debut single "Hold On" showcases Seth\'s signature folk sound blending traditional elements with contemporary production. Filmed at the Expresso Show Studio, this video captures the essence of hope and perseverance.',
    // Using the most reliable thumbnail format for this specific video
    thumbnail: 'https://img.youtube.com/vi/BeoGehYi4mc/hqdefault.jpg',
    duration: '3:47'
  },
  {
    videoId: '877ZD_qPxlU',
    platform: 'youtube',
    title: 'Seth Cort - Left to Burn (Live Acoustic Version)',
    description: 'An intimate acoustic performance of "Left to Burn" featuring raw vocals and stripped-back instrumentation. This live version brings out the emotional depth and authenticity that defines Seth\'s musical approach.',
    // Using the most reliable thumbnail format for this specific video
    thumbnail: 'https://img.youtube.com/vi/877ZD_qPxlU/hqdefault.jpg',
    duration: '4:22'
  },
]);
  </script>
  
  <style scoped>
  /* About section */
  .about-image img {
    width: 100%;
    border-radius: 4px;
  }
  
  .lead-text {
    font-size: 1.6rem;
    line-height: 1.4;
    color: var(--accent-color, #BC9C76);
    margin-bottom: 1.5rem;
  }
  
  .about-content p {
    margin-bottom: 1.5rem;
    color: var(--color-text-50, rgba(255, 255, 255, 0.5));
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  /* Section intro paragraphs */
  .section-intro {
    margin-bottom: 3rem;
    max-width: 900px;
  }
  
  .section-intro p {
    color: var(--color-text-50, rgba(255, 255, 255, 0.5));
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  /* Performance section */
  .video-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 2rem;
  }
  
  @media (min-width: 768px) {
    .video-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  /* Contact section */
  .contact-info h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #fff;
  }
  
  .contact-info p {
    margin-bottom: 1.5rem;
    color: var(--color-text-50, rgba(255, 255, 255, 0.5));
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .contact-details {
    list-style: none;
    margin-bottom: 2rem;
  }
  
  .contact-details li {
    margin-bottom: 0.75rem;
    color: var(--color-text-50, rgba(255, 255, 255, 0.5));
  }
  
  .contact-details a, 
  .contact-details span {
    color: var(--accent-color, #BC9C76);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .contact-details a:hover {
    color: #d6b08a;
    text-decoration: underline;
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .social-link {
    padding: 0.5rem 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .social-link:hover {
    background-color: var(--accent-color, #BC9C76);
  }
  </style>