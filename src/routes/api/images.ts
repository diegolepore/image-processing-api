import express from 'express'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import imageProcessingMiddleware from '../../middleware/images.middleware'

const images = express.Router()

images.get('/', imageProcessingMiddleware, async (req, res): Promise<void> => {

  const filename = req.query.filename
  const width = (req.query.width as unknown) as string
  const height = (req.query.height as unknown) as string
  const sourceformat = (req.query.sourceformat as unknown) as ( keyof sharp.FormatEnum | sharp.AvailableFormatInfo) || 'jpeg'
  const outputformat = (req.query.outputformat as unknown) as ( keyof sharp.FormatEnum | sharp.AvailableFormatInfo) || 'jpeg'
  const fullFilePath = `full/${filename}.${sourceformat}`
  const thumbFilePath = `thumb/${filename}-w${width}-h${height}.${outputformat}`

  try {
    const image = await sharp(fullFilePath)
      .toFormat(outputformat)
      .resize({ width: parseInt(width), height: parseInt(height) })
      .toBuffer()
    fs.writeFileSync(thumbFilePath, image)
    process.stdout.write('Image has been processed')
    res.status(200).sendFile(path.resolve(thumbFilePath))
  } catch (error) {
    process.stdout.write(error)
    res.status(500)
  }
})

export default images
