import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'node:fs'
import path from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'json-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST' && req.url === '/api/save') {
            let body = ''
            req.on('data', chunk => body += chunk)
            req.on('end', () => {
              try {
                const { filename, data } = JSON.parse(body)
                const filePath = path.resolve(__dirname, `src/data/${filename}.json`)
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: true }))
              } catch (err) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: err.message }))
              }
            })
          } else {
            next()
          }
        })
      }
    }
  ],
  server: {
    port: 5173,
    open: true
  }
})
