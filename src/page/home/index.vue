<template>
	<div class="searchCard flexCard">
		<el-form inline>
			<el-form-item label="姓名:">
				<el-input v-model.trim="form.userName"></el-input>
			</el-form-item>
			<el-form-item label="手机号码:">
				<el-input v-model.trim="form.phone"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search">搜索</el-button>
				<el-button @click="reset">重置</el-button>
			</el-form-item>
		</el-form>
		<div>
			<el-button type="primary" @click="addData">新增</el-button>
		</div>
	</div>

	<el-card class="table">
		<el-table :data="tableData" style="width: 100%" size="large" ref="tableRef">
			<el-table-column prop="roomLocation" label="房间" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName" label="姓名" show-overflow-tooltip></el-table-column>
			<el-table-column label="身份" show-overflow-tooltip>
				<template #default="scope">{{ scope.row.relationship }}</template>
			</el-table-column>
			<el-table-column label="性别" show-overflow-tooltip>
				<template #default="scope">{{ scope.row.sex }}</template>
			</el-table-column>

			<el-table-column prop="phone" label="手机号码" min-width="120px" show-overflow-tooltip></el-table-column>

			<el-table-column label="创建时间" show-overflow-tooltip min-width="120px">
				<template #default="scope">{{ dateFormat(scope.row.createAt)  }}</template>
			</el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<span class="operation" @click="check(scope.row)">查看</span>
					<span class="operation" @click="del(scope.row)">删除</span>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="customPagination" :currentPage="currentPage" :page-size="pageSize"
			:page-sizes="[5,10,20,50]" layout="total, sizes, prev, pager, next, jumper" :total="total"
			@size-change="handleSizeChange" @current-change="handleCurrentChange">
		</el-pagination>
	</el-card>
	<confirm ref="confirm" content="确定删除此信息？" @confirm="cancelConfirm"></confirm>
	<detail ref="detail"></detail>
	<add ref="add"></add>
</template>

<script setup>
import confirm from "@/components/confirm.vue";
import detail from "./detail.vue";
import add from "./add.vue";
// import { ElMessage } from "element-plus";
// import { ref, reactive, getCurrentInstance } from "vue";
import { dateFormat } from "@/utils/time.js";


let instance = getCurrentInstance();
let api = instance.appContext.config.globalProperties.$api;







const form = reactive({
	relationship: null,
	phone: null,
	userName: null,
	roomId: null,
	buildingId: null,
})


let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(0);
//分页
let handleSizeChange = (val) => {
	pageSize.value = val;
	getListPage()
}
let handleCurrentChange = (val) => {
	currentPage.value = val;
	getListPage()
}

let tableData = ref([]);

//搜索
const search = () => {
	currentPage.value = 1;
	pageSize.value = 10;
	getListPage()
}
//重置
const reset = () => {
	form.userName = null;
	form.phone = null;
	currentPage.value = 1;
	pageSize.value = 10;
	getListPage()
}
//列表
const getListPage = () => {
	api.home.home.homeFileList({
		page: currentPage.value,
		size: pageSize.value,
		...form
	}).then(res => {
		if (res.errorCode == 0) {
			tableData.value = res.data.records;
			total.value = res.data.total;
		}
	})
}
const addData = () => {
	instance.refs.add.open()
}
//查看
const check = (row) => {
	ElMessage.success("5421231321")
	instance.refs.detail.open(row)
}

//删除
const del = (row) => {
	instance.refs.confirm.open()
}
const cancelConfirm = (done) => {
	ElMessage.success("删除成功");
	done()
}

getListPage()

</script>


<style lang="less" scoped>
.table {
	min-height: calc(100% - 110px);
}
.flexCard {
	width: 100%;
	display: flex;
	justify-content: space-between;
}
</style>

