<template>

  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginType=='1'}" @click="loginType='1'">短信登录</a>
          <a href="javascript:;" :class="{on: loginType=='2'}" @click="loginType='2'">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: loginType=='1'}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" autocomplete="off">
              <button :disabled="!verifyPhone || second!=0" class="get_verification" type="button"
                      :class="{right_phone: verifyPhone}" @click.prevent="getCode">
                {{second? `已发送${second}s`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: loginType=='2'}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" autocomplete="off">
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="pwd" autocomplete="off">
                <input type="text" maxlength="8" placeholder="密码" v-else v-model="pwd" autocomplete="off">
                <div class="switch_button " :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd?'off':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="changeCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" type="submit">登录</button>
          <!--<mt-button type="primary" @click.native="login" class="login_submit"></mt-button>-->
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>

    <Tip :alertText="alertText" v-if="showAlertText" @closeTip="closeTip"/>
  </section>

</template>

<script>
  import {Toast} from 'mint-ui'
  import Tip from '../../components/Tip/Tip'
  import {reqSendCode, reqPwdLogin, reqMsgLogin} from '../../api'
    export default {
        name: "Login",
        data () {
          return {
            loginType: '1',//1短信登录，2密码登录
            phone: '',
            code: '',
            name: '',
            pwd: '',
            captcha: '',
            second: 0,//手机注册登录方式，获取验证码倒计时
            showPwd: false,  //是否显示密码
            alertText: '',//验证提示框文本
            showAlertText: false, //是否显示验证提示框
            timer: 0
          }
        },
        methods: {
          async getCode() {
            if (!this.second) {
              //启动倒计时
              this.second = 30;
              this.timer = setInterval(() => {
                if (this.second>0) {
                  this.second--;
                } else {
                  clearInterval(this.timer)
                }
              },1000)
              //发送ajax，向指定手机号发送验证码
              const result = await reqSendCode(this.phone);
              if (result.code == 1) {
                //显示提示
                this.showAlert(result.msg);
                //停止计时
                if (this.second) {
                  this.second = 0;
                  clearInterval(this.timer);
                  this.timer = 0;
                }
              }
            }

          },
          showAlert(text) {
            //this.showAlertText = true;
            //this.alertText = text;
            Toast(text);
          },
          closeTip() {
            this.showAlertText = false;
          },
          changeCaptcha() {
            this.$refs.captcha.src=`http://localhost:4000/captcha?time=${new Date()}`;
          },
          async login() {
            let result = null;
            if (this.loginType == '1') {
              //短信登录
              const phone = this.phone;
              const code = this.code;
              if (!this.verifyPhone) {
                //Toast("请正确输入手机号");
                this.showAlert('请正确输入手机号');
                return;
              } else if (!/^\d{6}$/.test(code)) {
                this.showAlert('请输入短信验证码');
                return;
              }
              result = await reqMsgLogin(phone, code);

            } else {
              //用户名密码登录
              const name = this.name;
              const pwd = this.pwd;
              const captcha = this.captcha;
              if (!name) {
                //Toast("用户名不能为空");
                this.showAlert('用户名不能为空');
                return;
              } else if (!pwd) {
                //Toast("密码不能为空");
                this.showAlert('密码不能为空');
                return;
              } else if (!captcha) {
                //Toast("验证码不能为空");
                this.showAlert('验证码不能为空');
                return;
              }
              result = await reqPwdLogin({name, pwd, captcha})
            }
            if (this.second) {
              this.second = 0;
              clearInterval(this.timer);
              this.timer = 0;
            }
            //根据结果处理数据情况
            if (result.code == 0) {
              const user = result.data;
              console.log(user);
              //把user保存到vuex的state里
              this.$store.dispatch('userInfo', user);
              // 跳转路由
              this.$router.push(`/person`);
            } else {
              //提示信息
              this.showAlert(result.msg);
              //改变图形验证码
              this.changeCaptcha();
            }

          }
        },
        computed: {
          verifyPhone() {
            return /^1\d{10}$/.test(this.phone);
          }
        },
        components: {
          Tip
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
