<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginForm" :model="form" :rules="rules">
      <div class="title-container">
        <img src="favicon.ico" alt="vue-admin" class="logo" />
        <span class="title-wrapper">vue-admin</span>
      </div>
      <el-form-item class="input-container" prop="account">
        <el-input class="input-container-wrapper" placeholder="username" v-model="form.account">
          <i slot="suffix" class="el-input__icon el-icon-mobile-phone"></i>
        </el-input>
      </el-form-item>
      <el-form-item class="input-container" prop="password">
        <el-input type="password" class="input-container-wrapper" placeholder="password" v-model="form.password">
          <i slot="suffix" class="el-input__icon el-icon-view"></i>
        </el-input>
      </el-form-item>
      <el-form-item class="input-container">
        <el-button type="primary" style="width:100%" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { ILoginForm } from '@/api/types'
import { Form } from 'element-ui'

@Component({
  name: 'login'
})
export default class extends Vue {
  private form: ILoginForm = {
    account: '',
    password: ''
  }
  private rules = {
    account: [{ required: true, message: 'error', trigger: 'blur' }],
    password: [{ required: true, message: 'error', trigger: 'blur' }]
  }
  private login() {
    ;(this.$refs.loginForm as Form).validate(async (valid: boolean) => {
      if (!valid) return Promise.reject()
      await UserModule.Login(this.form)
      this.$router.push({ path: '/' })
    })
  }

  private mounted() {
    document.onkeypress = e => {
      e.keyCode === 13 && this.login()
    }
  }

  private beforeDestroy() {
    document.onkeypress = () => null
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #2b2f3a;
  .login-form {
    width: 350px;
    margin: auto;
    margin-top: 150px;
    opacity: 0.85;
    border-radius: 4px;
    padding: 30px 36px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    background-color: #f8f8f8;
  }
  .title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 22px;
    .logo {
      display: inline-block;
      width: 40px;
      height: 40px;
    }
    .title-wrapper {
      font-size: 20px;
      font-weight: bold;
      padding-left: 10px;
    }
  }
  .input-container-wrapper {
    ::v-deep {
      .el-input__inner {
        background-color: #fff;
      }
    }
  }
}
</style>
