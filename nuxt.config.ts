// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/mdc'],
  runtimeConfig: {
    myApiKey: process.env.MY_API_KEY,
    azureClientId: process.env.AZURE_CLIENT_ID,
    azureTenantId: process.env.AZURE_TENANT_ID,
    azureClientSecret: process.env.AZURE_CLIENT_SECRET,
    defaultSiteId: process.env.SITE_ID,
    defaultDriveId: process.env.DRIVE_ID,
    defaultListId: process.env.LIST_ID,
    geminiApiKey: process.env.GEMINI_API_KEY,
    pineconeApiKey: process.env.PINECONE_API_KEY,
  },
})