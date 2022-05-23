/**
 * axios的二次封装
 */
import axios from "axios";
// 进度条
import nprogress from 'nprogress'
// 进度条样式
import 'nprogress/nprogress.css'

import {getUUIDToken} from "@/utiles/uuid_token";

// 创建axios实例
const requests = axios.create({
    // baseURL
    baseURL: '/api',
    // 请求超时时间
    timeout: 5000
})


// 请求拦截器, 在请求之前做一些操作
requests.interceptors.request.use(config=> {
    // 进度条开始
    nprogress.start()

    const uuidToken = getUUIDToken()
    if (uuidToken) {
        config.headers.userTempId = uuidToken
    }

    return config;
})

// 响应拦截器, 接收到响应后执行的操作
requests.interceptors.response.use(res=> {
    // 进度条结束
    nprogress.done()

    return res.data
}, err=> {
    nprogress.done()
    return Promise.reject(Error('请求失败'))
})

export default requests
