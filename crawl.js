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
                console.log(`error with absolute url: ${err.message}`)
            }
        }
    }
    return urls
}

async function crawPage(baseURL) {
    try {
        const resp = await fetch(baseURL)
        if (resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${baseURL}`)
            return
        }
        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")){
            console.log(`non html response, content type: ${contentType} on page: ${baseURL}`)
            return
        }
        console.log(await resp.text())

    } catch(err) {
        console.log(err.message)
    }
    
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawPage
}
