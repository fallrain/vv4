<template>
  <span
    class="g-nav"
    :class="{ 'g-downlist-sel': isSelect, 'g-nav-hover': isHover }"
    @click="showDownList()"
    @mouseenter="bgMenter"
    @mouseleave="bgMleave"
    ><span class="g-nav-tit"
      >产品与服务<i
        class="iconfont g-downlist-arr"
        :class="{
          'icon-menu-block-right-copy': isSelect,
          'icon-menu-block-right': !isSelect,
          'g-downlist-arr-isSel': isSelect
        }"
      ></i
    ></span>
    <div class="g-nav-downlist" v-show="isOpen">
      <div class="g-nav-downlist-group">
        <span class="g-nav-downlist-tit">{{ downlistmodel.title }}</span>
        <ul v-for="childmodel in downlistmodel.children">
          <li @click="toLink">
            <i class="iconfont icon-weibiaoti5" :class="childmodel.icon"></i>{{ childmodel.title }}
          </li>
        </ul>
      </div>
    </div>
  </span>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
      isSelect: false,
      isHover: false
    };
  },
  props: ['downlistmodel'],
  methods: {
    showDownList() {
      this.isOpen = !this.isOpen;
      this.isSelect = !this.isSelect;
    },
    bgMenter() {
      if (this.isOpen) {
        this.isHover = false;
      } else {
        this.isHover = true;
      }
    },
    bgMleave() {
      this.isHover = false;
      this.reset();
    },
    toLink() {
      this.$router.push({
        path: this.model.link
      });
    },
    reset() {
      this.isOpen = false;
      this.isSelect = false;
    }
  }
};
</script>
