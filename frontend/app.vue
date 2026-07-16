<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <client-only>
      <Toast />
      <LoadingOverlay />
    </client-only>
  </div>
</template>
