<template>
  <el-dialog
    :title="type === 'add' ? '新增' : type === 'edit' ? '编辑' : '详情'"
    width="1100px"
    :visible.sync="show"
    :before-close="closeDialog">
    <div class="con-wrap" v-if="show">
      <div class="form-wrap">
        <el-form :model="form" ref="form" label-width="120px" class="demo-form">
          <el-form-item label="客户名称" required>
            <span v-if="disabled">{{form.name}}</span>
            <el-input v-else v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="联系人" required>
            <span v-if="disabled">{{form.contactPerson.name}}</span>
            <el-input v-else v-model="form.contactPerson.name"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" required>
            <span v-if="disabled">{{form.contactPerson.phone}}</span>
            <el-input v-else v-model="form.contactPerson.phone"></el-input>
          </el-form-item>
          <el-form-item label="所在地区" required>
            <span v-if="disabled">{{`${ form['province'] }/${ form['city'] }/${ form['area'] }`}}</span>
            <el-cascader
              v-else
              :options="addressOption"
              v-model="addressSelect"
              :disabled="disabled"
              @change="addressChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" required>
            <span v-if="disabled">{{form.address}}</span>
            <el-input v-else v-model="form.address"></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <span v-if="disabled">{{form.remark ? form.remark : '-'}}</span>
            <el-input v-else type="textarea" v-model="form.remark"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button v-if="type !== 'see'" type="primary" @click="handleSave">保存</el-button>
            <el-button v-else type="primary" @click="handleEdit">编辑</el-button>
            <el-button v-if="type === 'edit'" type="primary" @click="handleDelete">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="map-wrap">
        <my-map ref="myMap" :disabled="disabled" @click="mapClick" @complete="mapComplete"></my-map>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  import address from '@/utils/citys';
  import map from '@/components/map';
  import {cusHttpUrl as httpUrl} from '../httpUrl';
  import {filterParams} from '../process';
  export default {
    components:{'my-map':map},
    data(){
      return {
        show:false,
        type:{},
        detail:{},
        info:{},
        addressSelect: ['广东省', '广州市', '天河区'],
        form: {
          address: null,//详细地址
          area: null,//区
          city: null,//市
          province: null,//省
          name: '',//客户名称
          contactPerson: {
            name: null,//联系人
            phone: null,//联系人方式
          },
          remark: null,//备注
        },
        addressOption: address,
        addressValue: null,
      }
    },
    computed: {
      disabled(){
        return this.type === 'see'
      }
    },
    methods: {
      /**
       * @description 保存
       */
      handleSave(){
        this.$Validate({
          obj:this.form,
          rules:{
            name: {
              required:'请输入客户名称'
            },//客户名称
            address: {
              required:'请输入详细地址'
            },//详细地址
            'contactPerson.name': {
              required:'请输入联系人姓名',
            },
            'contactPerson.phone': {
              required:'请输入联系人电话',
              isPhone:'请输入正确的电话号码'
            },
          }
        }).then(()=>{
          this.type === 'add' ? (this.add()) : (this.edit());
        });
      },
      add(){
        this.$xttp.post(httpUrl.add,filterParams(this.form))
          .then(res=>{
            if(!res['errorCode']) {
              this.$message.success('新增客户成功');
              this.$emit('onload');
              this.show = false;
            }
          })
      },
      edit(){
        this.$xttp.post(httpUrl.edit,Object.assign({},filterParams(this.form),{
          id:this.info.id
        })).then(res=>{
            if(!res['errorCode']) {
              this.$message.success('修改成功');
              this.$emit('onload');
              this.show = false;
            }
          })
      },
      /**
       * @description 编辑
       */
      handleEdit(){
        this.type = 'edit';
      },
      /**
       * @description 删除
       */
      handleDelete(){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      closeDialog(){
        this.show = false;
      },
      addressChange(val){
        this.form.province = val[0];//省
        this.form.city = val[1];//市
        this.form.area = val[2];//区
      },
      mapClick(val){
        this.form.province = val.province;//省
        this.form.city = val.city;//市
        this.form.area = val.district;//区
        this.form.address = val.formattedAddress;//区
      },
      mapComplete(val){
        this.form.province = val.province;//省
        this.form.city = val.city;//市
        this.form.area = val.district;//区
        this.form.address = val.formattedAddress;//区
      },
      destroyMap(){
        this.geolocation = null;
        this.form = {
          address: null,//详细地址
          area: null,//区
          city: null,//市
          province: null,//省
          name: '',//客户名称
          contactPerson: {
            name: null,//联系人
            phone: null,//联系人方式
          },
          remark: null,//备注
        }

      },
      get(){
        this.initMap();
      },
      initMap(){
        this.$nextTick(()=>{
          this.$refs.myMap.$emit('mapInit',{
            disabled:this.type === 'see',
            initAddress: this.type === 'add' ? null : `${this.addressSelect.join('')}${this.form.address}`
          })
        })
      }
    },
    mounted(){
      this.$on('show',op => {
        this.type = op.type;
        this.info = op.info;
        if (this.type === 'see') {//查看
          if (this.info.name) {
            this.addressSelect = [this.info.province,this.info.city,this.info.area];
          }
          for(let key in this.form){
            this.form[key] = this.info[key];
          }
//          this.get();
        } else {//新增
          this.form = {
            address: null,//详细地址
            area: null,//区
            city: null,//市
            province: null,//省
            name: '',//客户名称
            contactPerson: {
              name: null,//联系人
              phone: null,//联系人方式
            },
            remark: null,//备注
          }
        }
        //初始化
        this.initMap();
        this.show = true;
      });
      this.$on('hide',()=> {this.destroyMap(),this.show = false})
    },
    watch: {
      show(newVal){
        if (newVal) {


        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  .con-wrap {
    display: flex;
    justify-content: space-around;
  }

  .form-wrap {
    width: 650px;
    padding: 0 20px;
    border-right: 1px dashed #eee;
  }

  .map-wrap {
    width: 350px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
