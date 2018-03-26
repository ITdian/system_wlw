<template>
  <el-main>
    <my-direct @click="handleDirectClick"></my-direct>
    <div v-show="!detailType" class="page-list">
      <div class="c-search">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="form.name" placeholder="项目"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.name" placeholder="班组"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.name" placeholder="姓名/手机号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="find">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="c-process">
          <el-button type="primary">导出</el-button>
          <el-button type="primary">班组管理</el-button>
          <el-button type="primary" @click="add">新增</el-button>
        </div>
      </div>
      <el-table :data="list" style="width: 100%" v-loading="loading">
        <el-table-column label="姓名" :show-overflow-tooltip="true" width="130" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="手机号码" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">{{ scope.row.keyType }}</template>
        </el-table-column>

        <el-table-column label="性别" :show-overflow-tooltip="true" align="center" width="100">
          <template slot-scope="scope">{{ scope.row.test }}</template>
        </el-table-column>

        <el-table-column label="岗位" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>

        <el-table-column label="所属班组" :show-overflow-tooltip="true" align="center" width="200">
          <template slot-scope="scope">{{ scope.row.roomName }}</template>
        </el-table-column>

        <el-table-column label="服务项目" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>

        <el-table-column label="工作状态" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>

        <el-table-column label="年龄" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>

        <el-table-column label="工作年限" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>

        <el-table-column label="资质证件" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>

        <el-table-column label="操作" width="80" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="small">保养计划</el-button>
            <el-button type="primary" size="small">查看位置</el-button>
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
    <add :show="detailType" :type="detailType"></add>
  </el-main>
</template>
<script>
  import {contractHttpUrl} from '../httpUrl';
  import myDirect from '@/components/direct';
  import add from './add';
  export default {
    name: 'employeeManage',
    components: {myDirect,add},
    data(){
      return {
        detail:{},
        detailType:null,//add
        list: [],
        form: {
          name: '',
          type:null,
        },
        typeOption:[{
          value:'全部类型',
          label:'全部类型'
        }],
        currentPage: 1,//当前页码
        total: 1,//总数
        size: 10,//总页数
        loading: false,//列表加载loading

      }
    },
    methods: {
      /**
       * @description 新增
       */
      add(){
        this.detailType = 'add';
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
        this.detailType = 'edit';
        this.detail = row;
      },
      /**
       * @description 换页
       * @param currentPage
       */
      handleCurrentChange(currentPage){
        this.currentPage = currentPage;
        this.get();
      },
      handleClose(){
        this.examineDialog = false;
      },
      handleDirectClick(){
        this.detailType = null;
      },
      get(op = {}){
        this.$xttp.post(contractHttpUrl.list,Object.assign({
          page:this.currentPage,
          size:this.size,
        },op)).then(res=>{
          if (!res['errorCode']) {
            this.list = res['data'].records;
            this.total = res['data'].total;
          }
        })
      }
    },
    mounted(){

    }
  }
</script>
<style lang="scss" scoped>
  .c-search {
    position: relative;
    width: 100%;
    .c-process {
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }
  .page-list {
    width: 100%;
    height: 100%;
  }
</style>
