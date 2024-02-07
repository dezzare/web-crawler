function sortPages(pages){
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => {
        // a[1] = number in the Array [url, number]
        return b[1] - a[1]
    })
    
    return pagesArr
}

module.exports = {
    sortPages
}