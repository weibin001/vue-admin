<template>
  <div class="material-input__component">
    <div :class="[icon ? 'iconClass' : '', inputSize ? 'el-input--' + inputSize : '', computedClasses]">
      <input
        ref="input"
        class="material-input"
        v-bind="$attrs"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
        :disabled="inputDisabled"
        :placeholder="filledPlaceholder"
        :autocomplete="autocomplete"
      />
      <span v-if="icon" class="material-input__icon">
        <i :class="['el-icon-' + icon]" class="el-input__icon" />
      </span>
      <span class="material-input-bar" />
      <label class="material-label">
        <slot />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator'
import { Form, FormItem } from 'element-ui'
import { AppModule } from '@/store/modules/app'
@Component({
  name: 'MaterialInput',
  inheritAttrs: false
})
export default class extends Vue {
  @Inject({ default: '' }) private elForm?: Form
  @Inject({ default: '' }) private elFormItem?: FormItem

  @Prop({ default: '' }) private value!: string | number
  @Prop({ default: '' }) private type!: string
  @Prop({ default: '' }) private size!: string
  @Prop({ default: false }) private disabled!: boolean
  @Prop({ default: '' }) private icon?: string
  @Prop({ default: '' }) private placeholder?: string
  @Prop({ default: 'off' }) private autocomplete?: string

  private focused = false
  private isComposing = false

  get filledPlaceholder() {
    return this.focused ? this.placeholder : ''
  }

  get elFormItemSize() {
    return (this.elFormItem && this.elFormItem.size) || ''
  }

  get inputSize() {
    return this.size || this.elFormItemSize || AppModule.size || 'default'
  }

  get computedClasses() {
    return {
      'material-input--active': this.focused,
      'material-input--disabled': this.disabled,
      'material-input--raised': Boolean(this.focused || this.value)
    }
  }

  get inputDisabled() {
    return this.disabled || (this.elForm || {}).disabled
  }

  private focus() {
    ;(this.$refs.input as HTMLInputElement).focus()
    // this.getInput().focus()
  }
  private blur() {
    ;(this.$refs.input as HTMLInputElement).blur()
  }

  private handleInput(e: InputEvent) {
    const inputValue = (e.target as HTMLInputElement).value
    if (this.isComposing || this.inputDisabled || this.value === inputValue) return
    this.$emit('input', inputValue)
    this.$emit('change', inputValue)
  }

  private handleFocus(e: FocusEvent) {
    this.focused = true
    this.$emit('focus', e)
  }

  private handleBlur(e: FocusEvent) {
    this.focused = false
    this.$emit('blur', e)
  }

  private handleCompositionStart() {
    this.isComposing = true
  }

  private handleCompositionEnd(e: CompositionEvent) {
    // console.log(e)
    if (this.isComposing) {
      this.isComposing = false
      this.handleInput(e as InputEvent)
    }
  }
}
</script>

<style lang="scss" scoped>
// Theme:
$color-white: white;
$color-grey: #9e9e9e;
$color-grey-light: #e0e0e0;
$color-blue: #2196f3;
$color-red: #f44336;
$color-black: black;

.material-input__component {
  margin-top: 45px;
  position: relative;

  .material-input {
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid $color-grey-light;
    height: 40px;
    line-height: 40px;

    &:focus {
      outline: none;
      border: none;
      border-bottom: 1px solid transparent; // fixes the height issue
    }
    &__icon {
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      text-align: center;
      color: #c0c4cc;
      transition: all 0.2s;
      pointer-events: none;
    }
  }

  .iconClass {
    .material-input {
      padding-right: 30px;
    }
  }

  .material-label {
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 0;
    transition: all 0.2s ease;
  }

  .material-input-bar {
    position: relative;
    display: block;
    width: 100%;

    &:before {
      content: '';
      height: 1px;
      width: 0;
      bottom: 0;
      position: absolute;
      transition: all 0.2s ease;
      // @extend %base-bar-pseudo;
      left: 50%;
    }

    &:after {
      content: '';
      height: 1px;
      width: 0;
      bottom: 0;
      position: absolute;
      transition: all 0.2s ease;
      right: 50%;
    }
  }

  .material-input--active {
    .material-input-bar {
      &:before,
      &:after {
        width: 50%;
        background-color: $primaryColor;
      }
    }
  }

  @each $size, $height in ('default', 40px), ('medium', 36px), ('small', 32px), ('mini', 28px) {
    .el-input--#{$size} {
      &.material-input--raised {
        .material-label {
          top: -1.1em;
          left: 0;
          font-size: 1.1em;
          font-weight: bold;
          color: $primaryColor;
          line-height: 1;
        }
      }
      .material-input {
        height: $height;
        line-height: $height;
      }
    }
  }
}
</style>
