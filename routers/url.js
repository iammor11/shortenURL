import express from "express"
import { body, validationResult } from "express-validator"
import { getShortURL, addShortURL } from "../controllers/url.js"

const router = express.Router()

router.get("/:shortUrl", getShortURL)

router.post("/shortUrl",
    body("originalUrl").notEmpty().isURL().trim().withMessage("originalUrl should be a url!"),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().length === 2 ? errors.array()[1].msg : errors.array()[0].msg, error: errors.array(), success: false })
        }
        next()
    },
    addShortURL)

export default router