import express from 'express'
import { promises as fsPromises } from 'fs'
import fs from 'fs'
import path from 'path'

const inlineStyles = `position: absolute; left: 50%; 
  top: 100px; transform: translateX(-50%);
  font-family: sans-serif; text-align: center;
  padding: 0 20px 10px 20px; background-color: #ffdd59; border-radius: 8px;`

const checkFullImageExists = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const { filename, width, height } = req.query
  
  if(filename && width && height) {
    const sourceformat = req.query.sourceformat || 'jpeg'
    const fullFilePath = `full/${filename}.${sourceformat}`
    fs.stat(fullFilePath, (error)  => {
      if(error) {
        const errorMsg = `<div style="${inlineStyles}">
          <p>Sorry, the <strong>filename</strong> doesn't exist 😭.</p> 
          <p>Make sure you don't have any typo or something.</p>
        </div>`
        // eslint-disable-next-line no-console
        console.log(error)
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
    // eslint-disable-next-line no-console
    console.log(errorMsg)
    res.status(500).send(errorMsg)
  }
}

const checkThumbDirExists = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    if (!fs.existsSync('thumb')) {
      await fsPromises.mkdir('thumb')
    }
    
    next()
  } catch (error) {
    const errorMsg = `<div style="${inlineStyles}">
      <p>Whoops! Something went wrong, please try again.</p> 
    </div>`
    // eslint-disable-next-line no-console
    console.log(error)
    res.status(500).send(errorMsg)
  }
}

const checkThumbImageExists = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  const filename = req.query.filename
  const width = (req.query.width as unknown) as string
  const height = (req.query.height as unknown) as string
  const outputformat = req.query.outputformat || 'jpeg'
  const thumbFilePath = `thumb/${filename}-w${width}-h${height}.${outputformat}`
    
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