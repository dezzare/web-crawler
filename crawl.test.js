const {test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')


test('test normalizeURL, should return hostname+path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/'))
        .toBe('blog.boot.dev/path')
    expect(normalizeURL('https://blog.boot.dev/path'))
        .toBe('blog.boot.dev/path')
    expect(normalizeURL('http://blog.BOOt.dev/path/'))
        .toBe('blog.boot.dev/path')
    expect(normalizeURL('http://blog.boot.dev/path'))
        .toBe('blog.boot.dev/path')
    expect(normalizeURL('http://blog.boot.dev/path//'))
        .toBe('blog.boot.dev/path')
})

test('getURLsFromHTML, absolute', () =>{
    const inputHtmlBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path/">
        </a>
    </body>
</html>
`
    const inpputURL = "https://blog.boot.dev/path"
    const input = getURLsFromHTML(inputHtmlBody, inpputURL)
    const result = ["https://blog.boot.dev/path/"]
    expect(input).toEqual(result)
})

test('getURLsFromHTML, relative', () =>{
    const inputHtmlBody = `
<html>
    <body>
        <a href="/path/">
        </a>
    </body>
</html>
`
    const inpputURL = "https://blog.boot.dev"
    const input = getURLsFromHTML(inputHtmlBody, inpputURL)
    const result = ["https://blog.boot.dev/path/"]
    expect(input).toEqual(result)
})

test('getURLsFromHTML, multiple', () =>{
    const inputHtmlBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path1/">
        Blog post 1
        </a>
        <p>Some words</p>
        <a href="/path2/">
        </a>
        <a href="/path3/">
        </a>
        <a href="https://blog.boot.dev/path4/">
        Blog post 4
        </a>
    </body>
</html>
`
    const inpputURL = "https://blog.boot.dev"
    const input = getURLsFromHTML(inputHtmlBody, inpputURL)
    const result = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/", "https://blog.boot.dev/path3/", "https://blog.boot.dev/path4/"]
    expect(input).toEqual(result)
})

test('getURLsFromHTML, invalid', () =>{
    const inputHtmlBody = `
<html>
    <body>
        <a href="invalid">
        </a>
    </body>
</html>
`
    const inpputURL = "https://blog.boot.dev"
    const input = getURLsFromHTML(inputHtmlBody, inpputURL)
    const result = []
    expect(input).toEqual(result)
})
