<script lang="tsx">
import VueCountTo from 'vue-count-to'
import { SettingsModule } from '@/store/modules/settings'
import Vue from 'vue'
export default Vue.extend({
  functional: true,
  props: {
    iconName: String,
    iconColor: {
      type: String,
      default: SettingsModule.theme
    },
    number: {
      type: Number,
      default: 0
    }
  },
  render(h, { props: { iconName, iconColor, number } }) {
    return (
      <div class="number-card-container">
        <div class="number-card-icon-wrapper">
          <svg-icon class="number-card-icon" name={iconName} style={{ color: iconColor }}></svg-icon>
        </div>
        <div class="number-card-wrapper">
          <p class="number-card-title">Card Title</p>
          <VueCountTo start-val={0} end-val={number} duration={3000} />
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.number-card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 108px;
  .number-card-icon-wrapper {
    display: inline-flex;
    align-items: center;
    padding: 16px;
    &:hover {
      background-color: $menuActiveText;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      .number-card-icon {
        color: #fff !important;
      }
    }
    .number-card-icon {
      font-size: 48px;
    }
  }
  .number-card-wrapper {
    display: inline-flex;
    flex-direction: column;
    color: #666;
  }
  .number-card-title {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
    font-weight: bold;
  }
}
</style>
