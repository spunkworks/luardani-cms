const CMS_URL = 'https://luardani-cms.vercel.app'

module.exports = async function handler(req, res) {
  try {
    const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '?where[status][equals]=published&limit=100&sort=createdAt'
    const response = await fetch(`${CMS_URL}/api/products${query}`)
    const data = await response.text()

    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json')
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    res.status(response.status).send(data)
  } catch (error) {
    res.status(502).json({ message: 'Products are temporarily unavailable.' })
  }
}
