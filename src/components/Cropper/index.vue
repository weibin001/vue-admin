<script lang="tsx">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { VueCropper } from 'vue-cropper'
interface IPreviewData {
  div: {
    width: string
    height: string
  }
  h: number
  w: number
  html: string
  url: string
  img: {
    width: string
    height: string
    transform: string
  }
}

@Component({
  name: 'Cropper',
  inheritAttrs: true,
  components: {
    VueCropper
  }
})
export default class extends Vue {
  @Ref() readonly cropper!: any
  @Ref() readonly input!: HTMLInputElement

  @Prop({ default: () => ({ height: '300px', width: '320px' }) }) cropperStyle!: {
    width: string
    height: string
    [propsName: string]: string
  }
  @Prop({ type: String }) cropperClass?: string
  @Prop({ type: String }) previewClass?: string
  @Prop({ default: '' }) img!: string
  @Prop({ default: '' }) fileName?: string
  @Prop({ default: 240 }) autoCropWidth!: string | number
  @Prop({ default: 240 }) autoCropHeight!: string | number
  @Prop() httpRequest?: Function

  // public $refs!: { cropper: any; input: HTMLInputElement }

  private nativeImg = this.img
  private file: File | null = null

  private preview = {
    div: {
      width: '',
      height: ''
    },
    h: 0,
    w: 0,
    html: '',
    url: '',
    img: {
      width: '',
      height: '',
      transform: ''
    }
  }

  private realTime(data: IPreviewData) {
    this.preview = data
  }

  private changeImg() {
    this.input.click()
  }

  private change(ev: InputEvent) {
    const files = ev.target ? (ev.target as HTMLInputElement).files : []
    const postFiles = Array.prototype.slice.call(files)
    const file = postFiles[0]
    if (file && window.FileReader) {
      const reader = new FileReader()
      reader.onload = evt => {
        const { target } = evt
        this.nativeImg = (target?.result as string) || ''
      }
      reader.readAsDataURL(file)
      this.file = file
    }
  }

  protected rotateRight() {
    this.cropper && this.cropper.rotateRight()
  }

  protected rotateLeft() {
    this.cropper && this.cropper.rotateLeft()
  }

  protected increaseScale() {
    this.cropper && this.cropper.changeScale(0.2)
  }

  protected decreaseScale() {
    this.cropper && this.cropper.changeScale(-0.2)
  }

  protected upload() {
    this.cropper &&
      this.cropper.getCropBlob((data: Blob) => {
        this.httpRequest && this.httpRequest(data, this.file)
      })
  }

  private render() {
    return (
      <div class="cropper-container">
        <div class="cropper-wrapper">
          <VueCropper
            ref="cropper"
            autoCropHeight={this.autoCropHeight}
            autoCropWidth={this.autoCropWidth}
            {...{ props: this.$attrs }}
            onRealTime={this.realTime}
            style={this.cropperStyle}
            class={this.cropperClass}
            img={this.nativeImg}
          />
          <div class={[this.previewClass, 'preview-wrapper']}>
            {this.$scopedSlots.preview ? (
              this.$scopedSlots.preview(this.preview)
            ) : (
              <div
                class="show-preview"
                style={{ width: this.preview.w + 'px', height: this.preview.h + 'px', overflow: 'hidden' }}>
                <div class="preview" style={this.preview.div}>
                  <img class="preview-img" src={this.preview.url} style={this.preview.img} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div class="cropper-btn-wrapper">
          <div class="cropper-btn-left" style={{ width: this.cropperStyle.width }}>
            <el-button type="success" size="small" on-click={this.changeImg}>
              更换图片
              <input
                accept={['.png', '.jpg', '.jpeg']}
                class="el-upload__input"
                on-change={this.change}
                multiple={false}
                name="avatar"
                type="file"
                ref="input"></input>
            </el-button>
            <el-button
              on-click={this.increaseScale}
              icon="el-icon-zoom-in"
              type="primary"
              size="small"
              plain></el-button>
            <el-button
              on-click={this.decreaseScale}
              icon="el-icon-zoom-out"
              type="primary"
              size="small"
              plain></el-button>
            <el-button
              on-click={this.rotateRight}
              icon="el-icon-refresh-right"
              type="primary"
              size="small"
              plain></el-button>
            <el-button
              on-click={this.rotateLeft}
              icon="el-icon-refresh-left"
              type="primary"
              size="small"
              plain></el-button>
          </div>
          <div class="cropper-btn-right">
            <el-button on-click={this.upload} type="primary" size="small">
              上传图片
            </el-button>
          </div>
        </div>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
.cropper-container {
  .cropper-wrapper,
  .cropper-btn-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
  }
  .vue-cropper {
    flex-shrink: 0;
    min-width: 0;
  }

  .preview-wrapper,
  .cropper-btn-right {
    flex: 1;
    min-width: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .preview-wrapper {
    flex: 1;
    min-width: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .preview {
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid #cccccc;
      background-color: #cccccc;
    }
    .preview-img {
      display: inline-block;
      object-fit: cover;
    }
  }

  .cropper-btn-wrapper {
    margin-top: 30px;
    align-items: flex-end;
    .cropper-btn-left {
      display: flex;
      justify-content: space-around;
    }
    ::v-deep {
      .el-button [class^='el-icon'] {
        font-weight: bold;
      }
    }
  }
}
</style>
