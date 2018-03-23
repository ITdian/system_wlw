<template>
  <el-main>
    <my-direct></my-direct>
    <div class="page-list">
      <div class="c-search">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="form.name" placeholder="客户名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="find">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="c-process">
          <el-button type="primary" @click="find">导出</el-button>
          <el-button type="primary" @click="openDialog('add')">新增</el-button>
        </div>
      </div>
      <el-table :data="list" style="width: 100%" v-loading="loading">
        <el-table-column label="客户名称" :show-overflow-tooltip="true" width="130" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="联系人" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">{{ scope.row.contactPerson.name  }}</template>
        </el-table-column>

        <el-table-column label="联系方式" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">{{ scope.row.contactPerson.phone }}</template>
        </el-table-column>

        <el-table-column label="办公地址" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">{{ scope.row.address }}</template>
        </el-table-column>

        <el-table-column label="项目服务" :show-overflow-tooltip="true" align="center" width="200">
          <template slot-scope="scope">{{ scope.row.roomName }}</template>
        </el-table-column>

        <el-table-column label="签约电梯数" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>

        <el-table-column label="在保电梯数" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column label="操作" width="80" fixed="right">
          <template slot-scope="scope">
            <el-button @click="openDialog('edit',scope.row)" type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="size"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <add :show="dialogState" :type="dialogState" @close="closeDialog"></add>
    <el-dialog
    title="查看项目"
    width="80%"
    :visible.sync="examineDialog"
    :before-close="closeDialog">
    <el-table :data="list" style="width: 100%" v-loading="loading">
      <el-table-column label="项目名称" :show-overflow-tooltip="true" width="130" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="电梯数" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">{{ scope.row.keyType }}</template>
      </el-table-column>
      <el-table-column label="项目类型" :show-overflow-tooltip="true" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.test }}</template>
      </el-table-column>
      <el-table-column label="项目区域" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="详细地址" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="维保负责人" :show-overflow-tooltip="true" width="130" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="开始日期" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="结束日期" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
    </el-table>
  </el-dialog>
  </el-main>
</template>
<script>
  import {cusHttpUrl} from '../httpUrl';
  import {filterParams} from '../process';
  import myDirect from '@/components/direct';
  import add from './add';
  export default {
    name: 'cusManage',
    components: {myDirect,add},
    data(){
      return {
        list: [],
        form: {
          name: ''
        },
        detail:{},
        currentPage: 1,//当前页码
        total: 1,//总数
        size: 10,//总页数
        loading: false,//列表加载loading
        examineDialog:false,//查看项目
        dialogState:null,//add edit see
      }
    },
    methods: {
      /**
       * @description 打开dialog 编辑/新增/查看
       */
      openDialog(type,row){
        this.dialogState = true;
        this.dialogType = type;
      },
      /**
       * @description 查找
       */
      find(){

      },
      /**
       * @description 换页
       * @param currentPage
       */
      handleCurrentChange(currentPage){
        this.currentPage = currentPage;
        this.get();
      },
      /**
       * @description 关闭dialog
       */
      closeDialog(){
        this.examineDialog = false;
        this.dialogState = false;
      },
      /**
       * @description  获取列表数据
       * @param op http data
       */
      get(){
        this.$xttp.post(cusHttpUrl.list,Object.assign({
          page:this.currentPage,
          size:this.size,
        },filterParams(this.form))).then(res=>{
          if (!res['errorCode']) {
            this.list = res['data'].records;
            this.total = res['data'].total;
          }
        })
      }
    },
    mounted(){
      this.get();
    }
  }
</script>
<style lang="scss" scoped>
  .c-search {
    position: relative;
    width: 100%;
    .c-process {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .page-list {
    width: 100%;
    height: 100%;
  }
</style>
