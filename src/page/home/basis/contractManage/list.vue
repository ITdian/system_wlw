<template>
  <el-main>
    <div>
      <my-direct></my-direct>
      <div class="c-search">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="客户名称">
            <el-input v-model="form.name" placeholder="关键字搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="find"><i class="iconfont icon-sousuo">&nbsp;</i>查询</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="c-addBtn" @click="add">新增</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column label="合同编号" :show-overflow-tooltip="true" width="130" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="客户名称" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">{{ scope.row.keyType }}</template>
      </el-table-column>

      <el-table-column label="合同类型" :show-overflow-tooltip="true" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.test }}</template>
      </el-table-column>

      <el-table-column label="签约日期" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>

      <el-table-column label="项目数" :show-overflow-tooltip="true" align="center" width="200">
        <template slot-scope="scope">{{ scope.row.roomName }}</template>
      </el-table-column>

      <el-table-column label="电梯数" :show-overflow-tooltip="true" align="center" width="170">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>

      <el-table-column label="维保负责人" :show-overflow-tooltip="true" align="center" width="170">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>

      <el-table-column label="首次保养时间" :show-overflow-tooltip="true" align="center" width="170">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>

      <el-table-column label="结束时间" :show-overflow-tooltip="true" align="center" width="170">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>

      <el-table-column label="操作" width="80" fixed="right">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="c-block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>
<script>
  import myDirect from '@/components/direct'
  export default {
    name: 'contractManage',
    components: {myDirect},
    data(){
      return {
        msg: 'hello',
        tableData: [],
        form: {
          name: ''
        },
        currentPage: 1,
        total: 1,
        loading: false,//列表加载loading
        dialogVisible:true,

      }
    },
    methods: {
      /**
       * @description 新增
       */
      add(){
        console.log('新增')
      },
      /**
       * @description 查找
       */
      find(){

      },
      /**
       * @description 编辑
       * @param row 行数据
       */
      edit(row){

      },
      /**
       * @description 换页
       */
      handleCurrentChange(){

      },
      handleClose(){

      }
    }
  }
</script>
<style lang="scss" scoped>
  .c-search {
    position: relative;
    width: 100%;
    .c-addBtn {
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }
</style>
