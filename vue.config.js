module.exports = {
  transpileDependencies: ['vuetify'],
  pwa: {
    themeColor: '#3f51b5',
    manifestPath: 'manifest.webmanifest',
    manifestOptions: {
      short_name: 'Einkaufsliste',
      name: 'Einkaufsliste',
      description: 'Eine einfache Einkaufsliste',
      icons: [
        {
          src: '/img/icons/cart-192x192.png',
          type: 'image/png',
          sizes: '192x192',
        },
        {
          src: '/img/icons/cart-512x512.png',
          type: 'image/png',
          sizes: '512x512',
        },
      ],
      start_url: '/',
      background_color: '#fff',
      display: 'standalone',
      scope: '/',
    },
  },
};
