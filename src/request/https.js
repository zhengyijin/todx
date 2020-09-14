/*
 * @Author: 郑义进
 * @Date: 2020-06-02 13:50:58
 * @LastEditTime: 2020-06-12 19:59:14
 * @LastEditors:  
 * @Description: axios请求封装
 * @FilePath: \lwbzzm-frontend\src\utils\request.js
 */

import axios from "axios"
import CONFIG from '../static/js/config'
import store from '../store/index'
const isProd = process.env.NODE_ENV === 'production';

import {
    getToken,

} from '../utils/token'
import {
    Toast
} from 'vant'


// 创建axios实例
const service = axios.create({
    timeout: 60000 // 请求超时时间
});

if (isProd) {
    service.defaults.baseURL = CONFIG.baseUrl;
}

// request拦截器
service.interceptors.request.use(

    config => {
        if (!isProd) {
            config.url = "/api" + config.url
        }
        if (getToken('token')) {
            config.headers["token"] = getToken('token');
        }
        store.commit('updateLoading', true)
        return config
    },
    error => {

        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        store.commit('updateLoading', false)
        const res = response.data;
        if (response.status === 401 || res.status === 40101) {

            return Promise.reject(res);
        }

        if (res.status === 40301) {

            return Promise.reject(res);
        }
        if (res.status === 40001) {

            return Promise.reject(res);
        }

        if (response.status !== 200 && res.status !== 200) {
            Toast({
                message: error.response.data.message,
                duration: 1500,
                forbidClick: true
            })

        } else {
            return response.data;
        }


    },
    error => {
        const err = error.data;
        store.commit('updateLoading', false)
        if (error.status === 500 || err.status === 500) {
            return Promise.reject(err);
        }
        if (error.status === 404 || err.status === 404) {
            return Promise.reject(err);
        } else {
            return Promise.reject(err);
        }


        return Promise.reject(error);
    }
);

export default service;