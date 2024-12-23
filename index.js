import "dotenv/config"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import urlRoutes from "./routers/url.js"

const app = express()

const { MONGO_USER, MONGO_PASSWORD, CLUSTER_URL, DATABASE, PORT } = process.env

await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${CLUSTER_URL}/${DATABASE}?retryWrites=true&w=majority`)
  .then(async () => {
    console.log("Connected to MongoDB")
  }).catch(async (error) => {
    console.log(`Get errors while connected to MongoDB, error: ${error}`)
  })

app.use(cors({ credentials: true, origin: true }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('trust proxy', 1)

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
