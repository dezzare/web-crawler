const { argv } = require('node:process')
const { crawPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main(){
    if (argv.length < 3){
        console.log("No website provided.")
        
    }
    if (argv.length > 3){
        console.log("Too many arguments provided.")
    }
    const baseURL = argv[2]
    console.log(`Starting crawl of: ${baseURL}`)
    const pages = await crawPage(baseURL, baseURL, {})
    printReport(pages)
}

main()