import axios from 'axios'
import { BaseURI } from './constants';

const service =axios.create({
    baseURL:BaseURI,
    timeout:600000,
})
service.interceptors.request.use(function (config) {
  config.headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  };
  config.baseURL=BaseURI
  console.log("我是拦截器");
  console.log("woshitoken",sessionStorage.getItem("token"));
   //注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
    //  const token = JSON.parse(window.sessionStorage.getItem('token')); //这里取token之前，你肯定需要先拿到token,存一下
     if (sessionStorage.getItem("token")) {
       //  config.params = {'token':token} //如果要求携带在参数中
       console.log("akjshdgjkahsgdkajhsgduywquiwfgquiyweuqiy6333333333333333333");
       config.headers.Authorization = sessionStorage.getItem("token"); //如果要求携带在请求头中
     }
    // 在发送请求之前做些什么
    console.log("config",config);
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
export default service;

/* 统一封装get请求 */
export const get = (url, params, config = {baseURL:BaseURI}) => {
    return new Promise((resolve, reject) => {
        service({
            method: 'get',
            url,
            params,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

/* 统一封装post请求  */
export const post = (url, data, config = {baseURL:BaseURI}) => {
    return new Promise((resolve, reject) => {
        service({
            method: 'post',
            url,
            data,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}
