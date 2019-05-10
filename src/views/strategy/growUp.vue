<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>成长值规则</p>
      <div style="margin-bottom: 40px;margin-left: 10px;">
        <p class="strategy-warn">
          成长值是根据不同成长策略计算的分值和其对应的分值比例计算出的综合分值。成长值等于各策略分值乘以分值比例的总和。
        </p>
        <p class="strategy-formula">
          当前成长值设置逻辑为：
          <span>成长值</span>
          <span>=</span>
          <span v-for="(item, index) in msgListData.entities" v-if="item.status == 1"
            >{{ item.strategyName }} * {{ item.scale }}<span>+</span></span
          >
          <!-- <a v-if="jurisdiction['strategy:growUpStrategy:ruleEdit']" href="javascript:;" @click="editFormula">编辑</a> -->
          <el-button
            v-if="jurisdiction['strategyOperations:growUpStrategy:ruleEdit']"
            type="primary"
            size="small"
            @click="editFormula"
            >编辑</el-button
          >
        </p>
      </div>
      <div class="clear"></div>
    </div>
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>成长值策略设置
        <el-button
          v-if="jurisdiction['strategyOperations:growUpStrategy:save']"
          type="primary"
          @click="toDetail()"
          class="fr"
          >新建成长值策略</el-button
        >
      </p>
    </div>
    <div class="level-table" v-loading="msgListLoading">
      <el-table :data="msgListData.entities" style="width: 100%" :show-header="false">
        <el-table-column prop="rankName" label="会员等级" min-width="64%">
          <template scope="scope">
            <img src="../../assets/images/icon_gold.png" class="level-icon" />
            <!-- <img src='../../assets/images/icon_score.png' /> -->
            <div style="display:inline-block;vertical-align: middle;width: 80%;">
              <p style="font-size: 16px;">{{ scope.row.strategyName }}</p>
              <p style="overflow: hidden; text-overflow: ellipsis;">{{ scope.row.strategyDesc }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="jurisdiction['strategyOperations:growUpStrategy:strategyEdit']"
          prop="integrationBrand"
          label="启用"
          min-width="20%"
        >
          <template scope="scope">
            <el-switch
              v-model="scope.row.status"
              on-color="#13ce66"
              off-color="#ff4949"
              :on-value="1"
              :off-value="-3"
              @change="switchChange(scope.row.id, scope.row.brandName, scope.row.status)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="16%">
          <template scope="scope">
            <el-button
              v-if="jurisdiction['strategyOperations:growUpStrategy:strategyEdit']"
              type="primary"
              @click="toDetail(scope.row.id, scope.row.brandName)"
              class="fr"
              >设置</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" border :current-page.sync="pageNo" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="msgListData.entityCount"> -->
      <!-- </el-pagination> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import editFormula from './dialog/growUpFormula.vue';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  components: {
    editFormula
  },
  data() {
    return {
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 100,
      strategyName: '',
      brand: '海尔品牌',
      status: 1,
      scale: []
    };
  },
  filters: {
    propFilter(value, type) {
      value = parseInt(value) - 1;
      switch (type) {
        case 'platform':
          const platformArr = [
            '海贝商城',
            '二维码入口',
            '海尔消费金融',
            '海尔会员俱乐部',
            'SCRM',
            '新海贝商城',
            '创客实验室',
            '海尔优家'
          ];
          value = platformArr[value];
          break;
        case 'integrationBrand':
          const integrationBrandArr = ['海贝积分'];
          value = integrationBrandArr[value];
          break;
        case 'level':
          const levelArr = ['积分卡', '交互积分'];
          value = levelArr[value];
          break;
        case 'rule':
          const ruleArr = ['随机', '固定'];
          value = ruleArr[value];
          break;
      }
      return value;
    }
  },
  methods: {
    changeScale(scale) {
      this.scale = scale;
    },
    editFormula() {
      const self = this;
      const h = this.$createElement;

      this.$msgbox({
        title: '编辑',
        customClass: 'select-group',
        message: h('div', null, [
          h('edit-formula', {
            props: {
              growUpStrategy: self.msgListData.entities,
              changeScale: self.changeScale,
              random: Math.random()
            }
          })
        ]),
        showCancelButton: true,
        // showConfirmButton: true,
        beforeClose: (action, instance, done) => {
          // console.log(this.scale.scales)

          if (action === 'confirm') {
            if (this.scale.scales) {
              for (let i = 0; i < this.scale.scales.length; i++) {
                if (this.scale.scales[i] === '') {
                  this.$message({
                    type: 'info',
                    message: '逻辑值不得为空'
                  });
                  return;
                }
              }
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';

              this.requestStrategy
                .changeScale({
                  growUpIds: this.scale.growUpIds.join(','),
                  scales: this.scale.scales.join(','),
                  brandName: 'haier'
                })
                .then((data) => {
                  self.$message({
                    type: 'success',
                    message: '保存成功!'
                  });
                  done();
                  instance.confirmButtonLoading = false;
                  self.listSearch();
                });
            } else {
              self.$message({
                type: 'success',
                message: '保存成功!'
              });
              instance.confirmButtonLoading = false;
              done();
            }
          } else {
            done();
          }
        }
      }).then((action) => {
        if (action === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        }
      });
    },
    switchChange(id, brandName, status) {
      this.requestStrategy
        .growUpChangeStatus({
          id,
          status,
          brandName
        })
        .then((data) => {
          console.log(data);
        });
    },
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    // 跳转模板详情
    toDetail(id, brandName) {
      const path = '/strategy/addgrowupstrategy';
      this.$router.push({
        path,
        query: { id, brandName }
      });
    },
    listSearch() {
      const self = this;

      const data = {
        pageNum: self.pageNo,
        pageSize: self.pageSize
      };

      this.msgListLoading = true;
      this.requestStrategy.growUpQueryPageByBrand(data).then((data) => {
        self.msgListData = data;
        self.msgListLoading = false;
      });
    },
    typeChange() {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.listSearch();
      }
    },
    handleSizeChange(pageSize) {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.pageSize = pageSize;
        this.listSearch();
      }
    },
    handleCurrentChange(pageNo) {
      if (!this.msgListLoading) {
        this.pageNo = pageNo;
        this.listSearch();
      }
    }
  },
  mounted() {
    this.listSearch();
  }
};
</script>
