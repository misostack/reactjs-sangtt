import axios from 'axios'
import { getTokenLocal } from 'utils/localStorage'
let Token = null

function getToken(){
  if(!Token) Token = getTokenLocal();
  return Token
}

export default function(){
  return axios.create({
    baseURL: process.env.API_URI,
    timeout: 5000,
    headers: {
      'access-token': getToken()
    }
  })
}

