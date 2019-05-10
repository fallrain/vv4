<template>
  <div>
    <div contenteditable="true" class="edit-div"></div>
    <div @click="abc">显示</div>
    <div @click="jia">添加</div>
  </div>
</template>

<script>
export default {
  name: 'ceshi',
  methods: {
    abc() {
      console.log($('.edit-div').html());
    },
    jia() {
      const html = `${$('.edit-div').html()}<em contenteditable='false'>你好</em>`;
      $('.edit-div').html(html);
    }
  },
  mounted() {
    console.log($('.edit-div').html());
  }
};
</script>

<style scoped>
.edit-div {
  background-color: #ccc;
  width: 100%;
  height: 36px;
  word-break: break-all;
  outline: none;
  user-select: text;
  text-align: left;
  /*overflow: hidden;*/
  /*white-space: nowrap;*/
  padding: 3px 10px;
  font-size: 12px;
  line-height: 30px;
  border: 1px solid #ccc;
}
.edit-div[contenteditable='true'] {
  user-modify: read-write-plaintext-only;
}
.edit-div[contenteditable='true']:empty:before {
  content: attr(placeholder);
  display: block;
  color: #ccc;
}
</style>
