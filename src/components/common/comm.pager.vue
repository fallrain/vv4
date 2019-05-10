<template>
  <div class="g-pager" v-if="isFolder">
    <div class="g-pager-info">
      共有{{ model.entityCount }}条，每页显示：
      <p style="display:inline-block;padding-right:5px;">
        <eg-select
          style="width:80px"
          :model="options"
          :init="model"
          :field="'pageSize'"
          :value="'value'"
          :label="'label'"
          @change="change"
          :list-height="70"
          :isclear="false"
        ></eg-select>
      </p>
      条
    </div>
    <div class="g-pager-main">
      <span class="fristpage" @click="frist(model.pageNo, 1, model.pageSize)"
        ><i class="iconfont icon icon-icon01"></i
      ></span>
      <span class="prev" @click="prev(model.pageNo - 1, model.pageSize)"
        ><i class="iconfont icon icon-arrow-right-copy"></i
      ></span>
      <span
        v-for="pageNum in model.pageCount"
        v-if="
          (model.pageNo <= 3 ? pageNum <= 5 : pageNum <= model.pageNo + 2 && pageNum >= model.pageNo - 2) ||
            (model.pageCount - model.pageNo < 3
              ? pageNum >= model.pageCount - 4
              : pageNum <= model.pageNo + 2 && pageNum >= model.pageNo - 2)
        "
        class="num"
        :class="{ isSelect: pageNum == model.pageNo }"
        @click="go(pageNum, model.pageSize)"
        >{{ pageNum }}</span
      >
      <span class="next" @click="next(model.pageNo + 1, model.pageCount, model.pageSize)"
        ><i class="iconfont icon icon-arrow-right"></i
      ></span>
      <span class="lastpage" @click="last(model.pageNo, model.pageCount, model.pageSize)"
        ><i class="iconfont icon icon-icon02"></i
      ></span>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'eg-pager',
  props: {
    model: [Object, Array],
    pid: Number,
    obty: [String, Number],
    fn: Function,
    pagesize: Number,
    sort: String,
    pm: Object
  },
  data() {
    return {
      options: [
        {
          value: 10,
          label: '10'
        },
        {
          value: 100,
          label: '100'
        },
        {
          value: 500,
          label: '500'
        },
        {
          value: 1000,
          label: '1000'
        }
      ],
      selectPz: ''
    };
  },
  computed: {
    isFolder() {
      return this.model.entityCount != 0 && this.model.entityCount != undefined;
    }
  },
  methods: {
    common(num, psize) {
      const sJson = {
        orders: [
          {
            property: this.sort ? this.sort : 'sort',
            desc: false
          }
        ]
      };
      let params = {
        pageNo: num,
        pageSize: psize,
        criteria: JSON.stringify(sJson)
      };
      if (this.pm) {
        params = Object.assign(params, this.pm);
      } else {
        const p = {
          parentId: this.pid,
          roleId: this.pid,
          objectType: this.obty
        };
        params = Object.assign(params, p);
      }
      this.fn(params);
    },
    go(num, psize) {
      this.common(num, psize);
    },
    prev(num, psize) {
      if (num < 1) {

      } else {
        this.common(num, psize);
      }
    },
    next(num, len, psize) {
      if (num > len) {

      } else {
        this.common(num, psize);
      }
    },
    frist(pNo, num, psize) {
      if (pNo == 1) {

      } else {
        this.common(num, psize);
      }
    },
    last(pNo, num, psize) {
      if (num == pNo) {

      } else {
        this.common(num, psize);
      }
    },
    change(v) {
      this.go(1, v.value);
    }
  },
  mounted() {}
};
</script>
