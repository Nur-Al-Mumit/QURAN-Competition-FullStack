import posthog from "posthog-js"

export const usePosthog = () => {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$posthog as typeof posthog
}
