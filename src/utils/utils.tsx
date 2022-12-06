import axios from './axios';
const MODE: string = process.env.NODE_ENV

const baseUrl = MODE == 'development' ? '/api' : 'http://127.0.0.1:7001';
export const imgUrlTrans = (url : string) => {
    if (url && url.startsWith('http')) {
      return url
    } else {
      url = `${MODE == 'development' ? 'http://127.0.0.1:7001' : baseUrl}${url}`
      return url
    }
  }