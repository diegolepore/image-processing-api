import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)

describe('🧪 Main /images route', () => {

  it('Should return 500 error when getting /images without corresponding query strings', async () => {
    const response = await request.get('/api/images')
    expect(response.status).toBe(500)
  })

})
