const { argv } = require('node:process')
const { crawPage } = require('./crawl.js')

function main(){
    if (argv.length < 3){
        console.log("No website provided.")
        
    }
    if (argv.length > 3){
        console.log("Too many arguments provided.")
    }
    const baseURL = argv[2]
    console.log(`Starting crawl of: ${baseURL}`)
    crawPage(baseURL)
    
}

main()