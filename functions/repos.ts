const GH_URL = 'https://api.github.com/users/af/repos?sort=updated&per_page=15'

// https://developers.cloudflare.com/pages/functions/routing/
// https://developers.cloudflare.com/pages/how-to/refactor-a-worker-to-pages-functions/
export const onRequest = async (
  _request: Request,
  _env: unknown,
  _context: { next: () => Promise<Response> },
) => {
  const response = await fetch(GH_URL, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'af',
    },
  })
  return response
}
