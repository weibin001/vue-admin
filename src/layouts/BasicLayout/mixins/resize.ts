import { Component, Vue } from 'vue-property-decorator'
import { AppModule, DeviceType } from '@/store/modules/app'

@Component({
  name: 'ResizeMixin'
})
export default class extends Vue {
  private WIDTH = 992 //mobile
  get device() {
    return AppModule.device
  }
  get sidebar() {
    return AppModule.sidebar
  }

  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  }
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      AppModule.ToggleDevice(DeviceType.Mobile)
      AppModule.CloseSideBar(true)
    }
  }
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  private isMobile(): boolean {
    const { width } = document.body.getBoundingClientRect()
    return width - 1 < this.WIDTH
  }
  private resizeHandler(): void {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      AppModule.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop)
      if (isMobile) {
        AppModule.CloseSideBar(true)
      }
    }
  }
}
