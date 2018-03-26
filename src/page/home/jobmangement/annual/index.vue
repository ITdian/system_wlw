<template>
  <!--年检管理-->
  <el-main>
    <div>
      <my-direct></my-direct>
      <div class="c-search">
        
            <el-select v-model="statusValue" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

            <el-input v-model="input" placeholder="项目名称、梯号"></el-input>
            <el-button type="primary" @click="find"><i class="iconfont icon-sousuo">&nbsp;</i>查询</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="c-addBtn" @click="add">新增</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column label="年检编号" :show-overflow-tooltip="true" width="130" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="梯号" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">{{ scope.row.keyType }}</template>
      </el-table-column>

      <el-table-column label="楼盘名称" :show-overflow-tooltip="true" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.test }}</template>
      </el-table-column>

      <el-table-column label="电梯位置" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>

      <el-table-column label="年检时间" :show-overflow-tooltip="true" align="center"  width="200">
        <template slot-scope="scope">{{ scope.row.roomName }}</template>
      </el-table-column>

      <el-table-column label="特殊检查项" :show-overflow-tooltip="true" align="center"  width="170">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>

      <el-table-column label="耗时" :show-overflow-tooltip="true" align="center"  width="170">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>

      <el-table-column label="状态" :show-overflow-tooltip="true" align="center"  width="170">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>

      

      <el-table-column label="操作" width="200" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" size="small">详情</el-button>
          <el-button @click="edit(scope.row)" type="primary" size="small">合格证</el-button>
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
        sendData:{},
        //状态选择
         statusList:[{value:'选项一',label:'全部状态'},{value:'选项二',label:'未完成年检'},{value:'选项二',label:'已完成年检'}],
        statusValue:'',
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
    margin-bottom:13px;
    .c-addBtn {
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }
</style>
