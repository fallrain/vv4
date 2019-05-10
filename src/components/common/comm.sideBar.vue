<template>
  <div>
    <ul class="g-left-bar-nav" @mouseleave="ulreset">
      <li
        class="side-bar-menu"
        v-if="getUserInfo().brandName == 'haier' || (getUserInfo().brandName == 'casarte' && menumodel.name != '系统策略')"
        v-for="(menumodel, index) in sidemodel"
        :class="{ 'side-bar-menu-hover': getSystemMenu()[index].isMouse }"
        @mouseenter="barMenter(index, menumodel)"
        @mouseleave="reset(index)"
      >
        <div>
          <i class="iconfont g-left-menu-icon tb" :class="menumodel.icon" style="font-size: 30px;"></i>
          <p class="name" style="line-height: 1;">{{ menumodel.name }}</p>
        </div>
        <ul
          :class="[
            { opennone: getSystemMenu()[index].isNone },
            { sideLength: getSystemMenu()[index].isLength },
            { 'side-bar-open': !getSystemMenu()[index].isLength }
          ]"
        >
          <li
            v-for="(model, i) in menumodel.children"
            class="open-every"
            :class="{ 'open-every-hover': getSystemMenu()[index].children[i].isHover }"
            @click.stop="modellink(model, index, i)"
          >
            <em class="open-ev-col"></em>
            <span>{{ model.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'item',
  props: {
    sidemodel: '',
  },
  data() {
    return {
      isNone: true,
      isLength: false,
      isMouse: false,
    };
  },
  computed: {},
  methods: {
    modellink(e, ind, i) {
      this.getSystemMenu()[ind].isNone = true;
      for (const i in this.getSystemMenu()) {
        for (const j in this.getSystemMenu()[i].children) {
          this.getSystemMenu()[i].children[j].isHover = false;
        }
      }
      this.getSystemMenu()[ind].children[i].isHover = true;
      if (e.url) {
        // 为完成页面提示
        if (e.url == '/vipcenter') {
          this.$message({
            type: 'success',
            message: '系统功能完善中，敬请期待!',
            duration: 2000,
          });
          return false;
        }

        this.$router.push({
          path: e.url,
        });
      }
    },
    barMenter(e, menumodel) {
      const _this = this;
      this.getSystemMenu()[e].isNone = false;
      for (const i in this.getSystemMenu()) {
        this.getSystemMenu()[i].isMouse = false;
      }
      this.getSystemMenu()[e].isMouse = true;
      if (e > 4) {
        this.getSystemMenu()[e].isLength = true;
      }
      // for(let i in this.getSystemMenu()){
      //     for(let j in this.getSystemMenu()[i].children){
      //         this.getSystemMenu()[i].children[j].isHover=false
      //         if(this.$route.path==this.getSystemMenu()[i].children[j].url){
      //             this.getSystemMenu()[i].children[j].isHover=true
      //         }
      //     }
      // }
    },
    reset(e) {
      this.getSystemMenu()[e].isNone = true;
    },
    ulreset() {
      for (const i in this.getSystemMenu()) {
        this.getSystemMenu()[i].isMouse = false;
        for (const j in this.getSystemMenu()[i].children) {
          if (this.getSystemMenu()[i].children[j].isHover) {
            this.getSystemMenu()[i].isMouse = true;
          }
        }
      }
    },
    ...mapActions({
      addTabData: 'ADD',
      selTabData: 'SELECT',
      setTreeFourObj: 'setTreeFourObj',
      setTreeOneObj: 'setTreeOneObj',
    }),
    ...mapGetters({
      getTreeOne: 'getTreeOne',
      getTreeFour: 'getTreeFour',
      isclosed: 'getClosed',
      getUserInfo: 'getUserInfo',
      getSystemMenu: 'getSystemMenu',
    }),
  },
  watch: {
    // sidemodel(curVal,oldVal){
    //     console.log(curVal,oldVal);
    // },
  },
  mounted() {
    const _this = this;

    setTimeout(() => {
      // for(let i in _this.getSystemMenu()){
      //     for(let j in _this.getSystemMenu()[i].children){
      //         if(_this.$route.path==_this.getSystemMenu()[i].children[j].url){
      //             _this.getSystemMenu()[i].isMouse=true
      //         }
      //     }
      // }
    }, 1000);
  },
};
</script>
