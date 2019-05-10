<template>
  <li
    v-if="getUserInfo().brandName == 'haier' || (getUserInfo().brandName == 'casarte' && menumodel.name != '系统策略')"
    :class="{ bdrnone: isbdrNone, closed: isclosed() }"
    @click.stop="routeLink"
    @mouseleave="reset"
  >
    <span class="popbox" v-if="isclosed()" v-show="isPopBox">{{ menumodel.name }}</span>
    <div
      @click="toggle($event)"
      @mouseenter="bgMenter"
      @mouseleave="bgMleave"
      :class="{ bghvrone: isOne, bghvrtwo: isTwo, bgslt: isSelect, bgshow: isbgShow, 'menu-selected': isSelected }"
    >
      <span :class="{ mgl5: isMgl5, mgl10: isMgl10, 'pd-l-fix': !isFolder }" :style="mgl">
        <i class="iconfont g-left-menu-icon tb" :class="menumodel.icon"></i>
        <a class="name">{{ menumodel.name }}</a>
      </span>
      <i
        class="iconfont g-left-menu-icon-arr jt"
        v-if="isFolder"
        :class="{ 'icon-chevron-copy-copy-copy-copy-copy': isSelect, 'icon-chevron-copy-copy-copy': !isSelect }"
      ></i>
    </div>
    <ul v-show="isOpen" v-if="isFolder" :class="{ poplist: isPopList, laylist: isLaylist, heightUp: isOpen }">
      <div v-if="menumodel.level == 1 && isclosed()" class="oneTitle">{{ tempOneTitle }}</div>
      <div v-if="menumodel.level == 4" class="fourTitle">{{ tempFourTitle }}</div>
      <item v-for="model in menumodel.children" :menumodel="model"> </item>
    </ul>
  </li>
</template>
<script type="text/javascript">
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'item',
  props: {
    menumodel: Object,
    islayer: Boolean
  },
  data() {
    return {
      isOpen: false,
      isOne: false,
      isTwo: false,
      isSelect: false,
      isbgShow: this.menumodel.level != 1,
      isMgl5: this.menumodel.level == 3,
      isMgl10: this.menumodel.level == 4,
      isbdrNone: this.menumodel.level != 1,
      isPopList: this.menumodel.level == 4,
      mgl: this.menumodel.level >= 5 ? `margin-left:${this.menumodel.level * 2}px` : 'auto',
      tempFourTitle: '',
      tempOneTitle: '',
      isPopBox: false,
      isSelected: false
    };
  },
  computed: {
    isFolder() {
      return this.menumodel.children && this.menumodel.children.length;
    },
    isLaylist() {
      return !!(this.menumodel.level == 1 && this.isclosed());
    }
  },
  methods: {
    toggle(event) {
      this.isPopBox = false;
      // if (!this.isclosed) {
      if (this.isFolder) {
        if (!this.isPopList) {
          if (this.menumodel.level == 1) {
            if (this.getTreeOne() != '') {
              if (this.menumodel.id != this.getTreeOne().menumodel.id) {
                this.getTreeOne().isOpen = false;
                this.getTreeOne().isSelect = false;
              }
            }
            this.setTreeOneObj(this);
            this.tempOneTitle = this.getTreeOne().menumodel.name;
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
              this.isSelect = true;
            } else {
              this.isSelect = false;
            }
          } else {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
              this.isSelect = true;
            } else {
              this.isSelect = false;
            }
          }
        } else {
          // open
          if (this.menumodel.level == 4) {
            if (this.getTreeFour() != '') {
              if (this.menumodel.id != this.getTreeFour().menumodel.id) {
                this.getTreeFour().isOpen = false;
                this.getTreeFour().isSelect = false;
              }
            }
            this.setTreeFourObj(this);
            this.tempFourTitle = this.getTreeFour().menumodel.name;
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
              this.isSelect = true;
            } else {
              this.isSelect = false;
            }
          }
        }
      } else {
        for (let i = 0; i < this.getTreeOne().$parent.$children.length; i++) {
          for (let j = 0; j < this.getTreeOne().$parent.$children[i].$children.length; j++) {
            this.getTreeOne().$parent.$children[i].$children[j].isSelected = false;
          }
        }
        this.isSelected = true;
      }
    },
    bgMenter() {
      if (!this.isclosed()) {
        if (this.menumodel.level <= 4) {
          this.isOne = true;
        } else if (this.menumodel.level > 4) {
          this.isTwo = true;
        }
      } else {
        this.isTwo = true;
        if (this.menumodel.level == 1) {
          this.isPopBox = true;
        }
      }
    },
    bgMleave() {
      this.isOne = false;
      this.isTwo = false;
      if (this.menumodel.level == 1) {
        this.isPopBox = false;
      }
    },
    reset() {
      if (this.isPopList) {
        this.isOpen = false;
        this.isSelect = false;
      } else if (this.isLaylist) {
        this.isOpen = false;
        this.isSelect = false;
      }
    },
    routeLink() {
      if (this.menumodel.url) {
        // 为完成页面提示
        if (this.menumodel.url == '/vipcenter') {
          this.$message({
            type: 'success',
            message: '系统功能完善中，敬请期待!',
            duration: 2000
          });
          return false;
        }

        if (this.menumodel.url.indexOf('http') >= 0) {
          this.addTabData({
            name: this.menumodel.name,
            url: this.menumodel.url,
            icon: this.menumodel.icon,
            hide: false
          });
          this.$router.push({
            path: `/comm/${this.menumodel.url.slice(7, this.menumodel.url.length + 1)}`
          });
        } else {
          this.addTabData({
            name: this.menumodel.name,
            url: this.menumodel.url,
            icon: this.menumodel.icon,
            hide: false
          });

          this.$router.push({
            path: this.menumodel.url
          });
        }
      }
    },
    ...mapActions({
      addTabData: 'ADD',
      selTabData: 'SELECT',
      setTreeFourObj: 'setTreeFourObj',
      setTreeOneObj: 'setTreeOneObj'
    }),
    ...mapGetters({
      getTreeOne: 'getTreeOne',
      getTreeFour: 'getTreeFour',
      isclosed: 'getClosed',
      getUserInfo: 'getUserInfo'
    })
  },
  updated() {
    // if (this.isclosed) {
    //   if (!this.islayer) {
    //     this.isOpen = false;
    //     this.isSelect = false;
    //   }
    // }
  }
};
</script>
