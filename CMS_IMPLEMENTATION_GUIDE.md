# CMS Implementation Guide: Sanity + Nuxt 3

## Overview
This guide walks through implementing Sanity CMS for the Seth Cort Music website, transforming it from hardcoded content to a fully dynamic, database-driven system with an intuitive admin interface.

## 🎯 Why Sanity CMS?

### Perfect for Music Websites:
- **Media Management**: Built-in CDN, image transformations, audio file support
- **Real-time Editing**: Instant preview of changes
- **Structured Content**: Perfect for songs, albums, performances, bio content
- **Performance**: Global CDN, automatic optimizations
- **Developer Experience**: Excellent Nuxt 3 integration

### Cost-Effective:
- **Free Tier**: 3 users, 5GB assets, 500K API requests/month
- **Paid Plans**: Start at $20/month for scaling needs

## 📋 Implementation Steps

### Phase 1: Setup & Configuration (Day 1)

#### 1. Install Sanity Dependencies
```bash
npm install @sanity/nuxt @sanity/client @sanity/vision
npm install --save-dev @sanity/cli
```

#### 2. Create Sanity Project
```bash
npx sanity init
# Choose:
# - Create new project
# - Use default dataset configuration
# - Add TypeScript
```

#### 3. Configure Nuxt Integration
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@sanity/nuxt'],
  sanity: {
    projectId: 'your-project-id',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: true, // Enable CDN for better performance
    visualEditing: {
      studioUrl: 'http://localhost:3333'
    }
  }
})
```

### Phase 2: Content Schemas (Day 1-2)

#### Define Content Types for Music Website:

**1. Artist Information Schema**
```typescript
// sanity/schemas/artist.ts
export default {
  name: 'artist',
  title: 'Artist Information',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Artist Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4
    },
    {
      name: 'heroDescription',
      title: 'Hero Section Description',
      type: 'text'
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image'
    }
  ]
}
```

**2. Singles/Songs Schema**
```typescript
// sanity/schemas/single.ts
export default {
  name: 'single',
  title: 'Singles',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Song Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'releaseYear',
      title: 'Release Year',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'coverArt',
      title: 'Cover Art',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'previewAudio',
      title: 'Preview Audio',
      type: 'file',
      options: {
        accept: 'audio/*'
      }
    },
    {
      name: 'streamingLinks',
      title: 'Streaming Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Spotify', value: 'spotify' },
                  { title: 'Apple Music', value: 'apple' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'SoundCloud', value: 'soundcloud' }
                ]
              }
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url'
            }
          ]
        }
      ]
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this single prominently'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }
  ],
  orderings: [
    {
      title: 'Release Year, New',
      name: 'releaseYearDesc',
      by: [
        { field: 'releaseYear', direction: 'desc' }
      ]
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
}
```

**3. Performance Videos Schema**
```typescript
// sanity/schemas/performanceVideo.ts
export default {
  name: 'performanceVideo',
  title: 'Performance Videos',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' }
        ]
      }
    },
    {
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'thumbnail',
      title: 'Custom Thumbnail',
      type: 'image',
      description: 'Optional: Override default video thumbnail'
    },
    {
      name: 'featured',
      title: 'Featured Video',
      type: 'boolean'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }
  ]
}
```

**4. Gallery Images Schema**
```typescript
// sanity/schemas/galleryImage.ts
export default {
  name: 'galleryImage',
  title: 'Gallery Images',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Image Title',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Performance', value: 'performance' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Behind the Scenes', value: 'behind-scenes' },
          { title: 'Tour', value: 'tour' }
        ]
      }
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }
  ]
}
```

### Phase 3: Nuxt Integration (Day 2-3)

#### 1. Create Composables for Data Fetching
```typescript
// composables/useSanity.ts
export const useArtistInfo = async () => {
  const { $sanity } = useNuxtApp()
  
  const query = `*[_type == "artist"][0]{
    name,
    bio,
    heroDescription,
    "profileImage": profileImage.asset->url,
    "heroImage": heroImage.asset->url
  }`
  
  return await $sanity.fetch(query)
}

export const useSingles = async () => {
  const { $sanity } = useNuxtApp()
  
  const query = `*[_type == "single"] | order(order asc, releaseYear desc){
    title,
    releaseYear,
    description,
    "coverArt": coverArt.asset->url,
    "previewAudio": previewAudio.asset->url,
    streamingLinks,
    featured
  }`
  
  return await $sanity.fetch(query)
}

export const usePerformanceVideos = async () => {
  const { $sanity } = useNuxtApp()
  
  const query = `*[_type == "performanceVideo"] | order(order asc){
    title,
    description,
    platform,
    videoId,
    "thumbnail": thumbnail.asset->url,
    featured
  }`
  
  return await $sanity.fetch(query)
}

