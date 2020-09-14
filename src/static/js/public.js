/*
 * @Author: 郑义进
 * @Date: 2020-06-05 19:30:31
 * @LastEditTime: 2020-06-05 19:31:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lwbzzm-frontend\src\static\js\public.js
 */

/**
 * 获取指定路由参数
 * @param {*} name 
 * @param {*} url 
 */
export function getUrlKey(name, url) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null

}