/**
 * mutations的更新方法常量
 */
//h5根据当前位置获取当前位置经纬度
export const CHANGE_LOCATION = `CHANGE_LOCATION`;
//获取地址
export const REQ_ADDRESS = `REQ_ADDRESS`;
//食品list
export const REQ_FOOD_TYPE = `REQ_FOOD_TYPE`;
//获取商家list
export const REQ_SHOP_LIST = `REQ_SHOP_LIST`;
//获取到的用户信息，放到state的user中
export const REQ_USER_INFO = `REQ_USER_INFO`;
//退出登录，将user信息置空
export const REQ_RESET_USER_INFO = `REQ_RESET_USER_INFO`;

export const REQ_GOODS = `REQ_GOODS`;

export const REQ_RATINGS = `REQ_RATINGS`;

export const REQ_SHOP_INFO = `REQ_SHOP_INFO`;

//增加购买数量和减少购买数量写两个mutation。好像没这个必要
export const REQ_ADD_FOODCOUNT = `REQ_ADD_FOODCOUNT`;
export const REQ_REDUCE_FOODCOUNT = `REQ_REDUCE_FOODCOUNT`;

export const REQ_UPDATE_FOODCOUNT = `REQ_UPDATE_FOODCOUNT`;

export const REQ_CLEARCAR = `REQ_CLEARCAR`;

export const REQ_SEARCH_SHOPLIST = `REQ_SEARCH_SHOPLIST`;

