import axios from "axios";

const MODE : string = process.env.NODE_ENV
axios.create({
    baseURL: MODE === 'development' ? '/api' : "http://127.0.0.1:7001",
    withCredentials: true,
    headers: {
        'X-Requested-With':'XMLHttpRequest',
        'Authorization':`${localStorage.getItem('token') || null}`,
        "Content-type": "application/json"
    }
  });

axios.interceptors.response.use(res => {
    if(typeof res.data !== 'object') {
        console.log('service error')
        return Promise.reject(res)
    }

    if(res.data.code !== 200) {
        if(res.data.msg) {
            console.log(res.data.msg)
        }
        if(res.data.code === 401) {
            window.location.href = '/login'
        }
        return Promise.reject(res.data)
    }
    return res.data
})

export default axios