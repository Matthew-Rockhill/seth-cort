<template>
    <div class="singles-showcase">
      <div class="showcase-container">
        <!-- Navigation controls -->
        <div class="navigation">
          <button 
            class="nav-button prev" 
            @click="prevSingle" 
            aria-label="Previous single"
          >
            <span class="arrow">&#10094;</span>
          </button>
          
          <!-- Single artwork and info -->
          <div class="single-display">
            <div class="single-artwork" @click="togglePlayback">
              <img :src="currentSingle.coverArt" :alt="`${currentSingle.title} artwork`" />
              <div class="play-overlay" :class="{ 'is-playing': isPlaying }">
                <div v-if="!isPlaying" class="play-icon"></div>
                <div v-else class="pause-icon">
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            
            <div class="single-info">
              <h3 class="single-title">{{ currentSingle.title }}</h3>
              <p class="single-year">{{ currentSingle.releaseYear }}</p>
              <p class="single-description">{{ currentSingle.description }}</p>
              
              <!-- Audio player -->
              <div class="audio-player">
                <audio 
                  ref="audioPlayer" 
                  :src="currentSingle.previewUrl"
                  @ended="onAudioEnded"
                  @timeupdate="updateProgress"
                ></audio>
                
                <div class="player-controls">
                  <button 
                    class="play-button" 
                    @click="togglePlayback" 
                    aria-label="Play or pause"
                  >
                    <span v-if="!isPlaying" class="play">&#9658;</span>
                    <span v-else class="pause">&#10074;&#10074;</span>
                  </button>
                  
                  <div class="progress-container">
                    <div class="progress-bar" @click="seek">
                      <div class="progress" :style="{ width: `${progressPercentage}%` }"></div>
                    </div>
                    <div class="time-display">
                      <span>{{ formatTime(currentTime) }}</span>
                      <span>{{ formatTime(duration) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Streaming links with icons -->
              <div class="streaming-links">
                <a 
                  v-for="link in currentSingle.streamingLinks" 
                  :key="link.platform" 
                  :href="link.url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="streaming-link"
                >
                  <span class="streaming-icon" :class="getLinkIconClass(link.platform)"></span>
                  <span class="streaming-name">{{ link.platform }}</span>
                </a>
              </div>
            </div>
          </div>
          
          <button 
            class="nav-button next" 
            @click="nextSingle"
            aria-label="Next single"
          >
            <span class="arrow">&#10095;</span>
          </button>
        </div>
        
        <!-- Dots/bullets for direct navigation -->
        <div class="dots-navigation">
          <button 
            v-for="(single, index) in singles" 
            :key="index"
            class="dot" 
            :class="{ active: currentIndex === index }"
            @click="selectSingle(index)"
            :aria-label="`View ${single.title}`"
          ></button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
  
  const props = defineProps({
    singles: {
      type: Array,
      required: true,
      default: () => ([]),
      /* Expected format:
      [
        {
          title: 'Single Title',
          releaseYear: '2023',
          coverArt: '/path/to/cover.jpg',
          description: 'Short description of the single.',
          previewUrl: '/path/to/audio-preview.mp3',
          streamingLinks: [
            { platform: 'Spotify', url: 'https://spotify.com/...' },
            { platform: 'Apple Music', url: 'https://music.apple.com/...' }
          ]
        }
      ]
      */
    }
  });
  
  // State
  const currentIndex = ref(0);
  const isPlaying = ref(false);
  const audioPlayer = ref(null);
  const currentTime = ref(0);
  const duration = ref(0);
  const progressPercentage = ref(0);
  
  // Computed
  const currentSingle = computed(() => {
    return props.singles[currentIndex.value] || {};
  });
  
  // Methods
  const selectSingle = (index) => {
    if (isPlaying.value) {
      pauseAudio();
    }
    currentIndex.value = index;
    resetAudioState();
  };
  
  const nextSingle = () => {
    if (currentIndex.value < props.singles.length - 1) {
      selectSingle(currentIndex.value + 1);
    } else {
      // Continuous scrolling - loop back to the first single
      selectSingle(0);
    }
  };
  
  const prevSingle = () => {
    if (currentIndex.value > 0) {
      selectSingle(currentIndex.value - 1);
    } else {
      // Continuous scrolling - loop to the last single
      selectSingle(props.singles.length - 1);
    }
  };
  
  // Function to determine icon class based on platform name
  const getLinkIconClass = (platform) => {
    const platformLower = platform.toLowerCase();
    if (platformLower.includes('spotify')) {
      return 'icon-spotify';
    } else if (platformLower.includes('apple')) {
      return 'icon-apple-music';
    } else if (platformLower.includes('youtube')) {
      return 'icon-youtube';
    } else if (platformLower.includes('bandcamp')) {
      return 'icon-bandcamp';
    } else if (platformLower.includes('soundcloud')) {
      return 'icon-soundcloud';
    }
    return 'icon-music'; // Default icon
  };
  
  const togglePlayback = () => {
    if (!audioPlayer.value) return;
    
    if (isPlaying.value) {
      pauseAudio();
    } else {
      playAudio();
    }
  };
  
  const playAudio = () => {
    audioPlayer.value.play()
      .then(() => {
        isPlaying.value = true;
      })
      .catch(err => {
        console.error('Error playing audio:', err);
      });
  };
  
  const pauseAudio = () => {
    audioPlayer.value.pause();
    isPlaying.value = false;
  };
  
  const onAudioEnded = () => {
    isPlaying.value = false;
    currentTime.value = 0;
    progressPercentage.value = 0;
  };
  
  const updateProgress = () => {
    if (!audioPlayer.value) return;
    
    currentTime.value = audioPlayer.value.currentTime;
    duration.value = audioPlayer.value.duration || 0;
    
    if (duration.value > 0) {
      progressPercentage.value = (currentTime.value / duration.value) * 100;
    }
  };
  
  const seek = (event) => {
    if (!audioPlayer.value || !duration.value) return;
    
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = offsetX / rect.width;
    
    audioPlayer.value.currentTime = percentage * duration.value;
    updateProgress();
  };
  
  const resetAudioState = () => {
    isPlaying.value = false;
    currentTime.value = 0;
    duration.value = 0;
    progressPercentage.value = 0;
    
    if (audioPlayer.value) {
      audioPlayer.value.currentTime = 0;
    }
  };
  
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Watch for changes in the current single to reset the audio state
  watch(currentIndex, () => {
    resetAudioState();
  });
  
  // Lifecycle hooks
  onMounted(() => {
    if (audioPlayer.value) {
      audioPlayer.value.addEventListener('loadedmetadata', () => {
        duration.value = audioPlayer.value.duration;
      });
    }
  });
  
  onBeforeUnmount(() => {
    if (isPlaying.value && audioPlayer.value) {
      audioPlayer.value.pause();
    }
  });
  </script>
  
  <style scoped>
  .singles-showcase {
    margin: 2rem 0;
    width: 100%;
  }
  
  .showcase-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  /* Navigation layout */
  .navigation {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .single-display {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  @media (min-width: 768px) {
    .single-display {
      flex-direction: row;
      align-items: flex-start;
    }
  }
  
  /* Nav buttons */
  .nav-button {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    color: #fff;
    font-size: 1.2rem;
    transition: background-color 0.3s ease;
  }
  
  .nav-button:hover:not(:disabled) {
    background-color: var(--accent-color, #BC9C76);
  }
  
  .nav-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  .arrow {
    display: block;
    line-height: 1;
  }
  
  /* Artwork */
  .single-artwork {
    flex: 0 0 auto;
    width: 100%;
    max-width: 320px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
  
  .single-artwork img {
    width: 100%;
    display: block;
    transition: transform 0.3s ease;
  }
  
  .single-artwork:hover img {
    transform: scale(1.02);
  }
  
  /* Play overlay */
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
  
  .single-artwork:hover .play-overlay {
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
  
  /* Single info */
  .single-info {
    flex: 1;
  }
  
  .single-title {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: #fff;
  }
  
  .single-year {
    font-size: 1rem;
    color: var(--color-text-50, rgba(255, 255, 255, 0.5));
    margin-bottom: 1rem;
  }
  
  .single-description {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--color-text-50, rgba(255, 255, 255, 0.5));
    margin-bottom: 1.5rem;
  }
  
  /* Audio player */
  .audio-player {
    margin-bottom: 1.5rem;
  }
  
  .player-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .play-button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--accent-color, #BC9C76);
    border: none;
    color: #121212;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .play-button:hover {
    transform: scale(1.05);
  }
  
  .play, .pause {
    display: block;
    line-height: 1;
  }
  
  .pause {
    font-size: 0.8rem;
    letter-spacing: -2px;
  }
  
  .progress-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .progress-bar {
    height: 6px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
  }
  
  .progress {
    height: 100%;
    background-color: var(--accent-color, #BC9C76);
    width: 0;
    transition: width 0.1s linear;
  }
  
  .time-display {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--color-text-30, rgba(255, 255, 255, 0.3));
  }
  
  /* Streaming links */
  .streaming-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .streaming-link {
    padding: 0.5rem 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .streaming-link:hover {
    background-color: var(--accent-color, #BC9C76);
    transform: translateY(-2px);
  }
  
  .streaming-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  
  .icon-spotify {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z'/%3E%3C/svg%3E");
  }
  
  .icon-apple-music {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.02 1.88.475 3.208c-.192.456-.292.942-.342 1.438-.015.15-.025.3-.042.45v14.762c.016.152.025.295.042.447.05.5.15.985.342 1.439.545 1.33 1.53 2.25 2.864 2.782.703.276 1.446.355 2.193.392.152.008.302.016.455.026h12.024c.16-.01.32-.016.48-.026.511-.05 1.014-.112 1.496-.273.645-.22 1.233-.57 1.76-1.049.866-.78 1.44-1.744 1.676-2.88.076-.36.114-.733.13-1.108.015-.183.025-.367.039-.55v-14.18l-.001-.032zm-11.44 2.794c2.182 0 3.954 1.778 3.954 3.968 0 2.19-1.772 3.968-3.954 3.968s-3.954-1.778-3.954-3.968c0-2.19 1.773-3.968 3.954-3.968zm8.435 15.92c-.128.138-.266.264-.414.38-1.07.835-2.307.962-3.585.765-.217-.033-.436-.08-.683-.127-.884-.17-1.775-.164-2.668-.02-.608.098-1.209.235-1.823.311-1.024.126-2.025.05-2.968-.29-.748-.266-1.373-.701-1.878-1.313-.06-.072-.118-.147-.185-.23v4.182h-3.74V4.81c.16.12.273.204.387.286.2.143.401.284.61.41.936.57 1.975.766 3.054.656.706-.072 1.396-.229 2.086-.38.545-.12 1.088-.261 1.65-.254.847.01 1.646.216 2.39.578 1.536.745 2.165 2.086 2.382 3.746.05.38.08.76.084 1.142.004.55-.009 1.101-.12 1.642-.069.339-.213.66-.307.998z'/%3E%3C/svg%3E");
  }
  
  .icon-youtube {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/%3E%3C/svg%3E");
  }
  
  .icon-bandcamp {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M0 18.75l7.437-13.5H24l-7.438 13.5H0z'/%3E%3C/svg%3E");
  }
  
  .icon-soundcloud {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c0-.057-.045-.1-.09-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c0 .055.045.094.09.094s.089-.045.104-.104l.21-1.319-.21-1.334c0-.061-.044-.09-.09-.09m1.83-1.229c-.061 0-.12.045-.12.104l-.21 2.563.225 2.458c0 .06.045.12.119.12.061 0 .105-.061.121-.12l.254-2.474-.254-2.548c-.016-.06-.061-.12-.121-.12m.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.075.075.135.15.135.074 0 .135-.06.15-.135l.24-2.544-.24-2.64c-.015-.074-.075-.135-.149-.135m1.155.36c-.005-.09-.075-.149-.159-.149-.09 0-.158.06-.164.149l-.217 2.43.2 2.563c.005.09.075.157.159.157.074 0 .158-.061.158-.151l.227-2.563-.227-2.444m.824-.044c-.015-.105-.09-.183-.195-.183-.104 0-.18.079-.194.183l-.201 2.504.201 2.59c.015.104.09.18.194.18.104 0 .18-.076.195-.18l.227-2.59-.227-2.504m.996.069c0-.12-.105-.211-.225-.211-.119 0-.224.091-.224.211l-.18 2.46.165 2.624c.015.119.105.209.225.209.119 0 .224-.089.225-.209l.195-2.624-.195-2.46m1.029.064c0-.134-.12-.238-.255-.238-.119 0-.24.104-.24.238l-.166 2.397.156 2.643c.016.135.121.24.25.24.134 0 .24-.105.254-.24l.18-2.643-.18-2.397m1.49.143c0-.15-.135-.27-.285-.27s-.27.12-.284.27l-.151 2.254.141 2.76c0 .149.12.269.284.269.15 0 .27-.12.284-.269l.166-2.76-.166-2.254m1.184.224c0-.164-.149-.299-.313-.299-.151 0-.3.12-.314.299l-.136 2.036.121 2.882c0 .165.148.3.329.3.164 0 .3-.135.313-.3l.136-2.882-.136-2.036m1.875.449h-.006c-.17-.002-.295.15-.307.314l-.119 2.094.105 3.151s.12.341.321.341c.188 0 .314-.154.332-.293l.135-3.176-.135-2.093c-.014-.155-.148-.307-.317-.307m-9.659-3.443c-.07 0-.12.061-.134.12l-.255 3.471.255 2.242c.014.06.064.12.134.12.075 0 .134-.061.149-.12l.283-2.242-.283-3.471c-.015-.074-.074-.134-.149-.134m1.694-.03c-.084 0-.149.075-.164.164l-.24 3.472.226 2.219c.015.09.08.164.164.164.09 0 .164-.074.179-.164l.24-2.234-.24-3.457c-.016-.09-.09-.164-.18-.164m1.664.029c-.104 0-.18.09-.195.18l-.196 3.402.181 2.233c.016.105.106.18.196.18.104 0 .179-.075.194-.18l.217-2.233-.215-3.402c-.016-.09-.092-.18-.195-.18M9.235 5.598v-.704c0-.176-.142-.318-.336-.318-.208 0-.343.142-.343.33v.692l.336 4.467-.336 2.18c0 .176.15.33.343.33.195 0 .336-.154.336-.33l.36-2.192-.36-4.455m1.664.254v-.997c0-.209-.153-.372-.36-.372-.209 0-.361.163-.361.38v.984l.347 4.196-.347 2.184c0 .202.164.377.369.377.195 0 .36-.175.36-.377l.36-2.183-.36-4.192m7.375 13.729c-.623 0-1.246-.06-1.869-.179-1.288-5.051-5.482-8.763-10.588-8.763-.749 0-1.471.09-2.136.262-.261.063-.329.138-.329.299v17.33c0 .153.109.274.256.299.748.128 1.514.208 2.294.208 6.215 0 11.634-4.156 13.527-10.206.317.047.636.074.96.074 3.497 0 6.336-2.864 6.336-6.393S22.309 6.9 18.812 6.9'/%3E%3C/svg%3E");
  }
  
  .icon-music {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M19.952 1.651a.5.5 0 0 1 .296.917c-.618.505-1.744.602-2.709.211-.916-.373-1.564-1.136-1.585-1.886a.5.5 0 0 1 .736-.453c.632.252 1.367.622 1.95.91.388.164.819.338 1.312.3zM16.5 8.25v-6.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v6.508a2 2 0 0 1 1 1.731v4.256a3.25 3.25 0 0 1-6.5 0V9.991a2 2 0 0 1 1-1.737V6.761a.5.5 0 0 0-.5-.5.5.5 0 0 0-.5.5v1.5a.75.75 0 0 1-1.5 0v-1.5a2 2 0 0 1 2-2zM16.508 2v-.001.001zm3.984 0h.001-.001zm.508 5.188a.5.5 0 0 0-.5-.5.5.5 0 0 0-.5.5v1.062a2 2 0 0 1 1 0V7.188zM19.5 9.991a.5.5 0 0 0-.5-.491.5.5 0 0 0-.5.5l.001 4.244a1.75 1.75 0 0 0 1.75 1.75 1.75 1.75 0 0 0 1.749-1.75V9.999a.5.5 0 0 0-.5-.499.5.5 0 0 0-.5.5V14.5a.75.75 0 0 1-.749.743A.75.75 0 0 1 19.5 14.5V9.991zM15.5 4a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-5z'/%3E%3C/svg%3E");
  }
  
  /* Dots navigation */
  .dots-navigation {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .dot.active {
    background-color: var(--accent-color, #BC9C76);
    transform: scale(1.2);
  }
  
  .dot:hover:not(.active) {
    background-color: rgba(255, 255, 255, 0.4);
  }
  </style>