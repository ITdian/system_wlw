<template>
  <el-main>
    <div>
      <my-direct></my-direct>
      <div class="c-search">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="客户名称">
            <el-input v-model="form.name" placeholder="模糊查询"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="find"><i class="iconfont icon-sousuo">&nbsp;</i>查询</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="c-addBtn" @click="add">新增</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column label="保养单号" :show-overflow-tooltip="true" width="130" align="center">
        <template slot-scope="scope">{{}}</template>
      </el-table-column>
      <el-table-column label="项目名称" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">{{ scope.row.keyType }}</template>
      </el-table-column>

      <el-table-column label="地址" :show-overflow-tooltip="true" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.test }}</template>
      </el-table-column>

      <el-table-column label="品牌" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>

      <el-table-column label="维保员" :show-overflow-tooltip="true" align="center"  width="200">
        <template slot-scope="scope">{{ scope.row.roomName }}</template>
      </el-table-column>

      <el-table-column label="开始时间" :show-overflow-tooltip="true" align="center"  width="170">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>

      <el-table-column label="结束时间" :show-overflow-tooltip="true" align="center"  width="170">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>

      <el-table-column label="耗时" :show-overflow-tooltip="true" align="center"  width="170">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>

      <el-table-column label="签字" :show-overflow-tooltip="true" align="center"  width="170">
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
  </el-main>
</template>
<script>
  import myDirect from '@/components/direct'

  export default {
    name: 'contractManage',
    components:{myDirect},
    data(){
      return {
        msg: 'hello',
        sendData:{
        	brandId: "string",
        	brandName: "string", 
        	companyId: "string", 
        	companyName: "string", 
        	endTime: 0,
        	equipType:0,
        	page:0,
        	size:0,
        	startTime:0,
        	templateName:'String'
        },
        tableData:[],
        form:{
          name:''
        },
        currentPage:1,
        total:1,
        loading:false,//列表加载loading

      }
      // http://apielevator.test.bitiot.com.cn/v1/maintenanceTemplate/list

    },
    methods:{
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
      getListData(){
      	this.$xttp.post('/maintenanceTemplate/list',...this.sendData).then(res=>{})
      },
    },
    created(){
    	this.getListData()

    
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
