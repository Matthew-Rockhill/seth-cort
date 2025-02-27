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
        <SectionTitle title="Discovery" />
        <div class="section-intro">
          <p>
            Trace his path from breakthrough debut to latest releases - a collection that chronicles both musical growth and personal evolution. Each single marks a milestone, from early collaborations with rock veteran Mark Haze to recent works crafted with emerging producers in the industry.
          </p>
        </div>
        <SinglesShowcase :singles="singlesCollection" />
      </SectionLayout>
  
      <!-- Performance Section -->
      <SectionLayout id="performance" bgColor="bg-dark">
        <SectionTitle title="Performance" />
        <div class="section-intro">
          <p>
            Seth's live performances showcase his versatility as an artist, adapting seamlessly between intimate solo acoustic sets, dynamic duo performances, and full band experiences. His ability to connect with audiences through heartfelt performances has led to notable appearances, including opening at the Simondium Music Festival and collaborating with established artists like Gavin Edwards.
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
                  <i class="icon-location"></i>
                  <strong>Location:</strong> 
                  <span>Cape Town, South Africa</span>
                </li>
                <li>
                  <i class="icon-email"></i>
                  <strong>Email:</strong> 
                  <a href="mailto:bookings@sethcort.com">bookings@sethcort.com</a>
                </li>
              </ul>
              <div class="social-links">
                <a href="https://instagram.com/sethcort" target="_blank" class="social-link" aria-label="Instagram">
                  <i class="icon-instagram"></i>
                </a>
                <a href="https://x.com/sethcort" target="_blank" class="social-link" aria-label="X">
                  <i class="icon-x"></i>
                </a>
                <a href="https://youtube.com/sethcort" target="_blank" class="social-link" aria-label="YouTube">
                  <i class="icon-youtube"></i>
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
  
  // Singles collection data
  const singlesCollection = ref([
  {
    title: "Heart's Repair",
    releaseYear: "2024",
    coverArt: "/images/hearts_repair_cover_art.png", // Use the anatomical heart image
    description: "A track that captures raw emotion through folk instrumentation, exploring themes of healing and emotional restoration. Produced by Janco Mouton, the song showcases Seth's matured musical identity with deeper connections to his folk influences.",
    previewUrl: "/audio/hearts-repair-preview.mp3",
    streamingLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/artist/7uyVkgK0Tm9mdR72Fb2KhQ?si=KltEcOqPR5qXzV5C0TqENg' },
      { platform: 'Apple Music', url: 'https://music.apple.com/za/artist/seth-cort/1675891531' },
      { platform: 'YouTube', url: 'https://www.youtube.com/channel/UCQTKh6pj2mA0Q6YgdFd3vnw' }
    ]
  },
  {
    title: "Hold On",
    releaseYear: "2023",
    coverArt: "/images/hold_on_cover_art.png", // Use the silhouette image
    description: "Seth's debut single, produced by Mark Haze, reached the Top 10 at radio stations like Oasis SA Radio and Banks Radio Australia. This inspirational alt-folk track features introspective lyrics and showcases Seth's signature sound blending traditional folk elements with contemporary production.",
    previewUrl: "/audio/hold-on-preview.mp3",
    streamingLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/artist/7uyVkgK0Tm9mdR72Fb2KhQ?si=KltEcOqPR5qXzV5C0TqENg' },
      { platform: 'Apple Music', url: 'https://music.apple.com/za/artist/seth-cort/1675891531' },
      { platform: 'YouTube', url: 'https://www.youtube.com/channel/UCQTKh6pj2mA0Q6YgdFd3vnw' }
    ]
  },
  {
    title: "Left to Burn",
    releaseYear: "2023",
    coverArt: "/images/left_to_burn_cover_art.jpg", // You'll need to provide this image
    description: "The second single from Seth's EP explores the courage needed to end relationships that no longer serve us. With poignant lyrics and melodic folk arrangements, this song resonates with listeners navigating difficult transitions and emotional growth.",
    previewUrl: "/audio/left-to-burn-preview.mp3",
    streamingLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/artist/7uyVkgK0Tm9mdR72Fb2KhQ?si=KltEcOqPR5qXzV5C0TqENg' },
      { platform: 'Apple Music', url: 'https://music.apple.com/za/artist/seth-cort/1675891531' },
      { platform: 'YouTube', url: 'https://www.youtube.com/channel/UCQTKh6pj2mA0Q6YgdFd3vnw' }
    ]
  },
  {
    title: "Some Songs from Highschool",
    releaseYear: "2023",
    coverArt: "/images/ep_cover_art.png", // Use the studio image
    description: "Seth's debut EP featuring tracks like 'Just Friends', this collection captures the essence of youthful songwriting with mature production. The EP showcases Seth's versatility as both a vocalist and multi-instrumentalist, with arrangements that blend acoustic folk with contemporary indie elements.",
    previewUrl: "/audio/some-songs-preview.mp3",
    streamingLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/artist/7uyVkgK0Tm9mdR72Fb2KhQ?si=KltEcOqPR5qXzV5C0TqENg' },
      { platform: 'Apple Music', url: 'https://music.apple.com/za/artist/seth-cort/1675891531' },
      { platform: 'YouTube', url: 'https://www.youtube.com/channel/UCQTKh6pj2mA0Q6YgdFd3vnw' }
    ]
  },
  {
    title: "Wait Too Long",
    releaseYear: "2024",
    coverArt: "/images/wait_too_long_cover_art.png", // Use the dark circle in clouds image
    description: "Released in October 2024, this track captures raw emotion and longing, exploring themes of solitude and elusive love. It's about being shown how to love and that love is the way to navigate feelings of solitude, uncertainty and emotional intensity amid the confusion and chaos of life.",
    previewUrl: "/audio/wait-too-long-preview.mp3",
    streamingLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/artist/7uyVkgK0Tm9mdR72Fb2KhQ?si=KltEcOqPR5qXzV5C0TqENg' },
      { platform: 'Apple Music', url: 'https://music.apple.com/za/artist/seth-cort/1675891531' },
      { platform: 'YouTube', url: 'https://www.youtube.com/channel/UCQTKh6pj2mA0Q6YgdFd3vnw' }
    ]
  }
]);
  
  // Sample data for performance videos
  const performanceVideos = ref([
  {
    videoId: 'BeoGehYi4mc',
    platform: 'youtube',
    title: 'Seth Cort - Hold On (Official Music Video)',
    description: 'The debut single "Hold On" showcases Seth\'s signature folk sound blending traditional elements with contemporary production. Filmed in scenic Cape Town landscapes, this video captures the essence of hope and perseverance.',
    // Using the most reliable thumbnail format for this specific video
    thumbnail: 'https://img.youtube.com/vi/BeoGehYi4mc/hqdefault.jpg',
    duration: '3:47'
  },
  {
    videoId: '877ZD_qPxlU',
    platform: 'youtube',
    title: 'Seth Cort - Wait Too Long (Live Acoustic Version)',
    description: 'An intimate acoustic performance of "Wait Too Long" featuring raw vocals and stripped-back instrumentation. This live version brings out the emotional depth and authenticity that defines Seth\'s musical approach.',
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