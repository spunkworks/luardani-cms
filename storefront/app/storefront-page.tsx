import fs from 'node:fs'
import path from 'node:path'

function storefrontBody() {
  const html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8')
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || ''

  return body
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi, '')
}

export function StorefrontPage() {
  return <div dangerouslySetInnerHTML={{ __html: storefrontBody() }} />
}
