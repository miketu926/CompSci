---
name: Article 1
description: Learn how to use @nuxt/content.
---

# Lorem ipsum
## dolor—sit—amet
### consectetur &amp; adipisicing
#### elit
##### elit


---
title: Home
---

## Links

<nuxt-link to="/tutorials">Nuxt Link to Blog</nuxt-link>

<a href="/">Html Link to Homepage</a>

[Markdown Link to Blog](/)

<a href="https://nuxtjs.org">External link html</a>

[External Link markdown](https://nuxtjs.org)


Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.


```js{1,3-5}[server.js]
const http = require('http')
const bodyParser = require('body-parser')

http.createServer((req, res) => {
  bodyParser.parse(req, (error, body) => {
    res.end(body)
  })
}).listen(3000)
```

## HTML

<p><span class="note">A mix of <em>Markdown</em> and <em>HTML</em>.</span></p>
