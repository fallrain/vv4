

              $this.close();
              $this.close();
            if (e.keyCode == 88 && e.shiftKey) {
            if (e.keyCode == 88 && e.shiftKey) {
            path: "/comm/" + this.openTab.url.slice(7, this.openTab.url.length + 1)
            path: '/comm/' + this.tabmodel.url.slice(7, this.tabmodel.url.length + 1)
            path: this.openTab.url
            path: this.tabmodel.url
            }
            }
          ////console.log("this:", $this)
          ////console.log("this:", $this)
          document.onkeydown = function (e) {
          document.onkeydown = function (e) {
          icon: this.tabmodel.icon
          icon: this.tabmodel.icon
          name: this.tabmodel.name,
          name: this.tabmodel.name,
          return true;
          this.$router.match("/comm").meta.requiresAuth = true
          this.$router.match('/comm').meta.requiresAuth = true
          this.$router.match(this.openTab.url).meta.requiresAuth = true
          this.$router.match(this.tabmodel.url).meta.requiresAuth = true
          this.$router.push({
          this.$router.push({
          this.$router.replace({
          this.$router.replace({
          this.isSelect = true;
          this.tabmodel.children.length
          url: this.tabmodel.url,
          url: this.tabmodel.url,
          }
          }
          })
          })
          });
          });
        $this = this;
        $this = this;
        delTabData: "DEL",
        if ($this.openTab.name != "首页") {
        if ($this.openTab.name != "首页") {
        if (this.openTab.name == this.tabmodel.name) {
        if (this.openTab.name == this.tabmodel.name) {
        if (this.openTab.url.indexOf("http") >= 0) {
        if (this.tabmodel.url.indexOf("http") >= 0) {
        openTab: "getOpenTab"
        return this.tabmodel.children &&
        selTabData: "SELECT"
        this.$router.match(this.$route.path).meta.requiresAuth = false
        this.$store.dispatch(reset)
        this.delTabData({
        this.isSelect = false;
        this.selTabData({
        var reset = "resetBBS" + this.tabmodel.url.split("/")[this.tabmodel.url.split("/").length - 1];
        }
        }
        }
        }
        }
        }
        } else {
        } else {
        });
        });
      ...mapActions({
      ...mapGetters({
      //tab关闭快捷键
      //tab关闭快捷键
      <a @click="close()" v-if="this.tabmodel.name!='首页'"><i class="iconfont icon-icon-32" ></i></a>
      close: function () {
      if (!!this.isSelect) {
      if (!!this.isSelect) {
      isFolder: function () {
      isSelect: function () {
      routeLink: function () {
      var $this;
      var $this;
      }
      }
      }
      })
      }),
      },
      },
      },
    </div>
    <div class="g-tab" :class="{noseltab:isSelect}" v-show="!tabmodel.hide"><span @click="routeLink()"><i class="iconfont g-left-menu-icon" :class="tabmodel.icon"></i>{{tabmodel.name}}</span>
    computed: {
    created() {
    mapActions
    mapGetters,
    mapState,
    methods: {
    props: ['tabmodel'],
    updated() {
    }
    },
    },
    },
  </transition>
  <transition name="tab" mode="out-in">
  export default {
  import {
  }
  } from "vuex";
</script>
</template>
<script type="text/javascript">
<template>
