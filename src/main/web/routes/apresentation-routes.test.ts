import request from 'supertest'
import app from '../config/app'

describe('Apresentation Routes', () => {
  test('Should return an account on sucess', async () => {
    const response = await request(app).get('/api/version')
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      status: 'SUCCESS',
      version: '0.0.0',
      description: 'API para o sistema HIPET'
    })
  })
})
