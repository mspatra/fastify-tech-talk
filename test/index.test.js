import buildServer from '../index.js'
import config from '../config.js'

describe('Health Route', () => {
  const fastify = buildServer(config)

  it('health route', async () => {
    const res = await fastify.inject({
      url: '/health'
    })
    console.log("*****", res.json())
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({
      statusCode: 200,
      message: "Successful"
    });
  });
})

describe('Login Route', () => {
  const fastify = buildServer(config)

  it('When username and password correct, ', async () => {
    const res = await fastify.inject({
      url: '/login',
      method: "post",
      body: {
        username: "suman",
        password: "suman"
      }
    })
    expect(res.statusCode).toBe(200);
    expect(res.json()).toHaveProperty("token");
  });

  it('When username and password incorrect, ', async () => {
    const res = await fastify.inject({
      url: '/login',
      method: "post",
      body: {
        username: "suman",
        password: "sumanp"
      }
    })
  
    expect(res.statusCode).toBe(401)
  });
})