import { promises as fs } from 'fs'
import { join, relative, dirname } from 'path'

async function exists(path: string) {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

async function copyPngFiles(sourcePath: string, targetPath: string) {
  try {
    const entries = await fs.readdir(sourcePath, { withFileTypes: true })

    for (const entry of entries) {
      const srcPath = join(sourcePath, entry.name)
      
      if (entry.isDirectory()) {
        await copyPngFiles(srcPath, targetPath)
      } else if (entry.name.toLowerCase().match(/\.(png|jpe?g|gif|webp)$/i)) {
        // Remove 'content' from the path if it exists
        const relPath = relative('./content', srcPath).replace(/^content\//, '')
        const destPath = join(targetPath, relPath)
        
        // Create destination directory if it doesn't exist
        await fs.mkdir(dirname(destPath), { recursive: true })
        
        // Copy the file
        await fs.copyFile(srcPath, destPath)
        console.log(`Copied: ${relPath} >>> ${destPath}`)
      }
    }
  } catch (error) {
    console.error('Error copying files:', error)
  }
}

export default defineNitroPlugin(async (nitro) => {
  const contentDir = './content'
  let outputDir = './.output/public'
  
  if (process.env.VERCEL) {
    outputDir = './.vercel/output/static'
  }
  if (process.env.NUXT_ENV_GENERATE || true) {
    outputDir = './dist'
  }

  if (await exists(contentDir)) {
    console.log('📁 Starting asset migration...')
    await copyPngFiles(contentDir, outputDir)
    console.log('✨ Asset migration complete')
  }
})
