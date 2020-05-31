<template>
  <div class="mixin-components-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>Buttons</span>
      </div>
      <div class="buttons-container">
        <div class="buttons-wrapper" v-for="className in buttons" :key="className">
          <button class="buttons-items" :class="className + '-btn'">{{ className }}</button>
        </div>
      </div>
    </el-card>
    <el-row :gutter="20" style="margin-top:50px;height:100%" type="flex">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Material Design 的input</span>
          </div>
          <el-form :model="demo">
            <el-form-item prop="title">
              <material-input v-model="demo.title" icon="search" name="title" placeholder="输入标题">
                标题
              </material-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>图片hover效果</span>
          </div>
          <div class="component-item">
            <PanThumb :image="logo" width="100px" height="100px" :z-index="2">
              surprise!!
            </PanThumb>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>水波纹 waves v-directive</span>
          </div>
          <div class="component-item">
            <el-button v-waves type="primary">
              水波纹效果
            </el-button>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>hover text</span>
          </div>
          <div class="component-item">
            <Mallki class-name="mallki-text" text="vue-admin" />
          </div>
        </el-card>
      </el-col> -->
    </el-row>
    <el-row style="margin-top:50px;height:100%" :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>draggable dialog</span>
          </div>
          <div class="component-item">
            <el-button type="primary" @click="dialogTableVisible = true">
              Open a Draggable Dialog
            </el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>draggable dialog</span>
          </div>
          <div class="component-item">
            <el-button type="primary" @click="dialogTableVisible = true">
              Open a Draggable Dialog
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <DraggableDialog :visible.sync="dialogTableVisible" title="Draggable Dialog" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MaterialInput from '@/components/MaterialInput/index.vue'
import PanThumb from '@/components/PanThumb/index.vue'
import Mallki from '@/components/TextHoverEffect/Mallki.vue'
import DraggableDialog from '@/components/DraggableDialog/index.vue'
@Component({
  name: 'MixinComponets',
  components: {
    MaterialInput,
    PanThumb,
    Mallki,
    DraggableDialog
  }
})
export default class extends Vue {
  private buttons: string[] = ['blue', 'light-blue', 'red', 'pink', 'green', 'tiffany', 'yellow']
  private demo = {
    title: ''
  }

  private logo = require('@/assets/icon-man.jpeg')

  protected dialogTableVisible = false
}
</script>

<style lang="scss" scoped>
.hasTagsView {
  .mixin-components-container {
    min-height: calc(100vh - 84px);
  }
}
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - #{$navbarHeight});
  // min-height: calc(100vh - 84px);
}
.buttons-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  .buttons-wrapper {
    flex: 0 0 20%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  .buttons-items {
    flex: 0 1 160px;
    min-width: 0;
    font-size: 14px;
    color: #fff;
    padding: 14px 36px;
    border-radius: 8px;
    border: none;
    outline: none;
    transition: 600ms ease all;
    position: relative;
    display: inline-block;
    cursor: pointer;
    &:hover {
      background: #fff;
      &:before,
      &:after {
        width: 100%;
        transition: width 600ms ease;
      }
    }

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      height: 2px;
      width: 0;
      transition: width 400ms ease;
    }

    &::after {
      left: 0;
      bottom: 0;
      right: inherit;
      top: inherit;
    }
  }
  @each $name, $color in ('blue', $blue), ('light-blue', $light-blue), ('red', $red), ('pink', $pink), ('green', $green),
    ('tiffany', $tiffany), ('yellow', $yellow)
  {
    .#{$name}-btn {
      background: $color;

      &:hover {
        color: $color;

        &:before,
        &:after {
          background: $color;
        }
      }
    }
  }
}
.box-card {
  height: 100%;
}
.component-item {
  // min-height: 100px;
  display: flex;
  justify-content: center;
  // align-items: center;
}
</style>
