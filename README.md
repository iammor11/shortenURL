1) First install the libraries:
npm i

2) For server starts:
npm start

3) APIs:
BASE URL: domain

1.1) For creating a short URL: /shortUrl
METHOD: post
BODY: { originalUrl }
RESPONSE: { message: "...", result: true, success: true }
DESCRIPTION: will send the short url in result field

1.2) URL: /:shortUrl
METHOD: get
DESCRIPTION: will redirect to the original url

4) For testing write:
npx jest