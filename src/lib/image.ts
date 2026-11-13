/** Serve a local public image through the Netlify Image CDN. */
export const cdn = (src: string, width: number) =>
  `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&fm=webp`
