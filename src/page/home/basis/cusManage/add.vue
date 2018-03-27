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
            <el-input v-model="form.name" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="联系人" required>
            <el-input v-model="form.contactPerson.name" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" required>
            <el-input v-model="form.contactPerson.phone" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="所在地区" required>
            <el-cascader
              :options="addressOption"
              v-model="addressSelect"
              :disabled="disabled"
              @change="addressChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" required>
            <el-input v-model="form.address" :disabled="disabled"></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.remark" :disabled="disabled"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button v-if="type === 'add' || selfType === 'edit'" type="primary" @click="handleSave">保存</el-button>
            <el-button v-if="selfType === 'edit'" type="primary" @click="handleDelete">删除</el-button>
            <el-button v-if="type === 'see' && selfType !== 'edit'" type="primary" @click="handleEdit">编辑</el-button>
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
  export default {
    components:{'my-map':map},
    props: {
      show: {
        default: false,
      },
      type: {},
      detail: {}
    },
    data(){
      return {
        selfShow:false,
        selfType: null,
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
        if (this.selfType === 'edit') return false;
        return this.type === 'see'
      }
    },
    methods: {
      /**
       * @description 保存
       */
      handleSave(){
        if (this.type === 'add') {//新增

        } else if (this.selfType === 'edit') {//编辑

        }
      },
      /**
       * @description 编辑
       */
      handleEdit(){
        this.selfType = 'edit';
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
        this.$emit('close')
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
        console.log('Complete')
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
    },
    watch: {
      show(newVal){
        if (newVal) {
          //初始化
          if (this.detail.name) {
            this.form = JSON.parse(JSON.stringify(this.detail));
            this.addressSelect = [this.detail.province,this.detail.city,this.detail.area];
          }
          this.$nextTick(()=>{
            this.$refs.myMap.$emit('mapInit',{
              disabled:(this.type !== 'add' && this.selfType !== 'edit'),
              initAddress: this.type === 'add' ? null : `${this.addressSelect.join('')}${this.form.address}`
            })
          })
//          this.initMap();
        } else {
          this.destroyMap();
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
