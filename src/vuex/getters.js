/**
 * 计算属性的对象
 */
export default {
  totalCount(state) {
    return state.cartFoods.reduce((total, food) => total + food.count, 0);
  },
  totalPrice(state) {
    return state.cartFoods.reduce((total, food) => total + food.count*food.price, 0);
  }
}
