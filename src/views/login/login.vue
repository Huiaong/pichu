<template>
  <div class="login-container" @click.stop="blank">
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      label-position="left"
      :rules="roles"
    >
      <div>
        <img :src="bear">
      </div>
      <h3 class="title">Pichu</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="off"
          placeholder="用户名"
          @click.native.stop="greeting"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          :type="pwdType"
          name="password"
          auto-complete="off"
          placeholder="密码"
          @click.native.stop="blindfold"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="iconClass" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >Sign in</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userLogin } from '@/api/user.js'
import { setStore } from '@/utils/storage.js'
export default {
  name: 'Login',
  data() {
    return {
      img: {
        normal: 'https://huiao.oss-cn-shenzhen.aliyuncs.com/bear-normal.png',
        blindfold:
          'https://huiao.oss-cn-shenzhen.aliyuncs.com/bear-blindfold.png',
        greeting: 'https://huiao.oss-cn-shenzhen.aliyuncs.com/bear-greeting.png'
      },
      bear: 'https://huiao.oss-cn-shenzhen.aliyuncs.com/bear-normal.png',
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
      pwdType: 'password',
      iconClass: 'eye',
      redirect: undefined,
      roles: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    blank() {
      this.bear = this.img.normal
    },
    blindfold() {
      this.bear = this.img.blindfold
    },
    greeting() {
      this.bear = this.img.greeting
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
        this.iconClass = 'eye-open'
      } else {
        this.pwdType = 'password'
        this.iconClass = 'eye'
      }
    },
    message(m) {
      this.$message.error({
        message: m
      })
    },
    handleLogin() {
      var params = {
        loginName: this.loginForm.username,
        password: this.loginForm.password
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          userLogin(params).then(res => {
            if (res.success === true) {
              setStore('token', res.result.token)
              setStore('userId', res.result.id)
              this.loading = false
              this.toHome()
            } else {
              this.logintxt = '登录'
              this.message(res.error)
              this.loading = false
              return false
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toHome() {
      this.$router.push({
        path: '/'
      })
    },
    toForget() {
      this.$router.push({
        path: '/forget'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #454545;
    .el-form-item__content {
      border-bottom: 1px solid #dcdfe6;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #b8e5f8;
  background-image: url("https://huiao.oss-cn-shenzhen.aliyuncs.com/loginbg.png");
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 432px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    background-color: #fff;

    div > img {
      position: absolute;
      top: 0;
      left: 50%;
      width: 10rem;
      -webkit-transform: translate(-50%, -83%);
      transform: translate(-50%, -83%);
      z-index: 1;
    }
  }
  .tips {
    font-size: 14px;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #0084ff;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
