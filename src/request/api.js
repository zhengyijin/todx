/*
 * @Author: 郑义进
 * @Date: 2020-06-03 20:26:04
 * @LastEditTime: 2020-06-12 19:58:35
 * @LastEditors:  
 * @Description: api 接口
 * @FilePath: \lwbzzm-frontend\src\api\api.js
 */

import request from './https'

/**
 * post请求
 * @param {*} url 
 * @param {*} params 
 * @param {*} config 
 */
function post(url, params, config) {
    return new Promise((resolve, reject) => {
        request.post(url, params, config)
            .then((res) => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
    })
}

function get(url, param, config) {

    return new Promise((resolve, reject) => {
        request.get(url, param, config).then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 图片上传
 * @param {*} params 
 */
export const upload = params => {
    return post('/resource/upload', params, {
        headers: {
            "Content-type": "application/form-data; charset=UTF-8"
        }
    })
}

/**
 * 班组招募信息提交
 * @param {*} data 
 */
export const RecruitSubmit = data => post('/recruitInfo/submit', data)

/**
 * 获取招募填写后的展示信息
 * @param {*} data 
 */
export const GetRecruitInfo = data => get('/recruitInfo/getOne', data)

/**
 * 获取用户信息
 * @param {*} 
 */
export const GetUserInfo = data => get('/user/getUserInfo?fileIds=' + data)


/**
 * 获取用户信息
 * @param {*} 
 */
export const GetUserInfo2 = data => get('/user/getUserInfo')
    /**
     * 招标信息提交
     * @param {*} data 
     */
export const ZhaoBiao = data => post('/signUpRecord/signUp', data)

/**
 * 删除文件或者图片
 */
export const DeleteFile = data => post('/resource/delete?fileIds=' + data)

/**
 * 获取用户授权URL
 */
export const getAuthorizedLoginUrl = (data) => get('/auth/getAuthorizedLoginUrl?flag=' + data)

/**
 * 微信授权登录
 */
export const authorizedLogin = (data) => post('/auth/authorizedLogin?code=' + data)

/**
 * 获取订单状态
 */
export const getStatus = () => get('/recruitInfo/getStatus')

/**
 * 获取公告信息
 * @param {*} data 
 */
export const getNotice = data => post('/signUpRecord/getTenderAcm?acm_id=' + data)

/**
 * 获取工种
 * @param {*} data 
 */
export const getWorkTypes = data => post('/recruitInfo/getWorkTypes', data)

/**
 * 是否是库内班组
 * @param {*} data 
 */
export const isBanZu = data => post('/recruitInfo/isExistNcdb?id_card=' + data)

/**
 * 同步NC班组库数据
 * @param {*} data 
 */
export const syncNcDb = data => post('/recruitInfo/syncNcDb?id_card=' + data)

/**
 * 通过身份证获取库内班组信息
 * @param {*} data 
 */
export const getNcDbInfo = data => post('/recruitInfo/getNcDbInfo?id_card=' + data)

/**
 * 获取材料招标公告信息
 * @param {*} data 
 */
export const zhaoBiaoMaterial = data => post('/signUpRecord/getMetarialTenderAcm?acm_id=' + data)


/**
 * 获取签名
 * @param {*} data 
 */
export const signature = data => get('/auth/getSignature?url=' + data)

/**
 * 获取材料招标列表
 * @param {*} data 
 */
export const materialList = data => get(`/signUpRecord/getMetarialTenderAcmList?fuzzy=${data.fuzzy}&limit=${data.limit}&page=${data.page}`)

/**
 * 获取班组招标列表
 * @param {*} data 
 */
export const banZulList = data => get(`/signUpRecord/getTenderAcmList?fuzzy=${data.fuzzy}&limit=${data.limit}&page=${data.page}`)