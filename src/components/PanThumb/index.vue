<template>
  <div class="pan-item" :style="computedStyle">
    <div class="pan-info">
      <div class="pan-info-roles-container">
        <slot />
      </div>
    </div>
    <div :style="{ backgroundImage: `url(${image})`, ...computedStyle }" class="pan-thumb" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  name: 'PanThumb'
})
export default class extends Vue {
  @Prop({ required: true }) private image!: string
  @Prop({ default: '150px' }) private width!: string
  @Prop({ default: '150px' }) private height!: string
  @Prop({ default: 1 }) private zIndex!: number

  private get computedStyle() {
    return {
      width: this.width,
      height: this.height,
      zIndex: this.zIndex
    }
  }
}
</script>

<style lang="scss" scoped>
.pan-item {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: inline-block;
  // position: relative;
  cursor: default;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  &:hover .pan-thumb {
    transform: rotate(-110deg);
  }

  .pan-info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    .pan-info-roles-container {
      padding: 20px;
    }
  }
}
.pan-thumb {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  transform-origin: 95% 40%;
  transition: all 0.3s ease-in-out;
}
</style>
