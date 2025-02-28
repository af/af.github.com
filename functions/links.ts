const PINBOARD_URL = 'https://feeds.pinboard.in/json/u:_af?count=150&cb=linksCb'

// https://developers.cloudflare.com/pages/functions/routing/
// https://developers.cloudflare.com/pages/how-to/refactor-a-worker-to-pages-functions/
export const onRequest = async (
  _request: Request,
  _env: unknown,
  _context: { next: () => Promise<Response> },
) => {
  console.log(_env, _context)

  const response = await fetch(PINBOARD_URL)
  return response
}
