import express from  'express'
import cors from  'cors'

const app = express()
app.use(cors(
//     {
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }
))
app.use(express.json)

import mainRouter from'./routes/index.route.js'

app.use("/api/v1",mainRouter);

export default app