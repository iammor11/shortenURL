import mongoose from "mongoose"

const Schema = mongoose.Schema

const shortUrlSchema = new Schema(
    {
        originalUrl: {
            type: String,
            required: [true, "originalUrl is required!"],
            unique: true,
            trim: true,
            lowercase: true
        },
        shortUrl: {
            type: String,
            required: [true, "shortUrl is required!"],
            unique: true,
            trim: true,
            lowercase: true
        }
    },
    { timestamps: true }
)

const ShortUrl = mongoose.model("shortUrl", shortUrlSchema)

export default ShortUrl