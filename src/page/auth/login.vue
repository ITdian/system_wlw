<template>
  <div class="c-login-container">
    <div class="bg"></div>
    <div class="login-area">
      <div class="header"><h2>后台登录</h2></div>
      <div class="form">
        <div class="form-item">
          <input type="text" placeholder="用户名" v-model.trim="phone" autofocus />
        </div>
        <div class="form-item">
          <input type="password" placeholder="密码" v-model.trim="pwd"/>
          <span class="verCode-btn" @click="setCodeCountdown">{{codeCountdown ? codeCountdown : '获取验证码'}}</span>
        </div>
      </div>
      <div class="footer">
        <button type="button" @click="login">登 录</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Loading } from 'element-ui';
  export default {
    name: 'login',
    data() {
      return {
        phone: '15918729264',
        pwd: '123456',
        options:[] ,//社区列表
        value: null ,//当前 社区
        codeCountdown:null,//短信倒计时
      }
    },
    methods: {
      /**
       * @description 登录
       */
      login() {
        if (!this.phone.length || !this.pwd.length) {
          this.$message({
            message: '账号和密码不能为空',
            type: 'warning'
          });
          return;
        }

        let loadingInstance = Loading.service();

        this.$xttp.post('/user/signIn', {
          phone: this.phone,
          pwd: this.pwd
        }).then((res) => {
          this.$store.dispatch('changeToken', res.data);
          if (res.errorCode === 0) {

          }
          this.pwd = '';
          loadingInstance.close();
          this.$router.push('/');
        }).catch(() => {
          loadingInstance.close();
        });
      },
      /**
       * @description 设置倒数时间
       */
      setCodeCountdown(){
        if ( this.codeCountdown ) return false;
        this.codeCountdown = 120;
        let count = 119, timer = setInterval(() => {
          this.codeCountdown = count;
          if (count === 0) {
            this.codeCountdown = null;
            clearInterval(timer)
          }
          count--;
        }, 1000)
      },
    },
    mounted(){

    }
  }
</script>

<style scoped lang="scss">
  .c-login-container {
    width: 450px;
  }
  .bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/login-bg.jpg');
    background-size: cover;
    background-position: center;
    filter: brightness(25%);
    z-index: -1;
  }
  .login-area {
    width: 420px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -126px;
    margin-left: -210px;
  }

  .login-area .header h2 {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    background-color: #eee;
    font-size: 18px;
    font-weight: bold;
  }

  .login-area .form {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
  }
  .login-area .form .form-item {
    display: flex;
    border-bottom: 1px solid #ddd;
    input {
      border: none;
      height: 44px;
      width: 100%;
      font-size: 14px;
    }
    .verCode-btn {
      width: 30%;
      font-size: 12px;
      line-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration:underline;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .login-area .footer {
    padding: 30px 20px;
  }
  .login-area .footer button {
    background-color: #f71e43;
    width: 100%;
    height: 44px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
  }
</style>
