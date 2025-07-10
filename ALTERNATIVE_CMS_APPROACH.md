# Simple CMS Solution: Nuxt Content + Git-based Editing

## Overview
A lightweight approach that keeps everything within your existing Nuxt application - no separate admin systems, no extra logins, just simple file-based content management.

## 🎯 Why This Approach?

✅ **No Separate Admin**: Edit content directly in your existing app  
✅ **Git-based**: Content stored as files in your repository  
✅ **Free**: No monthly costs or external dependencies  
✅ **Simple**: Easy to understand and maintain  
✅ **Version Control**: Automatic versioning with Git  
✅ **Performance**: Static content, excellent for SEO  

## 🏗️ Implementation

### Phase 1: Setup Nuxt Content

#### 1. Install Dependencies
```bash
npm install @nuxt/content
npm install @nuxtjs/cloudinary  # For image management (optional)
```

#### 2. Configure Nuxt
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/cloudinary' // Optional: for image optimization
  ],
  
  content: {
    // Syntax highlighting, markdown features
    highlight: {
      theme: 'github-dark'
    }
  },
  
  cloudinary: {
    cloudName: 'your-cloud-name' // Optional: for images
  }
})
```

### Phase 2: Content Structure

#### Create Content Files
```
content/
├── artist/
│   └── info.md
├── singles/
│   ├── chance-to-grow.md
│   ├── hearts-repair.md
│   └── wait-too-long.md
├── videos/
│   ├── hold-on-expresso.md
│   └── left-to-burn-acoustic.md
└── gallery/
    ├── performance-1.md
    └── portrait-1.md
```

#### Example Content Files

**Artist Info** (`content/artist/info.md`):
```markdown
---
name: "Seth Cort"
heroDescription: "I'm Seth Cort — a folk singer-songwriter and multi-instrumentalist from CapeTown, South Africa."
bio: "Rooted in the rich heritage of folk music and shaped by modern indie influences..."
profileImage: "/images/seth-profile.jpg"
heroImage: "/images/SETH_CORT_CutOut.svg"
---

# Seth Cort - Artist Bio

Extended biography content here...
```

**Single** (`content/singles/chance-to-grow.md`):
```markdown
---
title: "Chance To Grow"
releaseYear: "2025"
coverArt: "/images/chance_to_grow_cover_art.png"
previewAudio: "/audio/chance-to-grow-preview.mp3"
featured: true
order: 1
streamingLinks:
  - platform: "Spotify"
    url: "https://open.spotify.com/track/1fbgS4G5skBihaUmPlVgDB"
  - platform: "Apple Music"
    url: "https://music.apple.com/us/album/chance-to-grow-single/1802951709"
  - platform: "YouTube"
    url: "https://youtu.be/35PcJQGRe2Q"
---

A gentle but powerful reminder that the most meaningful connections often need time, patience, and space to truly flourish. The song explores the delicate balance between vulnerability and love, conveying a heartfelt plea for patience, understanding, and emotional space within a developing relationship to avoid unintentional emotional harm.
```

**Performance Video** (`content/videos/hold-on-expresso.md`):
```markdown
---
title: "Seth Cort - Hold On (feat Mark Haze)"
platform: "youtube"
videoId: "BeoGehYi4mc"
thumbnail: "https://img.youtube.com/vi/BeoGehYi4mc/hqdefault.jpg"
featured: true
order: 1
---

The debut single "Hold On" showcases Seth's signature folk sound blending traditional elements with contemporary production. Filmed at the Expresso Show Studio, this video captures the essence of hope and perseverance.
```

### Phase 3: Update Components

#### Data Fetching Composables
```typescript
// composables/useContent.ts
export const useArtistInfo = async () => {
  const { data } = await $fetch('/api/_content/query/artist/info')
  return data
}

export const useSingles = async () => {
  return await queryContent('singles')
    .sort({ order: 1, releaseYear: -1 })
    .find()
}

export const usePerformanceVideos = async () => {
  return await queryContent('videos')
    .sort({ order: 1 })
    .find()
}

