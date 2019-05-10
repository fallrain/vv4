<template>
  <div ref="editor" class="ueditor-container"></div>
</template>

<script>
export default {
  data() {
    return {
      id: `ueditor${parseInt(Math.random() * 100000)}`,
      isEditorReady: false
    };
  },
  props: {
    value: {
      type: String,
      default: null
    },
    config: {
      type: Object,
      default: {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    random: {
      type: Number,
      default: null
    }
  },
  watch: {
    value(val, oldVal) {
      if (this.isEditorReady) {
        this.editor = UE.getEditor(this.id, this.config);
        if (val !== null) {
          this.editor.setContent(val);
          this.editor.focus(true);
        }
      }
    },
    random() {
      if (this.isEditorReady) {
        const wordCount = this.editor.getContentLength(true);
        const content = this.editor.getContent();
        const plainTxt = this.editor.getPlainTxt();
        this.$emit('input', { wordCount, content, plainTxt });
      }
    }
  },
  mounted() {
    this.$nextTick(function f1() {
      // 保证 this.$el 已经插入文档
      if (this.$refs.editor) {
        this.$refs.editor.id = this.id;
        this.editor = UE.getEditor(this.id, this.config);
        this.editor.ready(
          () => {
            this.isEditorReady = true;
            this.editor.setContent(this.value);

            this.editor.addListener(
              'contentChange',
              () => {
                const wordCount = this.editor.getContentLength(true);
                const content = this.editor.getContent();
                const plainTxt = this.editor.getPlainTxt();
                this.$emit('input', { wordCount, content, plainTxt });
              }
            );

            this.$emit('ready', this.editor);

            const self = this;
            if (this.disabled) {
              self.editor.setDisabled();
            } else {
              self.editor.setEnabled();
            }
          }
        );
      }
    });
  },
  beforeDestroy() {
    // $('.ueditor-container').hide() // 销毁前隐藏文本框
    try {
      this.editor && this.editor.destroy();
      this.editor = null;
    } catch (e) {
      this.editor = null;
    }
  }
};
</script>

<style>
body {
  background-color: #ff0000;
}
</style>
