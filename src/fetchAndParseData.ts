import axios from 'axios'

import { UserObjectType, ParsedUserType } from '../types'
import parseItem from '../src/parseUtils'

export async function getData(apiEndpoint: string) {
  const res = await axios(apiEndpoint)
  return res.data as UserObjectType[]
}

async function fetchAndParseData(apiEndpoint: string) {
  const data = await getData(apiEndpoint)
  const parsedData: ParsedUserType[] = data.map(parseItem)

  return parsedData
}

export default fetchAndParseData
