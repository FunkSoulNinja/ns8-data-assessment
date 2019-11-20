import axios from 'axios'
import fs from 'fs'

import { UserObjectType, ParsedUserType } from './types'
import parseItem from './parseUtils'

async function getData() {
  const res = await axios('https://data-endpoint.herokuapp.com/data')
  return res.data as UserObjectType[]
}

async function fetchAndParseData() {
  const data = await getData()
  const parsedData: ParsedUserType[] = data.map(parseItem)

  fs.writeFileSync('output.json', JSON.stringify(parsedData, null, 2), 'utf8')
}

fetchAndParseData()
