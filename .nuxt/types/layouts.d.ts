import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "only-nav" | "split" | "default"
declare module 'nuxt/app' {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}