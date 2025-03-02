import { join } from 'node:path'
import { readFileSync, existsSync } from 'node:fs'
import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  const path = event.path

  // Check if the request is for an image
  if (path.match(/\.(png|jpg|jpeg|gif|webp)$/)) {
    const filePath = join(process.cwd(), 'content', path)

    if (existsSync(filePath)) {
      const file = readFileSync(filePath)
      const mimeType = getMimeType(filePath)
      return new Response(file, {
        headers: { 'Content-Type': mimeType },
      })
    } else {
      return new Response('File not found', { status: 404 })
    }
  }
})

// Helper function to get MIME type based on file extension
function getMimeType(filePath: string): string {
  const extension = filePath.split('.').pop()?.toLowerCase()
  switch (extension) {
    case 'png':
      return 'image/png'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'gif':
      return 'image/gif'
    case 'webp':
      return 'image/webp'
    default:
      return 'application/octet-stream'
  }
}