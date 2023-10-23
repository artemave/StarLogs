import { createServer } from 'node:http'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { lookup } from 'mime-types'

const server = createServer((req, res) => {
  if (req.url === '/') {
    const indexHtml = readFileSync('index.html', 'utf8')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(indexHtml)
  } else {
    const assetPath = join(process.cwd(), req.url.slice(1))

    if (existsSync(assetPath)) {
      const assetContent = readFileSync(assetPath)
      const mimeType = lookup(assetPath)
      res.writeHead(200, { 'Content-Type': mimeType })
      res.end(assetContent)
    } else {
      const notFoundHtml = readFileSync('404.html', 'utf8')
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end(notFoundHtml)
    }
  }
})

server.listen(3000, () => {
  console.log(`Listening on http://localhost:3000`)
})
