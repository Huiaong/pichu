<template>
  <div>
    <header id="header" class="header bg-white">
      <div class="navbar-container">
        <a href="/" class="navbar-logo">
          <img src="@/assets/logo.png" alt="Con" />
        </a>
        <div class="navbar-menu">
          <div class="block">
            <el-dropdown placement="bottom">
              <span class="el-dropdown-link">
                <el-avatar size="medium">User</el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown" v-if="hasLogin">
                <el-dropdown-item>我的</el-dropdown-item>
                <el-dropdown-item divided="true">设置</el-dropdown-item>
                <el-dropdown-item>关于</el-dropdown-item>
                <el-dropdown-item divided="true">登出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </header>

    <router-view />

    <footer id="footer" class="footer bg-white"></footer>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      hasLogin: true
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.el-dropdown-link {
  display: flex;
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>