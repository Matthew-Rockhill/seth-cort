// plugins/icons.js
import { defineNuxtPlugin } from 'nuxt/app'
import * as HeroiconsOutline from '@heroicons/vue/24/outline'
import * as HeroiconsSolid from '@heroicons/vue/24/solid'

export default defineNuxtPlugin((nuxtApp) => {
  // Register Heroicons Outline components
  Object.entries(HeroiconsOutline).forEach(([name, component]) => {
    nuxtApp.vueApp.component(name, component)
  })

  // Register Heroicons Solid components
  Object.entries(HeroiconsSolid).forEach(([name, component]) => {
    // Add "Solid" suffix to avoid name conflicts
    nuxtApp.vueApp.component(name + 'Solid', component)
  })
})