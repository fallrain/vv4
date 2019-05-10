<template>
  <iframe src="" style="width:100%;height: 100%;border:0;" id="system-strategy"></iframe>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction',
      getUserInfo: 'getUserInfo'
    })
  },
  data() {
    return {
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      strategyName: ''
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
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    // 跳转模板详情
    toDetail(id, brandName) {
      const path = '/strategy/addsystemstrategy';
      this.$router.push({
        path,
        query: { id, brandName }
      });
    },
    // 模板删除
    deleteTpl(id, brandName) {
      const self = this;

      this.$confirm('您确定要删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.requestStrategy
            .systemChangeStatus({
              id,
              status: -1,
              brandName
            })
            .then((data) => {
              self.listSearch();
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    listSearch() {
      const self = this;

      const data = {
        pageNum: self.pageNo,
        PageSize: self.pageSize,
        strategyName: self.strategyName
      };

      this.msgListLoading = true;
      this.requestStrategy.queryPageByBrand(data).then((data) => {
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
    if (this.getUserInfo.employeeNumber) {
      this.requestStrategy
        .ssoLogin({
          nickname: this.getUserInfo.employeeNumber,
          client: 'membercenter',
          target: '/point/new_rules',
          sign: this.getUserInfo.haierIntegralSign
        })
        .then((data) => {
          $('#system-strategy').attr('src', data);
        });
    } else {
      this.$router.push({
        path: '/home'
      });
    }
  }
};
</script>
