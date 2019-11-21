import fs from 'fs'

import fetchAndParseData from './src/fetchAndParseData'

const API_ENDPOINT = 'https://data-endpoint.herokuapp.com/data'

async function main() {
  const parsedData = await fetchAndParseData(API_ENDPOINT)

  fs.writeFileSync('./output.json', JSON.stringify(parsedData, null, 2), 'utf8')
}

main()
