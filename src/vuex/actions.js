import {
  REQ_ADDRESS,
  REQ_FOOD_TYPE,
  REQ_SHOP_LIST,
  CHANGE_LOCATION,
  REQ_USER_INFO,
  REQ_RESET_USER_INFO,
  REQ_GOODS,
  REQ_RATINGS,
  REQ_SHOP_INFO,
  REQ_UPDATE_FOODCOUNT,
  REQ_ADD_FOODCOUNT,
  REQ_REDUCE_FOODCOUNT,
  REQ_CLEARCAR
} from './mutations-type'
import {
  reqAddress,
  reqFoodType,
  reqShopList,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods
} from '../api'
/**
 *传递来请求调用mutations的多个方法的对象
 */
export default {
  changeLocation({commit}) {
    let location_lon = '',location_lat = ''; // 经度,纬度
    //console.log(navigator.geolocation);
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function (position) {
        location_lon = position.coords.longitude;
        location_lat = position.coords.latitude;
         //alert('h5经度：'+location_lon);alert('h5纬度：'+location_lat);
        commit(CHANGE_LOCATION, {location_lat, location_lon})
      });
    }else {
      alert("您的设备不支持定位功能");
    }
  },
  async getAddress({commit, state}) {
    //发送ajax
    const geohash = state.latitude + ',' + state.longitude;
    const result = await reqAddress(geohash);
    //提交mutations
    if (result.code === 0) {
      const address = result.data;
      commit(REQ_ADDRESS, {address})
    }
  },
  async getFoodType({commit, state}) {
    //发送ajax
    const geohash = state.latitude + ',' + state.longitude;
    const result = await reqFoodType(geohash);
    //提交mutations
    if (result.code === 0) {
      const foodTypeList = result.data;
      commit(REQ_FOOD_TYPE, {foodTypeList})
    }
  },
  async getShopList({commit, state}) {
    //发送ajax
    const result = await reqShopList(state.latitude, state.longitude);
    //提交mutations
    if (result.code === 0) {
      const shopList = result.data;
      commit(REQ_SHOP_LIST, {shopList})
    }
  },
  userInfo({commit, state}, user) {
    commit(REQ_USER_INFO, {user})
  },
  async getUserInfo({commit}) {
    //异步获取用户信息
    const result = await reqUserInfo();
    if (result.code == 0) {
      const user = result.data;
      commit(REQ_USER_INFO, {user})
    }
  },
  async logout({commit}) {
    const result = await reqLogout();
    if (result.code == 0) {
      const user = result.data;
      //commit(REQ_USER_INFO, {})
      commit(REQ_RESET_USER_INFO);
    }
  },
  async getShopInfo({commit}) {
    const result = await reqShopInfo();
    if (result.code == 0) {
      commit(REQ_SHOP_INFO, {shopInfo: result.data})
    }
  },
  async getShopRatings({commit}) {
    const result = await reqShopRatings();
    if (result.code == 0) {
      commit(REQ_RATINGS, {ratings: result.data})
    }
  },
  async getShopGoods({commit}, callback) {
    const result = await reqShopGoods();
    if (result.code == 0) {
      commit(REQ_GOODS, {goods: result.data});
      //数据更新了。通知组件做接下来的事情 //数据更新之后执行
      callback && callback()
    }
  },
  updateFoodCount({commit}, {food, isAdd}) {
    //同步更新food的对应购买数量
    commit(REQ_UPDATE_FOODCOUNT, {food, isAdd})
    /*if (isAdd) {
      commit(REQ_ADD_FOODCOUNT, {food})
    } else {
      commit(REQ_REDUCE_FOODCOUNT, {food})
    }*/
  },
  clearCar({commit}) {
    commit(REQ_CLEARCAR)
  }

}
