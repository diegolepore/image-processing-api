import express from 'express'
import fs from 'fs'
import path from 'path'
import { inlineStyles } from '../utilities/common.utilities'

const checkFullImageExists = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const { filename, width, height } = req.query
  
  if(filename && width && height) {
    const sourceformat = req.query.sourceformat || 'jpeg'
    const fullFilePath = path.resolve('images/', 'full/', `${filename}.${sourceformat}`)
    fs.stat(fullFilePath, (error)  => {
      if(error) {
        const errorMsg = `<div style="${inlineStyles}">
          <p>Sorry, the <strong>filename</strong> doesn't exist 😭.</p> 
          <p>Make sure you don't have any typo or something.</p>
        </div>`
        res.status(500).send(errorMsg)
      } else {
        next()
      }
    })
  } else {
    const errorMsg = `<div style="${inlineStyles}">
      <p>Bummer! 😕 You need to provide at least the three required parameters, namely:</p> 
      <ul style="list-style-type: none; margin: 0; padding: 0;">
        <li>"filename"</li> 
        <li>"width"</li>
        <li>"height"</li>
      </ul>
    </div>`
    res.status(500).send(errorMsg)
  }
}

const checkThumbDirExists = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    if (!fs.existsSync('images/thumb')) {
      await fs.promises.mkdir('images/thumb')
    }
    
    next()
  } catch (error) {
    const errorMsg = `<div style="${inlineStyles}">
      <p>Whoops! Something went wrong, please try again.</p> 
    </div>`
    res.status(500).send(errorMsg)
  }
}

const checkThumbImageExists = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  const filename = req.query.filename
  const width = (req.query.width as unknown) as string
  const height = (req.query.height as unknown) as string
  const outputformat = req.query.outputformat || 'jpeg'
  const thumbFilePath = path.resolve('images/', 'thumb/',`${filename}-w${width}-h${height}.${outputformat}`)
    
  fs.stat(thumbFilePath, (error)  => {
    if (error) { 
      next()
    } else {
      res.status(200).sendFile(path.resolve(thumbFilePath))
    }
  })
}

export {
  checkFullImageExists,
  checkThumbDirExists,
  checkThumbImageExists
}