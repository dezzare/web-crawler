const {JSDOM } = require('jsdom')

function normalizeURL(url) {
    const myUrl = new URL(url)
    let result = myUrl.hostname + myUrl.pathname
    while (result[result.length-1] === '/'){
        result = result.substring(0, result.length - 1);
    }
    return result
}

function getURLsFromHTML(htmlBody, baseUrl){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const link of linkElements){
        if (link.href.slice(0,1) === '/'){
            //relative link
            try { 
                const urlObj = new URL(`${baseUrl}${link.href}`)
                urls.push(urlObj.href)
            } catch(err){
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            //absolute
            try { 
                const urlObj = new URL(link.href)
                urls.push(urlObj.href)
            } catch(err){
                console.log(`error with absolute url: ${err.message} url:${link.href}`)
            }
        }
    }
    return urls
}

async function crawPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }
    
    const normalizedCurrentURL = normalizeURL(currentURL)
    if (pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1
    console.log(`Crawling: ${currentURL}`)

    try {
        const resp = await fetch(currentURL)
        if (resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")){
            console.log(`ERROR: non html response, content type: ${contentType} on page: ${currentURL}`)
            return pages
        }

        const htmlBody = await resp.text()
        const nextURLS = getURLsFromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLS){
            pages = await crawPage(baseURL, nextURL, pages)
        }
        return pages

    } catch(err) {
        console.log(err.message)
    }
    
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawPage
}
