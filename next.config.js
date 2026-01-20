/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      // Cache de imágenes - estrategia CacheFirst
      urlPattern: /^https?.*\.(png|jpg|jpeg|webp|svg|gif|ico)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
        },
      },
    },
    {
      // Cache de fuentes - estrategia CacheFirst
      urlPattern: /^https?:\/\/fonts\.(googleapis|gstatic)\.com/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-cache',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
        },
      },
    },
    {
      // Cache de páginas estáticas - estrategia StaleWhileRevalidate
      urlPattern: /^https?.*\/c\/(calderas|aire-acondicionado)/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'pages-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24, // 1 día
        },
      },
    },
    {
      // Cache de API y datos - estrategia NetworkFirst
      urlPattern: /^https?.*\/api\//,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60, // 1 hora
        },
      },
    },
    {
      // Cache general - estrategia StaleWhileRevalidate
      urlPattern: /^https?.*/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'general-cache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24, // 1 día
        },
      },
    },
  ],
})

const nextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Optimización de imágenes
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Headers para CDN caching
  async headers() {
    return [
      {
        // Imágenes estáticas
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Fuentes
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Páginas de categorías (cacheable pero revalidable)
        source: '/c/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}

module.exports = withPWA(nextConfig)