export const useGalleryImages = async (category?: string) => {
  let query = queryContent('gallery')
  
  if (category) {
    query = query.where({ category })
  }
  
  return await query.sort({ order: 1 }).find()
}
```

#### Updated Page Component
```vue
<!-- pages/index.vue -->
<template>
  <div>
    <Header />
    
    <!-- Dynamic Hero Section -->
    <Hero 
      v-if="artistInfo"
      :firstName="firstName" 
      :lastName="lastName"
      :description="artistInfo.heroDescription"
      :backgroundImage="artistInfo.heroImage"
      showStar="true"
      showScrollIndicator="true"
    />
    
    <!-- Dynamic Singles Section -->
    <SectionLayout id="discovery">
      <SectionTitle title="Releases" />
      <LazySinglesShowcase :singles="singles" />
    </SectionLayout>
    
    <!-- Dynamic Performance Videos -->
    <SectionLayout id="performance" bgColor="bg-dark">
      <SectionTitle title="Performances" />
      <div class="video-grid">
        <LazyVideoPlayer 
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
  </div>
</template>

<script setup>
// Fetch content from markdown files
const { data: artistInfo } = await useAsyncData('artist', () => 
  queryContent('artist/info').findOne()
)

const { data: singles } = await useAsyncData('singles', () => 
  queryContent('singles').sort({ order: 1 }).find()
)

const { data: performanceVideos } = await useAsyncData('videos', () => 
  queryContent('videos').sort({ order: 1 }).find()
)

// Parse artist name
const firstName = computed(() => artistInfo.value?.name?.split(' ')[0] || 'Seth')
const lastName = computed(() => artistInfo.value?.name?.split(' ')[1] || 'Cort')
</script>
```

### Phase 4: Simple Admin Interface (Optional)

#### Create Admin Page
```vue
<!-- pages/admin/index.vue -->
<template>
  <div class="admin-container">
    <h1>Content Management</h1>
    
    <div class="admin-sections">
      <NuxtLink to="/admin/artist" class="admin-card">
        <h3>Artist Info</h3>
        <p>Update bio, hero description, images</p>
      </NuxtLink>
      
      <NuxtLink to="/admin/singles" class="admin-card">
        <h3>Singles</h3>
        <p>Add/edit songs and releases</p>
      </NuxtLink>
      
      <NuxtLink to="/admin/videos" class="admin-card">
        <h3>Videos</h3>
        <p>Manage performance videos</p>
      </NuxtLink>
      
      <NuxtLink to="/admin/gallery" class="admin-card">
        <h3>Gallery</h3>
        <p>Upload and organize images</p>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.admin-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.admin-card {
  padding: 2rem;
  background: #1a1a1a;
  border-radius: 8px;
  text-decoration: none;
  color: white;
  transition: transform 0.2s ease;
}

.admin-card:hover {
  transform: translateY(-2px);
}
</style>
```

## 🔧 Content Editing Workflow

### Method 1: Direct File Editing
1. Edit `.md` files in your code editor
2. Commit changes to Git
3. Deploy automatically

### Method 2: Git-based CMS (Advanced)
Add a simple admin interface using:
- **Forestry** (free tier available)
- **Netlify CMS** (free, open source)
- **Tina CMS** (Git-based, modern interface)

### Method 3: Custom Forms (Build your own)
Create simple forms in your admin section that update the markdown files.

## 🚀 Benefits of This Approach

### ✅ Advantages:
- **No separate login required**
- **Version control with Git**
- **Free (no monthly costs)**
- **Fast (static content)**
- **SEO friendly**
- **Simple backup (it's all in Git)**

### ⚠️ Considerations:
- **Less sophisticated editing interface**
- **Manual image optimization** (unless using Cloudinary)
- **No real-time collaboration**
- **Requires basic Git knowledge**

## 💰 Cost Comparison

| Solution | Monthly Cost | Admin Interface | Media Handling |
|----------|-------------|-----------------|----------------|
| **Nuxt Content** | $0 | Basic/Custom | Manual/Cloudinary |
| **Sanity** | $0-20 | Excellent | Excellent |
| **Strapi** | Server costs | Good | Good |
| **Contentful** | $25+ | Excellent | Excellent |

## 📁 Migration from Current Setup

1. **Extract existing data** from your components
2. **Create markdown files** with frontmatter
3. **Update components** to use `queryContent()`
4. **Test thoroughly**
5. **Deploy**

## 🎯 Recommendation

For your use case, I'd suggest:

**Start with Nuxt Content** - it's simple, free, and keeps everything in one place. If you later need more advanced features, you can always migrate to Sanity.

Would you like me to implement this simpler approach instead?