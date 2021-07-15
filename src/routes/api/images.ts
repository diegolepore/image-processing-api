import express from 'express'
import sharp from 'sharp'
import fs from 'fs'
import { promises as fsPromises } from 'fs'
import path from 'path'

const images = express.Router()

images.get('/', async (req, res): Promise<void> => {

  const filename = req.query.filename
  const width = (req.query.width as unknown) as string
  const height = (req.query.height as unknown) as string

  if(filename && width && height) {
    try {
      const fullFilePath = `full/${filename}.jpeg`
      const thumbFilePath = `thumb/${filename}.jpeg`

      if (!fs.existsSync('thumb')) {
        await fsPromises.mkdir('thumb')
      }

      fs.stat(thumbFilePath, (error, stats)  => {
        if (error) {
          (async () => {
            const image = await sharp(fullFilePath)
              .resize({ width: parseInt(width), height: parseInt(height) })
              .toBuffer()
            fs.writeFileSync(thumbFilePath, image)
            process.stdout.write(`
              Image has been processed:
              Stats: ${stats}
            `)
            res.status(200).sendFile(path.resolve(thumbFilePath))
          })()
        } else {
          process.stdout.write('File already exist')
          res.sendFile(path.resolve(thumbFilePath))
        }
      })
    } catch (error) {
      process.stdout.write(error)
      res.status(500)
    }

  } else {
    process.stdout.write('Image can\'t be processed')
    res.send('Image can\'t be processed')
  }
})

export default images
