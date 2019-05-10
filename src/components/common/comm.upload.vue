<template>
  <div class="g-upload">
    <eg-button type="2" @click="upload()">点击上传</eg-button>
    <input type="file" name="asyncFile" :id="id" style="display:none" @change="change()" />
    <img src="../../assets/images/loading.gif" v-if="isshow" style="width:20px;height:20px;" />
    <a :href="imgsrc || defUrl" v-if="!!imgsrc || !!defUrl" class="imgcontent" target="_blank" v-show="!isshow">{{
      imgname || defName
    }}</a>
    <a v-else class="imgcontent" target="_blank" v-show="!isshow">{{ imgname || defName }}</a>
    <img
      :src="imgsrc || defUrl"
      style="max-width:50%;margin-top:2px"
      :style="'width:' + imgwidth + 'px'"
      v-if="imgsrc || defUrl"
    />
  </div>
</template>
<script>
export default {
  name: 'eg-upload',
  data() {
    return {
      imgsrc: '',
      imgname: '',
      isshow: false
    };
  },
  props: {
    action: String,
    id: String,
    defaultObj: [Object, Array],
    field: String,
    imgwidth: {
      type: String,
      default: 'auto'
    }
  },
  computed: {
    defUrl() {
      if (!!this.defaultObj && !!this.field) {
        if (this.defaultObj[this.field]) {
          return this.defaultObj[this.field];
        }
      } else {
        return false;
      }
    },
    defName() {
      if (!!this.defaultObj && !!this.field) {
        if (this.defaultObj[this.field]) {
          return this.defaultObj[this.field].split('/')[this.defaultObj[this.field].split('/').length - 1];
        }
      } else {
        return '';
      }
    }
  },
  methods: {
    upload() {
      $(`#${this.id}`).click();
    },
    change() {
      const $this = this;
      $(`#${$this.id}`).upload({
        action: this.action,
        fileName: Math.random(),
        onsuccess(data) {
          if (data.isSuccess) {
            $this.isshow = false;
            $this.imgsrc = `http://${$this.action.split('/')[2]}${data.resultMsg}`;
            $this.imgname = $(this)[0].value.split('\\')[$(this)[0].value.split('\\').length - 1];
            if ($this.defaultObj) {
              $this.defaultObj[$this.field] = `http://${$this.action.split('/')[2]}${data.resultMsg}`;
            }
            $this.geturl();
          } else {
            $this.isshow = false;
            $this.imgname = '上传失败';
          }
        },
        onerror(data) {
          // console.log("上传失败:", data.resultMsg)
        },
        onprogress() {
          $this.isshow = true;
          $this.imgsrc = '';
          $this.imgname = '';
        }
      });
    },
    geturl() {
      this.$emit('change', this.imgsrc);
    },
    clear() {
      this.imgsrc = '';
      this.imgname = '';
      $(`#${this.id}`).val('');
      this.$emit('clear');
    }
  }
};
</script>
