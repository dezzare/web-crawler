const {test, expect } = require('@jest/globals')
const { sortPages } = require('./report.js')

test('sortPages', () => {
    const arg = {
        'https://blog.boot.dev/path1/': 3,
        'https://blog.boot.dev/': 1,
        'https://blog.boot.dev/path2/': 2,
        'https://blog.boot.dev/path0/': 4,

    }
    const actual = sortPages(arg)
    const expected = [
            ['https://blog.boot.dev/path0/', 4],
            ['https://blog.boot.dev/path1/', 3],
            ['https://blog.boot.dev/path2/', 2],
            ['https://blog.boot.dev/', 1]
    ]
    expect(actual).toEqual(expected)

})