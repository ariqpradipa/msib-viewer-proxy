import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.use(cors({
  origin: '*',
  allowHeaders: ['Content-Type'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  maxAge: 600,
  credentials: true,
}))

app.get('/', (c) => {
  return c.text('You reached our API!');
})

app.get('/opportunity', async (c) => {
  const response = await fetch('https://api.kampusmerdeka.kemdikbud.go.id/magang/browse/opportunities?', {
    method: 'GET'
  });

  const data: unknown = await response.json(); // Parse the response body
  console.log(data);
  return c.json(data as {}); // Return the fetched data as the response
});

app.post('/opportunity', async (c) => {
  const body = await c.req.json(); // Parse the request body

  const response = await fetch(`https://api.kampusmerdeka.kemdikbud.go.id/magang/browse/opportunities?${body.params}`, {
    method: 'GET'
  });

  const data: unknown = await response.json(); // Parse the response body
  return c.json(data as {}); // Return the fetched data as the response
});

export default app