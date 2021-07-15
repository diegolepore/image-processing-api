import express from 'express'
import { promises as fsPromises } from 'fs'
import fs from 'fs'
import path from 'path'

const imageProcessingMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {

  const filename = req.query.filename
  const width = (req.query.width as unknown) as string
  const height = (req.query.height as unknown) as string
  const sourceformat = req.query.sourceformat || 'jpeg'
  const outputformat = req.query.outputformat || 'jpeg'

  if(filename && width && height) {
    const fullFilePath = `full/${filename}.${sourceformat}`
    const thumbFilePath = `thumb/${filename}-w${width}-h${height}.${outputformat}`
    
    try {
      if (!fs.existsSync('thumb')) {
        await fsPromises.mkdir('thumb')
      }
    } catch (error) {
      process.stdout.write(error)
      res.status(500)
    }

    fs.stat(fullFilePath, (error)  => {
      if(error) {
        const errorMsg = `File with sourceformat: ${sourceformat} don'n exist`
        process.stdout.write(errorMsg)
        res.status(500).send(errorMsg)
      }
    })

    fs.stat(thumbFilePath, (error)  => {
      if (error) {
        next()
      } else {
        process.stdout.write('File already exist')
        res.sendFile(path.resolve(thumbFilePath))
      }
    })
  } else {
    const errorMsg = 'Image can\'t be processed'
    process.stdout.write(errorMsg)
    res.send(errorMsg)
  }
}

export default imageProcessingMiddleware