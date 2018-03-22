<template>
  <el-main>
    <div>
      <my-direct></my-direct>
      <div class="c-search">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="项目名称">
            <el-input v-model="form.name" placeholder="关键字搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="find"><i class="iconfont icon-sousuo">&nbsp;</i>查询</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="c-addBtn" @click="onSubmit">新增</el-button>
      </div>
    </div>
  </el-main>
</template>

<script>
  import myDirect from '@/components/direct'
  export default {
    name: "other",
    data() {
      return {
        form:{
          name:null
        }
      }
    },
    components: {
      myDirect
    },
    methods: {
      onSubmit() {//添加按钮
        this.notice = null;
        this.isShow = !this.isShow;
      },
      handleCurrentChange(val) {
        if (this.currentPage !== val) {
          this.sendAjax(val);
        }
      },
      find(){
        this.sendAjax(1);
      },
    },
    mounted() {

    }
  };
</script>

<style scoped lang="scss">
  .c-body {
    width: 90%;
    &.c-maxWidth {
      max-width: calc(100vw - 200px);
    }
  }

  .c-navDetail {
    margin-bottom: 10px;
    li {
      float: left;
      margin-right: 10px;
    }
  }

  .c-block {
    margin-top: 15px;
  }

  .c-search {
    position: relative;
    width: 100%;
    .c-addBtn {
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }

  // 切换动画
  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s ease;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: rotateY(180deg);
  }

  .fade1-enter-active, .fade1-leave-active {
    transition: all 0.5s ease;
  }

  .fade1-enter, .fade1-leave-active {
    opacity: 0;
    transform: translateX(-500px);
  }
</style>
