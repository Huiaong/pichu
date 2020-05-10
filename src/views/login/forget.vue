<template>
  <div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :rules="roles"
    >
      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="用户名"
          @click.native.stop="greeting"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>

</style>
