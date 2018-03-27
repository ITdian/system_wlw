<template>
  <el-main>
    <my-direct @click="handleDirectClick"></my-direct>
    <div v-show="!detailType" class="page-list">
      <div class="c-search">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item>
            <el-autocomplete
              v-model="form.name"
              :fetch-suggestions="userSearchAsync"
              placeholder="全部客户"
              @select="userSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.type" placeholder="全部项目">
              <el-option
              v-for="item in typeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.type" placeholder="全部付款方式">
              <el-option
                v-for="item in typeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.type" placeholder="全部保养类型">
              <el-option
                v-for="item in typeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.type" placeholder="全部">
              <el-option
                v-for="item in typeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.name" placeholder="合同编号"></el-input>
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
        <el-table-column label="合同编号" :show-overflow-tooltip="true" width="130" align="center">
          <template slot-scope="scope">？</template>
        </el-table-column>
        <el-table-column label="客户名称" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">？</template>
        </el-table-column>

        <el-table-column label="保养类型" :show-overflow-tooltip="true" align="center" width="100">
          <template slot-scope="scope">？</template>
        </el-table-column>

        <el-table-column label="关联项目" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">？</template>
        </el-table-column>

        <el-table-column label="付款方式" :show-overflow-tooltip="true" align="center" width="200">
          <template slot-scope="scope">{{ scope.row.roomName }}</template>
        </el-table-column>

        <el-table-column label="维保负责人" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>

        <el-table-column label="保养开始时间" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>

        <el-table-column label="保养结束时间" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>

        <el-table-column label="是否到期" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{ scope.row.number }}</template>
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
    <add :show="detailType" :detail="detail" :type="detailType"></add>
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
  import {contractHttpUrl} from '../httpUrl';
  import myDirect from '@/components/direct';
  import add from './add';
  export default {
    name: 'contractManage',
    components: {myDirect,add},
    data(){
      return {
        typeOption:[],
        searchTimer:null,//检索下拉获取 定时器


        list: [],
        form: {
          name: '',
          type:null,
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
        this.detailType = 'see';
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
       * @param op
       */
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
      },
      /**
       * @description 检索 全部客户
       */
      userSearchAsync(queryString,cb){
        clearTimeout(this.searchTimer);
        if (queryString.trim() === '') {
          cb([]);
          return;
        }
        this.searchTimer = setTimeout(() => {
          //如果没有数据,传入空值
          //cb([]); cb(res['datas']);
        }, 500);
      },
      userSelect(item){
        console.log(item)
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
