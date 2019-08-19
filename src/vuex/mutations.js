/**
 * 直接更新state的多个方法的对象
 */
import Vue from 'vue'
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
  },
  [REQ_GOODS](state, {goods}) {
    state.goods = goods;
  },
  [REQ_RATINGS](state, {ratings}) {
    state.ratings = ratings;
  },
  [REQ_SHOP_INFO](state, {shopInfo}) {
    state.shopInfo = shopInfo;
  },
  [REQ_ADD_FOODCOUNT](state, {food}) {
    if (!food.count) {
      food.count = 1;
    } else {
      food.count++;
    }
  },
  [REQ_REDUCE_FOODCOUNT](state, {food}) {
    if (food.count) {
      food.count--;
    }
  },
  [REQ_UPDATE_FOODCOUNT](state, {food, isAdd}) {
    if (isAdd) {
      if (!food.count) {
        //food.count = 1; //新增属性。没有数据绑定效果.不能这样写
        /**
         * 对象
         * 属性名
         * 属性值
         */
        Vue.set(food, 'count', 1);//让新增的属性也有数据绑定
        //将food加到购物车CartFoods中
        state.cartFoods.push(food);
      } else {
        food.count++;
      }
    } else {
      if (food.count) {
        food.count--;
        if (food.count==0) {
          //要移除购物车中的这个food
          state.cartFoods.splice(state.cartFoods.indexOf(food), 1);
        }
      }
    }
  },
  [REQ_CLEARCAR](state) {
    //清除food中的count
    state.cartFoods.forEach((food) => {
      food.count = 0;
    });
    state.cartFoods = [];
  }
}
