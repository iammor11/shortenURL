import ShortUrl from "../models/url.js"

export const getShortURL = async (req, res, next) => {
  try {
    const { shortUrl } = req.params
    const url = await ShortUrl.findById(shortUrl).exec()
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

    const checkExistingUrl = await ShortUrl.findOne({ originalUrl }).exec()
    if (checkExistingUrl) {
      return res.status(200).json({
        message: "Url exists already!",
        result: checkExistingUrl?.shortUrl,
        success: true
      })
    }

    try {
      new URL(originalUrl)
    } catch (error) {
      return res.status(400).json({ message: "Invalid URL", error, success: false })
    }

    const hostUrl = NODE_ENV === "production" ? DEPLOYED_DOMAIN_URL : `http://localhost:${PORT}`
    const newUrl = new ShortUrl({ originalUrl })
    const shortUrl = `${hostUrl}/${newUrl._id}`
    newUrl.shortUrl = shortUrl
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