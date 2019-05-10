<template>
  <transition name="eg-diglog">
    <div class="g-diglog-mask" v-show="show">
      <div class="g-diglog-wrapper" :style="bottom">
        <div class="g-diglog-container" :style="myStyle">
          <div class="g-diglog-header">
            <slot name="header">
              <h2>警告</h2>
            </slot>
          </div>
          <div class="g-diglog-body">
            <slot name="body"> </slot>
          </div>
          <div class="g-diglog-footer">
            <slot name="footer">
              <span class="g-diglog-default-button" @click="$emit('commit')">
                确定
              </span>
              <span class="g-diglog-default-button" @click="$emit('close')">
                取消
              </span>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'eg-diglog',
  data() {
    return {
      show: this.isOut
    };
  },
  props: ['myStyle', 'bottom', 'isOut'],
  mounted() {}
};
</script>
