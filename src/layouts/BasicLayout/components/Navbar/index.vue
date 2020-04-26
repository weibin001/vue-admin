<template>
  <div class="navbar">
    <div class="left-container">
      <div
        :class="['hamburger', 'hover-effect', 'vertical-center', { 'is-active': sidebar.opened }]"
        @click="toggleSideBar"
      >
        <svg-icon name="hamburger" width="20" height="20" />
      </div>
      <span>首页</span>
    </div>
    <div class="right-container">
      <el-dropdown class="avatar-container right-container-item hover-effect" trigger="click">
        <span class="avatar-wrapper">
          <el-avatar
            class="user-avatar"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            size="small"
          ></el-avatar>
          <span style="margin-right:5px">Hi!</span>
          <span>{{ name }}</span>
        </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item divided @click.native="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AppModule, DeviceType } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'
@Component({
  name: 'Navbar'
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar
  }
  get device(): DeviceType {
    return AppModule.device
  }
  get name(): string {
    return UserModule.userInfo.name
  }

  private toggleSideBar(): void {
    AppModule.ToggleSideBar(false)
  }
  private async logOut(): Promise<void> {
    await UserModule.LogOut()
    this.$router.push('/login')
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  display: flex;
  height: $navbarHeight;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  overflow: hidden;
  font-size: 14px;
  .hover-effect {
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .vertical-center {
    display: flex;
    align-items: center;
  }
  .left-container,
  .right-container {
    position: relative;
    flex: 0 0 auto;
    display: flex;
    line-height: $navbarHeight;
    height: 100%;
  }
  .right-container {
    flex: 1;
    justify-content: flex-end;
    &-item {
      padding: 0 8px;
      white-space: nowrap;
      @extend .vertical-center;
    }
    .avatar-container {
      margin-right: 15px;
    }
    .avatar-wrapper {
      display: inline-flex;
      align-items: center;
      outline: none;
    }
    .user-avatar {
      margin-right: 8px;
      line-height: $navbarHeight;
    }
  }
  .hamburger {
    padding: 0 15px;
    -webkit-tap-highlight-color: transparent;
    .svg-icon {
      vertical-align: initial;
    }
    &.is-active {
      transform: rotate(180deg);
    }
  }
}
</style>
