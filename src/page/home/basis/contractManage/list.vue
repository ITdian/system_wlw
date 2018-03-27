<template>
  <el-main>
    <my-direct @click="handleDirectClick"></my-direct>
    <div v-show="!detailType" class="page-list">
      <div class="c-search">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item>
            <el-select
              v-model="form.propertyCompanyName"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="全部客户"
              :remote-method="userSearchAsync"
              @blur="selectBlur"
              :loading="selectLoading">
              <el-option
                v-for="item in userOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="form.projectName"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="全部项目"
              :remote-method="projectSearchAsync"
              @blur="selectBlur"
              :loading="selectLoading">
              <el-option
                v-for="item in projectOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.paymentType" placeholder="全部付款方式">
              <el-option
                v-for="item in payOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.contractType" placeholder="全部保养类型">
              <el-option
                v-for="item in typeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.expire" placeholder="全部">
              <el-option
                v-for="item in expireOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.contractNum" placeholder="合同编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="find">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="c-process">
          <el-button type="primary" @click="openDialog('add')">新增</el-button>
        </div>
      </div>
      <el-table :data="list" style="width: 100%" v-loading="loading">
        <el-table-column label="合同编号" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">{{scope.row.contractNum}}</template>
        </el-table-column>
        <el-table-column label="客户名称" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">{{scope.row.contractName}}</template>
        </el-table-column>

        <el-table-column label="保养类型" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.mintenanceMode === 1">半包</span>
            <span v-if="scope.row.mintenanceMode === 2">大包</span>
            <span v-if="scope.row.mintenanceMode === 3">清包</span>
          </template>
        </el-table-column>

        <el-table-column label="关联项目" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.projectNumber}}</span>
          </template>
        </el-table-column>

        <el-table-column label="付款方式" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.payType === 1">月付</span>
            <span v-if="scope.row.payType === 2">季度付</span>
            <span v-if="scope.row.payType === 3">半年付</span>
            <span v-if="scope.row.payType === 4">年付</span>
          </template>
        </el-table-column>

        <el-table-column label="维保负责人" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{ scope.row.maintenanceUserName}}</template>
        </el-table-column>

        <el-table-column label="服务开始时间" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">
            <span v-if="scope.row.startMaintenanceDate">{{new Date(scope.row.startMaintenanceDate).toLocaleDateString().replace(/\//g,'-')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="服务结束时间" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.endDate">{{new Date(scope.row.endDate).toLocaleDateString().replace(/\//g,'-')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="是否到期" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.endDate">{{scope.row.expire}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button @click="openDialog('see',scope.row)" type="primary" size="small">查看详情</el-button>
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
    <add :show="detailType" :info="detail" :type="detailType"></add>
    <el-dialog
      title="查看项目"
      width="80%"
      :visible.sync="examineDialog"
      :before-close="handleClose">
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
  import {contractHttpUrl as httpUrl} from '../httpUrl';
  import {filterParams} from '../process';
  import myDirect from '@/components/direct';
  import add from './add';
  export default {
    name: 'contractManage',
    components: {myDirect,add},
    data(){
      return {
        userOption:[],
        projectOption:[],
        typeOption:[
          {
            label:'全部',
            value:null
          },
          {
            label:'半包',
            value:1
          },
          {
            label:'大包',
            value:2
          },
          {
            label:'清包',
            value:3
          },
        ],//保养类型下拉数据
        payOption:[
          {
            label:'全部',
            value:null
          },
          {
            label:'月付',
            value:1,
          },
          {
            label:'季度付',
            value:2,
          },
          {
            label:'半年付',
            value:3,
          },
          {
            label:'年付',
            value:4,
          },
        ],//付款方式下拉数据
        expireOption:[
          {
            label:'全部',
            value:null
          },
          {
            label:'即将到期',
            value:1
          },
          {
            label:'未到期',
            value:2
          },
          {
            label:'到期',
            value:3
          },
        ],//到期类型下拉数据

        searchTimer:null,//检索下拉获取 定时器
        selectLoading:false,//select 下拉搜索loading

        list: [],
        form: {
          propertyCompanyId:null,//客户名称
          projectId:null,//项目名称
          paymentType:null,//付款方式
          contractType:null,//保养类型
          expire:null,//到期类型
          contractNum:null,//合同编号
        },
        currentPage: 1,//当前页码
        total: 1,//总数
        size: 10,//总页数
        loading: false,//列表加载loading

        detail:{},
        detailType:null,//add edit see

        examineDialog:false,//查看
      }
    },
    methods: {
      /**
       * @description 新增
       */
      openDialog(type,row){
        this.detailType = type;
        if (row) this.detail = row;
      },
      /**
       * @description 查找
       */
      find(){
        this.get();
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
      handleClose(){
        this.examineDialog = false;
      },
      /**
       * @description 切换面包屑
       */
      handleDirectClick(){
        this.detailType = null;
      },
      /**
       * @description 获取列表数据
       */
      get(){
        this.$xttp.post(httpUrl.list,Object.assign({
          page:this.currentPage,
          size:this.size,
        },filterParams(this.form))).then(res=>{
          if (!res['errorCode']) {
            let now = new Date().getTime();
            res['data'].records.map(val=>{
              val.expire = val.endDate < now ? '到期' : val.endDate - now  < 5270400000 ? '即将到期' : '未到期';
            })
            this.list = res['data'].records;
            this.total = res['data'].total;
          }
        })
      },
      /**
       * @description 检索 全部客户
       */
      userSearchAsync(queryString){
        clearTimeout(this.searchTimer);
        if (queryString.trim() === '') {
          return false;
        }
        this.selectLoading = true;
        this.searchTimer = setTimeout(() => {
          this.$xttp.post(httpUrl.searchCus,{
            name:queryString,
            page:1,
            size:10,
          }).then(res => {
            if (!res['errorCode']) {
              res['data'].records.forEach(val => {
                this.userOption.push({label:val.name,value:val.id,})
              });
            }
            this.selectLoading = false;
          })
        }, 500);
      },
      /**
       * @description 检索项目名称
       * @param queryString
       * @returns {boolean}
       */
      projectSearchAsync(queryString){
        clearTimeout(this.searchTimer);
        if (queryString.trim() === '') {
          return false;
        }
        this.selectLoading = true;
        this.searchTimer = setTimeout(() => {
          this.$xttp.post(httpUrl.searchProject,{
            houseName:queryString,
            page:1,
            size:10,
          }).then(res => {
            if (!res['errorCode']) {
              res['data'].records.forEach(val => {
                this.projectOption.push({label:val.houseName,value:val.id,})
              });
            }
            this.selectLoading = false;
          })
          this.selectLoading = false;
        }, 500);
      },
      selectBlur(){
        this.userOption = [];
        this.projectOption = [];
      },
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
      right: 0px;
      top: 0px;
    }
  }
  .page-list {
    width: 100%;
    height: 100%;
  }
</style>
