const PINBOARD_URL = 'https://feeds.pinboard.in/json/u:_af?count=100&cb=linksCb'
const GH_URL = 'https://api.github.com/users/af/repos?sort=updated&per_page=15'

const TTL = 60 * 60 * 12 // 12 hours (data changes infrequently)

// https://developers.cloudflare.com/pages/functions/routing/
// https://developers.cloudflare.com/pages/how-to/refactor-a-worker-to-pages-functions/
export const onRequest = async ({ request, waitUntil }: { request: Request; waitUntil: any }) => {
  const qs = new URL(request.url).searchParams

  const url = qs.get('src') === 'links' ? PINBOARD_URL : GH_URL

  // @ts-expect-error
  const cache = caches.default
  const apiRequest = new Request(url, {
    headers: {
      Accept: 'application/json',
      // Need a UA for GitHub's API
      'User-Agent': 'af',
    },
  })
  const cacheHit = await cache.match(apiRequest)
  if (cacheHit) return cacheHit

  const response = await fetch(apiRequest)
  const responseToCache = new Response(response.clone().body, response)

  // Add cache control headers
  responseToCache.headers.set('Cache-Control', `public, max-age=${TTL}`)
  waitUntil(cache.put(apiRequest, responseToCache))
  return response
}
