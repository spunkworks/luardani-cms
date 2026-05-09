const CMS_URL = 'https://luardani-cms.vercel.app'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const query = url.search || '?where[status][equals]=published&limit=100&sort=createdAt'
    const response = await fetch(`${CMS_URL}/api/products${query}`, {
      next: { revalidate: 60 },
    })
    const data = await response.text()

    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
        'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch {
    return Response.json({ message: 'Products are temporarily unavailable.' }, { status: 502 })
  }
}
