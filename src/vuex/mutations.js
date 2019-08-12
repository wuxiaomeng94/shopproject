/**
 * 直接更新state的多个方法的对象
 */
import {
  REQ_ADDRESS,
  REQ_FOOD_TYPE,
  REQ_SHOP_LIST,
  CHANGE_LOCATION,
  REQ_USER_INFO,
  REQ_RESET_USER_INFO
} from './mutations-type'

export default {
  [CHANGE_LOCATION](state, {location}) {
    if (location) {
      state.latitude = location.location_lat;
      state.longitude = location.location_lon;
    }
  },
  [REQ_ADDRESS](state, {address}) {
    state.address = address;
  },
  [REQ_FOOD_TYPE](state, {foodTypeList}) {
    state.foodTypeList = foodTypeList;
  },
  [REQ_SHOP_LIST](state, {shopList}) {
    state.shopList = shopList;
  },
  [REQ_USER_INFO](state, {user}) {
    state.user = user;
  },
  [REQ_RESET_USER_INFO](state) {
    state.user = {};
  }
}
