/**
 * 使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data'

//返回goods的接口
Mock.mock('/shop/goods', {code: 0, data: data.goods})
//返回rating的接口
Mock.mock('/shop/rating', {code: 0, data: data.ratings})
//返回info的接口
Mock.mock('/shop/info', {code: 0, data: data.info})

// export default obj  不需要向外暴露任何数据, 只需要保存能执行即可

/**
 * "foods": [
 {
          "name": "南瓜粥",
          "price|10-20": 10,
          "oldPrice": "",
          "description": "甜粥",

          可以这样写：price|10-20，这样mock出来的数据会是10到20之间的随机的数据
          其他的生成随机数据的也有。mockjs的文档中可以看
 */
