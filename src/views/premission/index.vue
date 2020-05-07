<template>
  <el-switch
    :value="role"
    active-value="admin"
    inactive-value="editor"
    active-text="admin"
    inactive-text="editor"
    @change="onChangRole"
  >
  </el-switch>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { updateUserRole } from '@/api/users'
@Component({
  name: 'Premission'
})
export default class extends Vue {
  private get role() {
    return UserModule.userInfo.roles[0]
  }

  private async onChangRole(val: string) {
    await updateUserRole({ role: val })
    await UserModule.GetUserInfo()
    // console.log(updateUserRole)
  }
}
</script>

<style lang="scss" scoped></style>
