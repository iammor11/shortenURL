import "dotenv/config"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import urlRoutes from "./routers/url.js"

const app = express()

const { MONGO_USER, MONGO_PASSWORD, CLUSTER_URL, DATABASE, PORT } = process.env

mongoose.set('autoIndex', false)

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${CLUSTER_URL}/${DATABASE}?retryWrites=true&w=majority&appName=Cluster0`)
  .then(async () => {
    console.log("Connected to MongoDB")
    await mongoose.connection.db.collection('shorturls').createIndex({ shortUrl: 1 }, { unique: true })
    await mongoose.connection.db.collection('shorturls').createIndex({ originalUrl: 1 }, { unique: true })
  }).catch(async (error) => {
    console.log(`Get errors while connected to MongoDB, error: ${error}`)
  })

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: 'Too many requests from this IP, please try again later.'
})

app.use(helmet())
app.use(cors({ credentials: true, origin: true }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('trust proxy', 1)
app.use(limiter)

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept, Authorization")
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }
  next()
})

app.use("/", urlRoutes)

app.use((req, res, next) => {
  const error = new Error(`There is no url of ${req.originalUrl} with ${req.method} method.`)
  res.status(404)
  next(error)
})

const port = PORT || 8080

app.listen(port, () => console.log(`Server running on port ${port}`))

export default app