import express from 'express'
import routes from './routes/index'

const app = express()
const port = process.env.PORT || 3000

app.use('/api', routes)

app.listen(port, (): void => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${port}`)
})

export default app