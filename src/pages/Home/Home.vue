<template>


    <div class="msite">
      <!--首页头部-->

      <HeaderTop :title="address.name">
        <router-link class="header_search" slot="search" to="/search">
          <i class="iconfont icon-sousuo"></i>
        </router-link>

        <router-link class="header_login" slot="login" :to="user._id ? '/userInfo' : '/login'">
          <span class="header_login_text" v-if="!user._id">登录|注册</span>
          <span class="header_login_text" v-else>
            <i class="iconfont icon-person" ></i>
          </span>
        </router-link>
      </HeaderTop>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container" v-if="foodTypeList.length>0">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(foodType, index) in foodTypeArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(food, index) in foodType" :key="index">
                <div class="food_container">
                  <img :src="baseImgUrl+food.image_url">
                </div>
                <span>{{food.title}}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <img src="/static/images/msite_back.svg" v-else>
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>

        <ShopList/>
      </div>
    </div>


</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import {mapState} from 'vuex'

  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'

  export default {
    name: 'Home',
    data() {
      return {
        baseImgUrl: `https://fuss10.elemecdn.com`
      }
    },
    mounted() {
      this.$store.dispatch('getFoodType');
      this.$store.dispatch('getShopList');
    },
    computed: {
      ...mapState(['address','foodTypeList','user']),
      foodTypeArr() {
        //由footTypeList得到二维数组的食品列表作为轮播滑块
        const footTypeList = this.foodTypeList;
        let arr = [];
        let midArr = [];
        let count = 0;
        footTypeList.forEach((food) => {
          count++;
          midArr.push(food);
          if (midArr.length == 8 || count==footTypeList.length) {
            arr.push(midArr)
            midArr = [];
          }
        })
        return arr;
      }
    },
    watch: {
      foodTypeList (value) {
        //数组中有数据了之后
        //创建swiper对象  需要界面更新之后再创建swiper对象
        this.$nextTick(() => {//一旦完成界面更新，就调用
          new Swiper('.swiper-container', {
            //direction: 'vertical',
            loop: true,  //循环
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            }
          })
        })
      }
    },
    components: {
      HeaderTop,
      ShopList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774

</style>
