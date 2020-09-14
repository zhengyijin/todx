/*
 * @Author: 郑义进
 * @Date: 2020-06-03 20:37:28
 * @LastEditTime: 2020-06-09 16:36:10
 * @LastEditors:  
 * @Description: In User Settings Edit
 * @FilePath: \lwbzzm-frontend\src\utils\token.js
 */


/**
 * 获取token
 */
export function getToken(key) {
    return JSON.parse(window.localStorage.getItem(key))
}

/**
 * 设置token
 * @param {} val 
 */
export function setToken(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val))
}

/**
 * 删除token
 * @param {*} key 
 */
export function removeToken(key) {
    window.localStorage.removeItem(key)
}