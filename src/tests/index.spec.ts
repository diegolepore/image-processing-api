import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

describe('🧪 Main API route', () => {

  it('Should load main API route with status 200', async () => {
    const response = await request.get('/api')
    // console.log('response.status: ', response.status)
    expect(response.status).toBe(200)
  })

})
