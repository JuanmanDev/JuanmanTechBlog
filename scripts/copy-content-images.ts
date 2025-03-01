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
      } else if (entry.name.toLowerCase().endsWith('.png')) {
        const relPath = relative('./content', srcPath)
        const destPath = join(targetPath, relPath)
        
        // Create destination directory if it doesn't exist
        await fs.mkdir(dirname(destPath), { recursive: true })
        
        // Copy the file
        await fs.copyFile(srcPath, destPath)
        console.log(`Copied: ${relPath}`)
      }
    }
  } catch (error) {
    console.error('Error copying files:', error)
  }
}

export default defineNitroPlugin(async () => {
  const contentDir = './content'
  const outputDir = './.output/public'

  if (await exists(contentDir)) {
    await copyPngFiles(contentDir, outputDir)
  }
})
