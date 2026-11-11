export const workboxOptions = {
  globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,txt}'],
  // MDI font URLs include a version query absent from precache entries.
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/, /^v$/],
  cleanupOutdatedCaches: true,
};
