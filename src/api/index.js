import ajax from './ajax'

const BASE_URL = `/api`;
/**
 * 写这么一个总的请求的function，传进来的url都以/开头，和环境中的url地址拼接，例如http://localhost:8080/search
 * 可能会有需要在axious请求时加入header的，再考虑再写
 * @param url   请求地址
 * @param param 参数对象
 * @param type  请求类型  GET或POST  不传则默认GET
 * @returns {*|Promise<any>}
 */
export const httpRequest = (url, param, type) => ajax(process.env.API_URL+url, param, type)
//根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
//2、获取食品分类列表](#2获取食品分类列表)
export const reqFoodType = () => ajax(`${BASE_URL}/index_category`)
// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)
export const reqShopList = (latitude, longitude) => ajax(`${BASE_URL}/shops`, {latitude, longitude})
// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)
export const reqSearchShop = (geohash, keyword) => ajax(`${BASE_URL}/search_shops`, {geohash, keyword})
// [5、获取一次性验证码](#5获取一次性验证码)
// [6、用户名密码登陆](#6用户名密码登陆)
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(`${BASE_URL}/login_pwd`, {name, pwd, captcha}, 'POST')
// [7、发送短信验证码](#7发送短信验证码)
export const reqSendCode = (phone) => ajax(`${BASE_URL}/sendcode`, {phone})
// [8、手机号验证码登陆](#8手机号验证码登陆)
export const reqMsgLogin = (phone, code) => ajax(`${BASE_URL}/login_sms`, {phone, code}, 'POST')
// [9、根据会话获取用户信息](#9根据会话获取用户信息)
export const reqUserInfo = () => ajax(`${BASE_URL}/userinfo`)
// [10、用户登出](#10用户登出)
export const reqLogout = () => ajax(`${BASE_URL}/logout`)


