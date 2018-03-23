<template>
  <el-dialog
    :title="type === 'add' ? '新增' : type === 'edit' ? '编辑' : '详情'"
    width="80%"
    :visible.sync="show"
    :before-close="closeDialog">

  </el-dialog>
</template>
<script>
  export default {
    props:{
      show:{
        default:false,
      },
      type:{
        default:'add',
      }
    },
    data(){
      return {

      }
    },
    methods:{
      closeDialog(){
        this.show = false;
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
