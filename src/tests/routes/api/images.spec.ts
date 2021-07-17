import supertest from 'supertest'
import app from '../../../index'
import fs from 'fs'
import path from 'path'

const request = supertest(app)
const errorRoute = '/api/images?filename=foo&width=200&height=200'
const routeImage200x200 = '/api/images?filename=laptop&width=200&height=200'
const routeImage200x200Svg = '/api/images?filename=laptop&width=200&height=200&outputformat=svg'
const routeImage300x300SourceJPEGOutputPNG = '/api/images?filename=laptop&width=300&height=300&sourceformat=jpeg&outputformat=png'
const routeImage1200x1200SourcePNGOutputJPG = '/api/images?filename=lavender&width=1200&height=1200&sourceformat=png&outputformat=jpg'
const routeImage300x300SourcePng = '/api/images?filename=laptop&width=200&height=200&sourceformat=png'
const thumbPath = path.resolve('images/', 'thumb/', 'laptop-w200-h200.jpeg')
const thumbPathPng = path.resolve('images/', 'thumb/', 'laptop-w300-h300.png')
const thumbPathJpg = path.resolve('images/', 'thumb/', 'lavender-w1200-h1200.jpg')

describe('🧪 /images resource ', () => {
  afterAll( async ()=> {
    await fs.unlink(thumbPath, (err) => { if (err) throw err })
    await fs.unlink(thumbPathPng, (err) => { if (err) throw err })
    await fs.unlink(thumbPathJpg, (err) => { if (err) throw err })
  })

  it('Should return 500 error if filename does not exists', async () => {
    const response = await request.get(errorRoute)
    expect(response.status).toBe(500)
  })

  it('Should generate image and save it into the thumb folder with status 201', async () => {
    const response = await request.get(routeImage200x200)
    fs.access(thumbPath, fs.constants.F_OK, (err) => {
      expect(err).toBe(null)
    })
    expect(response.status).toBe(201)
  })

  it('Should return existent image if the same parameters are passed with status 200', async () => {
    const response = await request.get(routeImage200x200)
    fs.access(thumbPath, fs.constants.F_OK, (err) => {
      expect(err).toBe(null)
    })
    expect(response.status).toBe(200)
  })
  
  it('Should generate image with sourceformat JPEG and outputformat PNG extenssions with status 201', async () => {
    const response = await request.get(routeImage300x300SourceJPEGOutputPNG)
    fs.access(thumbPathPng, fs.constants.F_OK, (err) => {
      expect(err).toBe(null)
    })
    expect(response.status).toBe(201)
  })

  it('Should generate image with sourceformat PNG and outputformat JPG extenssions with status 201', async () => {
    const response = await request.get(routeImage1200x1200SourcePNGOutputJPG)
    fs.access(thumbPathJpg, fs.constants.F_OK, (err) => {
      expect(err).toBe(null)
    })
    expect(response.status).toBe(201)
  })

  it('Should return status 500 error if it cannot be generated to SVG format', async () => {
    const response = await request.get(routeImage200x200Svg)
    expect(response.status).toBe(500)
  })

  it('Should return status 500 error sourceformat does not exist', async () => {
    const response = await request.get(routeImage300x300SourcePng)
    expect(response.status).toBe(500)
  })

  it('Returns a status 500 error if width property value is not a number', async () => {
    const response = await request.get('/api/images?filename=laptop&width=bad&height=200')
    expect(response.status).toBe(500)
  })

  it('Returns a status 500 error if height property value is not a number', async () => {
    const response = await request.get('/api/images?filename=laptop&width=200&height=bad')
    expect(response.status).toBe(500)
  })
})
