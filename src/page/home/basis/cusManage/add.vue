<template>
  <el-dialog
    :title="type === 'add' ? '新增' : type === 'edit' ? '编辑' : '详情'"
    width="80%"
    :visible.sync="show"
    :before-close="closeDialog">
    <el-form :model="form" ref="form" label-width="120px" class="demo-form">
      <el-form-item label="客户名称" required>
        <el-input v-model="form.name" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="联系人" required>
        <el-input v-model="form.name" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" required>
        <el-input v-model="form.name" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="所在地区" required>
        <el-cascader
          :options="addressOption"
          v-model="form.address"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" required>
        <el-input v-model="form.name" :disabled="disabled"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.name" :disabled="disabled"></el-input>
      </el-form-item>


      <el-form-item v-if="!disabled">
        <el-button type="primary" @click="">保存</el-button>
      </el-form-item>
    </el-form>

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
  export default {
    props:{
      show:{
        default:false,
      },
      type:{
        default:'add',
      },
      detail:{
        name:'',
        address:null,
      }
    },
    data(){
      return {
        form:{},
        addressOption:address,
        addressValue:null
      }
    },
    computed:{
      disabled(){
        return this.type === 'see'
      }
    },
    methods:{
      closeDialog(){
        this.$emit('close')
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
