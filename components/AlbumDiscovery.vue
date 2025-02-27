<template>
    <div class="album-discovery">
      <div class="album-container">
        <!-- Album Cover -->
        <div class="album-artwork" @click="togglePlayback">
          <img :src="album.coverArt" :alt="`${album.title} cover art`" />
          <div class="play-overlay" :class="{ 'is-playing': isPlaying }">
            <div v-if="!isPlaying" class="play-icon"></div>
            <div v-else class="pause-icon">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        
        <!-- Album Info -->
        <div class="album-info">
          <h3 class="album-title">{{ album.title }}</h3>
          <p class="album-year">{{ album.releaseYear }}</p>
          
          <!-- Track List -->
          <div class="track-list">
            <div 
              v-for="(track, index) in album.tracks" 
              :key="index"
              class="track-item"
              :class="{ 'active': currentTrack === index }"
              @click="playTrack(index)"
            >
              <div class="track-number">{{ index + 1 }}</div>
              <div class="track-title">{{ track.title }}</div>
              <div class="track-duration">{{ formatDuration(track.duration) }}</div>
            </div>
          </div>
          
          <!-- Streaming Links -->
          <div class="streaming-links">
            <a 
              v-for="link in album.streamingLinks" 
              :key="link.platform" 
              :href="link.url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="streaming-link"
            >
              {{ link.platform }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    album: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        releaseYear: '',
        coverArt: '',
        tracks: [],
        streamingLinks: []
      })
      /* Expected format:
      {
        title: 'Album Title',
        releaseYear: '2023',
        coverArt: '/path/to/cover.jpg',
        tracks: [
          { title: 'Track 1', duration: 180 }, // duration in seconds
          { title: 'Track 2', duration: 210 }
        ],
        streamingLinks: [
          { platform: 'Spotify', url: 'https://spotify.com/...' },
          { platform: 'Apple Music', url: 'https://music.apple.com/...' }
        ]
      }
      */
    }
  });
  
  const isPlaying = ref(false);
  const currentTrack = ref(null);
  
  // Toggle album playback
  const togglePlayback = () => {
    if (isPlaying.value) {
      isPlaying.value = false;
      currentTrack.value = null;
    } else {
      isPlaying.value = true;
      currentTrack.value = 0; // Start with first track
    }
  };
  
  // Play specific track
  const playTrack = (index) => {
    currentTrack.value = index;
    isPlaying.value = true;
  };
  
  // Format track duration from seconds to MM:SS
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  </script>
  
  <style scoped>
  .album-discovery {
    margin: 2rem 0;
  }
  
  .album-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  @media (min-width: 768px) {
    .album-container {
      flex-direction: row;
      align-items: flex-start;
    }
  }
  
  .album-artwork {
    flex: 0 0 auto;
    position: relative;
    width: 100%;
    max-width: 350px;
    cursor: pointer;
    overflow: hidden;
  }
  
  .album-artwork img {
    width: 100%;
    display: block;
    transition: transform 0.3s ease;
  }
  
  .album-artwork:hover img {
    transform: scale(1.02);
  }
  
  .play-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .album-artwork:hover .play-overlay {
    opacity: 1;
  }
  
  .play-overlay.is-playing {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.6);
  }
  
  .play-icon {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 20px 0 20px 35px;
    border-color: transparent transparent transparent #fff;
  }
  
  .pause-icon {
    width: 30px;
    height: 40px;
    display: flex;
    justify-content: space-between;
  }
  
  .pause-icon span {
    width: 12px;
    height: 40px;
    background-color: #fff;
  }
  
  .album-info {
    flex: 1;
  }
  
  .album-title {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: #fff;
  }
  
  .album-year {
    font-size: 1rem;
    color: var(--color-text-50, rgba(255, 255, 255, 0.5));
    margin-bottom: 2rem;
  }
  
  .track-list {
    margin-bottom: 2rem;
  }
  
  .track-item {
    display: grid;
    grid-template-columns: 30px 1fr auto;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--color-text-10, rgba(255, 255, 255, 0.1));
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .track-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .track-item.active {
    color: var(--accent-color, #BC9C76);
  }
  
  .track-number {
    color: var(--color-text-30, rgba(255, 255, 255, 0.3));
    font-weight: 500;
  }
  
  .track-item.active .track-number {
    color: var(--accent-color, #BC9C76);
  }
  
  .track-title {
    font-weight: 500;
  }
  
  .track-duration {
    color: var(--color-text-30, rgba(255, 255, 255, 0.3));
    font-weight: 500;
  }
  
  .streaming-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .streaming-link {
    padding: 0.5rem 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .streaming-link:hover {
    background-color: var(--accent-color, #BC9C76);
  }
  </style>