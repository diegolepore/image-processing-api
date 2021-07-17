import supertest from 'supertest'
import app from '../../../index'
import fs from 'fs'
import path from 'path'

const request = supertest(app)

describe('🧪 /images resource ', () => {
  const errorRoute = '/api/images?filename=foo&width=200&height=200'
  const routeImage200x200 = '/api/images?filename=laptop&width=200&height=200'
  const routeImage200x200Png = '/api/images?filename=laptop&width=200&height=200&outputformat=png'
  const routeImage200x200Svg = '/api/images?filename=laptop&width=200&height=200&outputformat=svg'
  const thumbPath = path.resolve('thumb/', 'laptop-w200-h200.jpeg')
  const thumbPathPng = path.resolve('thumb/', 'laptop-w200-h200.png')

  afterAll( async ()=> {
    await fs.unlink(thumbPath, (err) => { if (err) throw err })
    await fs.unlink(thumbPathPng, (err) => { if (err) throw err })
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
  
  it('Should generate image with PNG extenssion with status 201', async () => {
    const response = await request.get(routeImage200x200Png)
    fs.access(thumbPathPng, fs.constants.F_OK, (err) => {
      expect(err).toBe(null)
    })
    expect(response.status).toBe(201)
  })

  it('Should return status 500 error if it cannot be generated to SVG format', async () => {
    const response = await request.get(routeImage200x200Svg)
    expect(response.status).toBe(500)
  })
})