export const useGalleryImages = async (category?: string) => {
  const { $sanity } = useNuxtApp()
  
  const filter = category ? `&& category == "${category}"` : ''
  const query = `*[_type == "galleryImage" ${filter}] | order(order asc){
    title,
    "image": image.asset->url,
    alt,
    category
  }`
  
  return await $sanity.fetch(query)
}
```

#### 2. Update Components to Use Dynamic Data
```vue
<!-- pages/index.vue - Updated Hero Section -->
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
// Fetch data from Sanity
const { data: artistInfo } = await useAsyncData('artist', () => useArtistInfo())
const { data: singles } = await useAsyncData('singles', () => useSingles())
const { data: performanceVideos } = await useAsyncData('videos', () => usePerformanceVideos())
const { data: galleryImages } = await useAsyncData('gallery', () => useGalleryImages())

// Parse artist name
const firstName = computed(() => artistInfo.value?.name?.split(' ')[0] || 'Seth')
const lastName = computed(() => artistInfo.value?.name?.split(' ')[1] || 'Cort')

// SEO
useHead({
  title: `${artistInfo.value?.name || 'Seth Cort'} | Folk Singer-Songwriter`,
  meta: [
    { name: 'description', content: artistInfo.value?.bio || 'Folk singer-songwriter from Cape Town' }
  ]
})
</script>
```

### Phase 4: Sanity Studio Setup (Day 3)

#### 1. Configure Studio
```typescript
// sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'

// Import schemas
import artist from './sanity/schemas/artist'
import single from './sanity/schemas/single'
import performanceVideo from './sanity/schemas/performanceVideo'
import galleryImage from './sanity/schemas/galleryImage'

export default defineConfig({
  name: 'seth-cort-studio',
  title: 'Seth Cort Music CMS',
  projectId: 'your-project-id',
  dataset: 'production',
  
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Artist Information')
              .child(S.document().schemaType('artist').documentId('artist')),
            S.divider(),
            S.listItem()
              .title('Singles')
              .child(S.documentTypeList('single')),
            S.listItem()
              .title('Performance Videos')
              .child(S.documentTypeList('performanceVideo')),
            S.listItem()
              .title('Gallery Images')
              .child(S.documentTypeList('galleryImage')),
          ])
    }),
    visionTool(),
    media() // Enhanced media management
  ],
  
  schema: {
    types: [artist, single, performanceVideo, galleryImage]
  }
})
```

#### 2. Add Studio Scripts to package.json
```json
{
  "scripts": {
    "studio": "sanity dev",
    "studio:build": "sanity build",
    "studio:deploy": "sanity deploy"
  }
}
```

### Phase 5: Migration Strategy (Day 4-5)

#### 1. Data Migration Script
```typescript
// scripts/migrate-to-sanity.ts
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  token: 'your-write-token',
  useCdn: false
})

// Migrate existing singles data
const migrateSingles = async () => {
  const existingSingles = [
    // Your current hardcoded singles data
  ]
  
  for (const single of existingSingles) {
    await client.create({
      _type: 'single',
      title: single.title,
      releaseYear: single.releaseYear,
      description: single.description,
      // Upload and reference images/audio files
      streamingLinks: single.streamingLinks,
      order: existingSingles.indexOf(single)
    })
  }
}

// Run migration
migrateSingles()
```

## 🚀 Benefits After Implementation

### For Content Management:
✅ **Easy Updates**: Add new songs, update bio, change images through web interface  
✅ **Real-time Preview**: See changes immediately  
✅ **Media Management**: Drag-and-drop file uploads with automatic optimization  
✅ **Collaboration**: Multiple team members can manage content  

### For Performance:
✅ **CDN Delivery**: All media served from global CDN  
✅ **Image Optimization**: Automatic WebP/AVIF conversion, responsive images  
✅ **Caching**: Built-in caching strategies  
✅ **Mobile Optimized**: Automatic mobile image variants  

### For Development:
✅ **Type Safety**: Full TypeScript support  
✅ **Hot Reloading**: Instant development feedback  
✅ **Version Control**: Content versioning and rollback  
✅ **Backup**: Automatic content backup  

## 📅 Implementation Timeline

- **Day 1**: Setup Sanity project, configure Nuxt integration
- **Day 2**: Create content schemas, test data structure
- **Day 3**: Update components to use dynamic data
- **Day 4**: Setup Sanity Studio interface
- **Day 5**: Migrate existing content, test thoroughly

## 💰 Cost Breakdown

### Sanity Free Tier (Suitable for your needs):
- 3 users
- 5GB asset storage
- 500K API requests/month
- **Cost: $0/month**

### Paid Tier (If you scale):
- 10 users
- 25GB asset storage
- 2M API requests/month
- **Cost: $20/month**

## 🔧 Alternative Solutions Considered

| Solution | Pros | Cons | Best For |
|----------|------|------|----------|
| **Sanity** ✅ | Great media handling, real-time, excellent DX | Learning curve | Music websites |
| **Strapi** | Self-hosted, very flexible | More setup required | Custom needs |
| **Contentful** | Popular, mature | Expensive for media | Enterprise |
| **Supabase** | Full backend solution | More complex setup | Full applications |

## 🎯 Next Steps

1. **Create Sanity account** at sanity.io
2. **Follow implementation guide** above
3. **Start with artist info and singles** - easiest to migrate
4. **Test thoroughly** before going live
5. **Train content editors** on the Studio interface

Would you like me to start implementing this solution? I can begin with the Sanity setup and schema creation.