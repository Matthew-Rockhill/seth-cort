<template>
  <div class="video-player">
    <div class="video-container" :class="{ 'is-playing': isPlaying }">
      <!-- Video Thumbnail with Play Button Overlay -->
      <div v-if="!isPlaying" class="thumbnail-container" @click="playVideo">
        <img 
          :src="thumbnail || generateThumbnail(videoId)" 
          :alt="`${title} thumbnail`" 
          class="thumbnail" 
          @error="handleThumbnailError" 
          ref="thumbnailImg"
        />
        <div class="play-button-wrapper">
          <div class="play-button">
            <div class="play-icon"></div>
          </div>
        </div>
        <div class="video-duration" v-if="duration">{{ duration }}</div>
      </div>
      
      <!-- Embedded Video -->
      <iframe 
        v-if="isPlaying" 
        :src="embedUrl" 
        allowfullscreen
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        class="video-iframe"
      ></iframe>
    </div>
    
    <!-- Video Title and Description -->
    <div class="video-info">
      <h3 class="video-title">{{ title }}</h3>
      <p v-if="description" class="video-description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  videoId: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    default: 'youtube',
    validator: (value) => ['youtube', 'vimeo'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  thumbnail: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    default: ''
  }
});

const isPlaying = ref(false);
const thumbnailImg = ref(null);

// Error handling for thumbnail loading
const handleThumbnailError = (e) => {
  if (props.platform === 'youtube') {
    // Try alternate thumbnail formats in order of quality
    const formats = [
      `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${props.videoId}/mqdefault.jpg`, 
      `https://img.youtube.com/vi/${props.videoId}/default.jpg`,
      // Fallback to a local placeholder as last resort
      '/images/video-placeholder.jpg'
    ];
    
    // Get current src
    const currentSrc = e.target.src;
    // Find index of current src in formats array (or -1 if not found)
    const currentIndex = formats.findIndex(format => format === currentSrc);
    
    // If we have more formats to try
    if (currentIndex < formats.length - 1) {
      // Try the next format (or the first one if current not found)
      const nextIndex = currentIndex === -1 ? 0 : currentIndex + 1;
      e.target.src = formats[nextIndex];
    }
  }
};

// Compute the embed URL based on the platform
const embedUrl = computed(() => {
  if (props.platform === 'youtube') {
    return `https://www.youtube.com/embed/${props.videoId}?autoplay=1&rel=0&modestbranding=1`;
  } else if (props.platform === 'vimeo') {
    return `https://player.vimeo.com/video/${props.videoId}?autoplay=1&title=0&byline=0&portrait=0`;
  }
  return '';
});

// Generate YouTube thumbnail if not provided
const generateThumbnail = (videoId) => {
  if (props.platform === 'youtube') {
    // YouTube's image API - more reliable than direct image paths
    // This ensures we get the best available quality
    return `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`;
    
    // Fallback options if needed:
    // return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    // return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }
  return '';
};

// Start playing the video
const playVideo = () => {
  isPlaying.value = true;
};
</script>

<style scoped>
.video-player {
  margin-bottom: 2.5rem;
  transition: transform 0.3s ease;
}

.video-player:hover {
  transform: translateY(-5px);
}

.video-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background-color: #000;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease;
}

.video-container:hover {
  box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.8);
}

.thumbnail-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: transform 0.5s ease;
  overflow: hidden;
}

.thumbnail-container:hover {
  transform: scale(1.03);
}

.thumbnail-container:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.1) 100%);
  z-index: 1;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.thumbnail-container:hover:before {
  opacity: 0.6;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.play-button-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.play-button {
  width: 70px;
  height: 70px;
  background-color: rgba(188, 156, 118, 0.9); /* Using the accent color */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  transform: scale(1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.thumbnail-container:hover .play-button {
  transform: scale(1.1);
  background-color: var(--accent-color, #BC9C76);
}

.play-icon {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 12px 0 12px 20px;
  border-color: transparent transparent transparent #fff;
  margin-left: 4px; /* Adjust for visual centering */
}

.video-duration {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  z-index: 2;
}

.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.video-info {
  padding: 1.2rem 0.5rem;
}

.video-title {
  margin-bottom: 0.7rem;
  color: #fff;
  font-size: 1.3rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.video-player:hover .video-title {
  color: var(--accent-color, #BC9C76);
}

.video-description {
  color: var(--color-text-50, rgba(255, 255, 255, 0.5));
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0;
}

@media (max-width: 767px) {
  .play-button {
    width: 60px;
    height: 60px;
  }
  
  .play-icon {
    border-width: 10px 0 10px 16px;
  }
  
  .video-title {
    font-size: 1.1rem;
  }
}
</style>