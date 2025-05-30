import { SpeedInsights } from '@vercel/speed-insights/vue'

export default defineNuxtPlugin(() => {
  // Register the component globally
  return {
    provide: {
      speedInsights: SpeedInsights
    }
  }
})