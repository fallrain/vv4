<template>
  <span
    class="g-button"
    :style="myStyle"
    :class="{
      'g-button-radius': type == 1,
      'g-button-blue': type == 2,
      'g-button-gray': type == 3,
      'g-button-blue-radius': type == 4,
      'g-button-gray-radius': type == 5,
      'btn-select': isSelect
    }"
    @click="$emit('click')"
  >
    <slot></slot
  ></span>
</template>
<script>
export default {
  name: 'eg-button',
  props: ['type', 'myStyle', 'isSelect']
};
</script>
<!--
 type:1.圆角未选灰,hover蓝 2.直角未选蓝,hover透明蓝 3.直角未选灰,白字,无hover 4.圆角未选蓝,hover透明蓝 5.圆角未选灰,白字,无hover
-->
