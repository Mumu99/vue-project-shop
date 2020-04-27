// 用来写接口函数的
// 引入axios
import axios from './ajax'
// 引入config配置文件
import {
  AJAX_TIMEOUT,
  AJAX_BASE_URL
} from '@/config'

// 配置一个通用的基础路径, 和请求超时的时间
const ajax = axios.create({
  baseUrl: AJAX_BASE_URL, // 默认路径
  timeOut: AJAX_TIMEOUT // 请求超时时间
})

// 请求拦截器
axios.interceptors.request.use(config => {})

// 响应拦截器
axios.interceptors.response.use(response => {}, err => {})

// 暴露
export default ajax