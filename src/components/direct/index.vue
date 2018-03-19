<template>
  <div style="margin: 0 -20px 10px -20px;border-bottom: 1px solid gray;padding: 0 0 6px 20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in direct" :key="index"> {{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name:'myDirect',
    data:() => {
        return {

        }
    },
    computed:mapGetters(['direct'])
}
</script>
