import express from 'express'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { inlineStyles } from '../../utilities/common.utilities'
import { checkFullImageExists, checkThumbDirExists, checkThumbImageExists } from '../../middleware/images.middleware'

const imagesMiddleware = [checkFullImageExists, checkThumbDirExists, checkThumbImageExists]
const images = express.Router()

images.get('/', imagesMiddleware, async (req: express.Request, res: express.Response): Promise<void> => {
  const filename = req.query.filename
  const width = (req.query.width as unknown) as string
  const height = (req.query.height as unknown) as string
  const sourceformat = (req.query.sourceformat as unknown) as ( keyof sharp.FormatEnum | sharp.AvailableFormatInfo) || 'jpeg'
  const outputformat = (req.query.outputformat as unknown) as ( keyof sharp.FormatEnum | sharp.AvailableFormatInfo) || 'jpeg'
  const fullFilePath = path.resolve('images/', 'full/', `${filename}.${sourceformat}`)
  const thumbFilePath = path.resolve('images/', 'thumb/',`${filename}-w${width}-h${height}.${outputformat}`)

  try {
    const image = await sharp(fullFilePath)
      .toFormat(outputformat)
      .resize({ width: parseInt(width), height: parseInt(height) })
      .toBuffer()
      
    fs.writeFileSync(thumbFilePath, image)
    // eslint-disable-next-line no-console
    console.log('✅ Image has been successfully processed! ✅')
    res.status(201).sendFile(path.resolve(thumbFilePath))
  } catch (error) {
    const errorMsg = `<div style="${inlineStyles}">
      <p>Image cannot be processed.</p>
    </div>`
    // eslint-disable-next-line no-console
    console.log(error)
    res.status(500).send(errorMsg)
  }
})

export default images
