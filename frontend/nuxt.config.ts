// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  
  nitro: {
    preset: 'node-server'
  },
  
  runtimeConfig: {
    apiSecret: '123',
    
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8080/api',
      appName: 'Todo App',
      appVersion: '1.0.0'
    }
  },
  
  css: [],
  
  devServer: {
    port: 3000,
    host: '0.0.0.0'
  },
  
  app: {
    head: {
      title: 'Todo App - Gestionnaire de tâches',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Application de gestion de tâches développée avec Nuxt.js et Docker' 
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  build: {
    analyze: false
  },
  
  ssr: true
})
