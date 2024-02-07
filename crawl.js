function normalizeURL(url) {
    const myUrl = new URL(url)
    let result = myUrl.hostname + myUrl.pathname
    while (result[result.length-1] === '/'){
        result = result.substring(0, result.length - 1);
    }
    return result
}

module.exports = {
    normalizeURL
}
