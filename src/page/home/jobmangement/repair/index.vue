<template>
   <!--维修管理-->
  <el-main>
    <div>
      <my-direct></my-direct>
      <div class="c-search">
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-select v-model="statusValue" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
           <el-date-picker v-model="datechose" type="daterange"align="right" unlink-panels range-separator="至"start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
    </el-date-picker>
          <el-input v-model="inputName" placeholder="请输入项目名"></el-input>
          
          <el-button type="primary">搜索</el-button>
        </el-form>
        <el-button type="primary" class="c-addBtn" @click="add">新增</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column label="项目名称" :show-overflow-tooltip="true" width="130" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="地址" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">{{ scope.row.keyType }}</template>
      </el-table-column>

      <el-table-column label="品牌" :show-overflow-tooltip="true" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.test }}</template>
      </el-table-column>

      <el-table-column label="维保员" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>

      <el-table-column label="维修状态" :show-overflow-tooltip="true" align="center"  width="200">
        <template slot-scope="scope">{{ scope.row.roomName }}</template>
      </el-table-column>

      <el-table-column label="召修原因" :show-overflow-tooltip="true" align="center"  width="170">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>

      <el-table-column label="召修时间" :show-overflow-tooltip="true" align="center"  width="170">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>

      <el-table-column label="签字" :show-overflow-tooltip="true" align="center"  width="80">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>
<!-- 
      <el-table-column label="操作" :show-overflow-tooltip="true" align="center"  width="170">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column> -->

      <el-table-column label="操作" width="250" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" size="small">维修报告</el-button>
          <el-button @click="edit(scope.row)" type="primary" size="small">轨迹</el-button>
          <el-button @click="edit(scope.row)" type="primary" size="small">反馈</el-button>
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
        tableData:[{phone:8888}],
        form:{
          name:''
        },
        currentPage:1,
        total:1,
        loading:false,//列表加载loading

        statusList:[{value:'选项一',label:'全部状态'}],
        statusValue:'',
        inputName:'',//输入名称

        //日期选择
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        datechose:''
       

      }
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

      }
    }
  }
</script>
<style lang="scss" scoped>
  .c-search {
    position: relative;
    width: 100%;
    margin-bottom:13px;
    .c-addBtn {
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }
</style>
