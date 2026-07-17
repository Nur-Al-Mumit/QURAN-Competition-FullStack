import posthog from "posthog-js"

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()

  const posthogClient = posthog.init(runtimeConfig.public.posthogKey, {
    api_host: runtimeConfig.public.posthogHost || "https://app.posthog.com",
    person_profiles: "identified_only",
    loaded: (ph) => {
      if (import.meta.dev) {
        ph.opt_out_capturing()
      }
    },
  })

  nuxtApp.hook("page:finish", () => {
    posthogClient.capture("$pageview")
  })

  return {
    provide: {
      posthog: posthogClient,
    },
  }
})
