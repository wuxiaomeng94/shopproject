/**
 * ajax请求
 */
import axios from 'axios'

export default function ajax(url, param={}, type='GET') {

  return new Promise(function (resolve, reject) {
    //执行异步ajax请求
    let promise;
    if (type === 'GET') {
      let getParams = param;
      if (param != null) {
        promise = axios.get(url, {
          params: getParams
        });
      } else {
        promise = axios.get(url);
      }
    } else {
      let postParams = new URLSearchParams();
      for(let obj in param) {
        postParams.append(obj, param[obj]);
      }
      promise = axios.post(url, postParams);
    }
    promise.then((response) => {
      //成功调用resolve()
      resolve(response.data);
    }).catch((error) => {
      //失败调用reject()
      reject(error);
    })
  })

}


