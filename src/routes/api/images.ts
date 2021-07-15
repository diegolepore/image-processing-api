import express from 'express'

const images = express.Router()

images.get('/', (req, res) => {
  res.send('Main images route')
})

export default images
