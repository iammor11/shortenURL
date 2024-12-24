
import request from "supertest"
import app from "./index"
import ShortUrl from "./models/url"

describe("URL Shortening Service Tests", () => {
    beforeAll(async () => {
        await ShortUrl.deleteMany()
    })

    afterEach(async () => {
        await ShortUrl.deleteMany()
    })

    it("should create a new short URL", async () => {
        const response = await request(app)
            .post("/shortUrl")
            .send({ originalUrl: "https://example.com" })
            .expect(200)

        expect(response.body).toHaveProperty("result")
    })

    it("should redirect to the original URL when provided with a short URL", async () => {
        const newUrl = new ShortUrl({
            originalUrl: "http://example.com",
            shortUrl: "http://localhost:3001/afdaf989789",
        })
        await newUrl.save()
        const id = (newUrl._id).toString()

        const response = await request(app)
            .get(`/${id}`)
            .expect(302)

        expect(response.headers.location).toBe("http://example.com")
    })

    it("should return 500 if wrong id provide", async () => {
        const response = await request(app)
            .get('/1641654jiuhb')
            .expect(500)

        expect(response.body.message).toBe("Something went wrong!")
    })

    it("should return 400 if the original URL is invalid", async () => {
        const response = await request(app)
            .post('/shortUrl')
            .send({ message: "originalUrl should be a url!" })
            .expect(400)

        expect(response.body.message).toBe('originalUrl should be a url!')
    })
})
