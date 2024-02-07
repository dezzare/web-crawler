const {test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')


test('test normalizeURL', () => {
    expect(normalizeURL('https://blog.boot.dev/path/'))
        .toBe('blog.boot.dev/path')
    expect(normalizeURL('https://blog.boot.dev/path'))
        .toBe('blog.boot.dev/path')
    expect(normalizeURL('http://blog.boot.dev/path/'))
        .toBe('blog.boot.dev/path')
    expect(normalizeURL('http://blog.boot.dev/path'))
        .toBe('blog.boot.dev/path')
    expect(normalizeURL('http://blog.boot.dev/path//'))
        .toBe('blog.boot.dev/path')
})


