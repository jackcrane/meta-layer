const express = require('express')
const request = require('request')
const cheerio = require('cheerio')

const app = express()

app.get('/metadata', (req, res) => {
  const url = req.query.url
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html)
      const title = $('head title').text()
      const keywords = $('meta[name="keywords"]').attr('content')
      const description = $('meta[name="description"]').attr('content')
      const image = $('meta[property="og:image"]').attr('content')

      res.json({
        title: title,
        keywords: keywords,
        description: description,
        image: image
      })
    }
  })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
