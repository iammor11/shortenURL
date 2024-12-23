import ShortUrl from "../models/url"

export const getShortURL = async (req, res, next) => {
  try {
    const { shortUrl } = req.params

    const url = await ShortUrl.findOne({ shortUrl })
    if (!url) {
      return res.status(404).json({
        message: "URL not found!",
        success: false
      })
    }
    
    return res.redirect(url.originalUrl)
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error,
      success: false
    })
  }
}

export const addShortURL = async (req, res, next) => {
  try {
    const { originalUrl } = req.body
    const { DEPLOYED_DOMAIN_URL, PORT, NODE_ENV } = process.env

    const checkExistingUrl = await ShortUrl.findOne({ originalUrl })
    if (checkExistingUrl) {
      return res.status(401).json({
        message: "originalUrl exists already!",
        success: false
      })
    }

    const isUrl = new URL(originalUrl)

    if (isUrl?.origin !== null) {
      return res.status(400).json({ error: "Invalid URL" })
    }

    const hostUrl = NODE_ENV === "production" ? DEPLOYED_DOMAIN_URL : `http://localhost:${PORT}`
    const uuid = uuidv4()
    const shortUrl = `${hostUrl}/${uuid}`

    const newUrl = new ShortUrl({ originalUrl, shortUrl })
    await newUrl.save()

    return res.status(200).json({
      message: "Short URL created successfully!",
      result: newUrl.shortUrl,
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error,
      success: false
    })
  }
}