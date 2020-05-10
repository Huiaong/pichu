<template>
  <div>
    <header id="header" class="header bg-white">
      <div class="navbar-container">
        <a href="/" class="navbar-logo">
          <img src="@/assets/logo.png" alt="Pichu">
        </a>
        <div class="navbar-menu">
          <div class="block">
            <el-dropdown placement="bottom">
              <span class="el-dropdown-link">
                <el-avatar size="medium" :src="userInfo.portrait">{{ portrait }}</el-avatar>
              </span>
              <el-dropdown-menu v-if="hasLogin" slot="dropdown">
                <el-dropdown-item>我的</el-dropdown-item>
                <el-dropdown-item divided>设置</el-dropdown-item>
                <el-dropdown-item>关于</el-dropdown-item>
                <el-dropdown-item divided @click.native="Logout">登出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </header>

    <router-view />

    <footer id="footer" class="footer bg-white" />
  </div>
</template>

<script>
import { userLogout } from '@/api/user'
import { getStore, removeStore } from '@/utils/storage'
export default {
  name: 'Layout',
  data() {
    return {
      hasLogin: this.$store.state.login,
      userInfo: this.$store.state.userInfo
    }
  },
  computed: {
    portrait() {
      if (this.userInfo.name) {
        return this.userInfo.name.charAt()
      } else if (this.userInfo.email) {
        return this.userInfo.email.charAt()
      } else {
        return this.userInfo.mobile.charAt()
      }
    }
  },
  methods: {
    Logout() {
      const params = {
        token: getStore('token')
      }
      console.log(params)
      userLogout(params).then(res => {
        if (res.success === true) {
          removeStore('token')
          window.location.href = '/'
        } else {
          this.message(res.error)
        }
      })
    },
    message(m) {
      this.$message.error({
        message: m
      })
    }
  }
}
</script>

<style scoped>
/* @import "~@/styles/style.min.css"; */
.el-dropdown-link {
  display: flex;
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
