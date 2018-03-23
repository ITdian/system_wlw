<template>
  <el-main>
    <my-direct @click="handleDirectClick"></my-direct>
    <div v-show="!detailType" class="page-list">
      <div class="c-search">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item>
            <el-select v-model="form.useType" placeholder="全部类型">
              <el-option
                v-for="item in typeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.brandId" placeholder="品牌"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.name" placeholder="项目名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.name" placeholder="位置"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.elevatorId" placeholder="梯号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="find">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="c-process">
          <el-button type="primary" @click="importDialog = true">导入</el-button>
          <el-button type="primary" @click="maintainDialog = true">导出</el-button>
          <el-button type="primary" @click="add">新增</el-button>
        </div>
      </div>
      <el-table :data="list" style="width: 100%"
                v-loading="loading"
                @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="梯号" :show-overflow-tooltip="true" width="130" align="center">
          <template slot-scope="scope">{{ scope.row.elevatorNum }}</template>
        </el-table-column>
        <el-table-column label="项目名称" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">{{ scope.row.buildName }}</template>
        </el-table-column>

        <el-table-column label="品牌" :show-overflow-tooltip="true" align="center" width="100">
          <template slot-scope="scope">{{ scope.row.brandName  }}</template>
        </el-table-column>

        <el-table-column label="电梯类型" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 1">直梯</span>
            <span v-if="scope.row.type === 2">扶梯</span>
            <span v-if="scope.row.type === 3">自动人行道</span>
          </template>
        </el-table-column>

        <el-table-column label="位置" :show-overflow-tooltip="true" align="center" width="200">
          <template slot-scope="scope">?</template>
        </el-table-column>

        <el-table-column label="电梯状态" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">
            <span v-if="scope.row.elevatorStatus === 1">正常</span>
            <span v-if="scope.row.elevatorStatus === 2">检修</span>
            <span v-if="scope.row.elevatorStatus === 3">检修终端断开</span>
          </template>
        </el-table-column>

        <el-table-column label="维保班组" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{ scope.row.companyName }}</template>
        </el-table-column>

        <el-table-column label="维工1" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">?</template>
        </el-table-column>

        <el-table-column label="维工2" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">?</template>
        </el-table-column>

        <el-table-column label="最近保养时间" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{scope.row.lastMaintenanceDate }}</template>
        </el-table-column>

        <el-table-column label="下次保养时间" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">?</template>
        </el-table-column>

        <el-table-column label="操作" width="80" fixed="right">
          <template slot-scope="scope">
            <!--<el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button>-->
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
    <el-dialog
      title="维保人员"
      width="80%"
      :visible.sync="maintainDialog"
      :before-close="handleClose">
      <el-form :model="maintainForm" ref="maintainForm" label-width="120px" class="demo-form">
        <el-form-item label="维保人员1" required>
          <el-input v-model="maintainForm.name" size="medium" ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" required>
          <el-input v-model="maintainForm.name" size="medium" ></el-input>
        </el-form-item>
        <el-form-item label="维保人员2">
          <el-input v-model="maintainForm.name" size="medium" ></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="maintainForm.name" size="medium" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="导入"
      width="80%"
      :visible.sync="importDialog"
      :before-close="handleClose">
      <el-form :model="importForm" ref="importForm" label-width="120px" class="demo-form">
        <el-form-item label="单文件上传" required>
          <el-upload
            class="upload-demo"
            drag
            action=""
            :http-request="uploadFile"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
    <add :show="detailType" :type="detailType"></add>
  </el-main>
</template>
<script>
  import {certificateHttpUrl} from '../httpUrl';
  import {filterParams} from '../process';
  import add from './add';
  import myDirect from '@/components/direct';
  export default {
    name: 'employeeManage',
    components: {myDirect,add},
    data(){
      return {
        detail: {},
        detailType: null,//add see
        list: [],
        form: {
          name: null,
          useType : null,//类型
          brandId:null,//品牌 id?
          elevatorId:null,//梯号 id?
          //项目名称
          //位置
        },
        typeOption: [
          {
            value: 1,
            label: '别墅梯'
          },
          {
            value: 2,
            label: '客梯'
          },
          {
            value: 3,
            label: '货梯'
          },
          {
            value: 4,
            label: '车库梯'
          },
          {
            value: 5,
            label: '医用梯'
          },
        ],
        currentPage: 1,//当前页码
        total: 1,//总数
        size: 10,//总页数
        loading: false,//列表加载loading

        maintainDialog: false,//维保人员
        importDialog: false,//导入

        maintainForm:{
          name:null,
        },//维保人员
        importForm:{
          file:null,
        },//导入
      }
    },
    methods: {
      /**
       * @description 新增
       */
      add(){
        this.detailType = 'add';
      },
      see(row){
        this.detailType = 'see';
        this.detail = row;
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
       * @description table select
       */
      handleSelectionChange(){

      },
      handleClose(){
        this.maintainDialog = false;
        this.importDialog = false;
      },
      handleDirectClick(){
        this.detailType = null;
      },
      get(){
        this.$xttp.post(certificateHttpUrl.list, Object.assign({
          page: this.currentPage,
          size: this.size,
        }, filterParams(this.form))).then(res => {
          if (!res['errorCode']) {
            this.list = res['data'].records;
            this.total = res['data'].total;
          }
        })
      },
      /**
       * @description 导入文件
       */
      uploadFile(file){
        console.log(file)
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
