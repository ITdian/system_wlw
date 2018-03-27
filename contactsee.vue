<template>
	<div class="contactsee_warp">
		<div class"contactsee_in">
			<div class="contactsee_title">合同详情</div>
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
			  <el-form-item label="合同编号">
			    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
			  </el-form-item>
			  <el-form-item label="合同类型">
			    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
			  </el-form-item>
			 <el-form-item>
		</div>
	</div>
</template>