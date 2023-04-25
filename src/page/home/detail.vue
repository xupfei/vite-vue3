<template>
	<el-dialog v-model="dialogVisible" title="详情" width="30%" :before-close="handleClose" :close-on-click-modal="true">
		<el-form v-if="type==1" key="detailCheck">
			<el-form-item label="房间:">{{detailForm.roomLocation}}</el-form-item>
			<el-form-item label="姓名:">{{detailForm.userName}}</el-form-item>
			<el-form-item label="身份:">{{detailForm.relationship}}</el-form-item>
			<el-form-item label="性别:">{{detailForm.sex}}</el-form-item>
			<el-form-item label="手机号码:">{{detailForm.phone}}</el-form-item>
			<el-form-item label="户籍地址:">{{detailForm.householdAddress}}</el-form-item>
			<el-form-item label="政治面貌:">{{detailForm.politicsStatus}}</el-form-item>
			<el-form-item label="身份证号:">{{detailForm.identityCard}}</el-form-item>
			<el-form-item label="工作单位:">{{detailForm.workUnit}}</el-form-item>
			<el-form-item label="备注:">{{detailForm.comment}}</el-form-item>
		</el-form>
		<el-form v-else label-width="90px" key="detailForm" :model="editForm" :rules="rules" ref="rulesForm">
			<el-form-item label="房间:">{{detailForm.roomLocation}}</el-form-item>
			<el-form-item label="姓名:" prop="userName">
				<el-input v-model.trim="editForm.userName" placeholder="请输入姓名"></el-input>
			</el-form-item>
			<el-form-item label="身份:" prop="relationship">
				<el-select v-model="editForm.relationship" placeholder="请选择身份" disabled style="width:100%">
					<el-option v-for="item in relationshipList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="性别:" prop="sex">
				<el-select v-model="editForm.sex" placeholder="请选择性别" style="width:100%">
					<el-option v-for="item in sexList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="手机号码:" prop="phone">
				<el-input v-model.trim="editForm.phone" disabled placeholder="请输入手机号码">
				</el-input>
			</el-form-item>
			<el-form-item label="户籍地址:">{{editForm.householdAddress}}</el-form-item>
			<el-form-item label="政治面貌:">
				<el-select v-model="editForm.politicsStatus" placeholder="请选择政治面貌" style="width:100%">
					<el-option v-for="item in politicsList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="身份证号:">
				<el-input v-model.trim="editForm.identityCard" placeholder="请输入身份证号" disabled></el-input>
			</el-form-item>
			<el-form-item label="工作单位:">
				<el-input v-model.trim="editForm.workUnit" placeholder="请输入工作单位"></el-input>
			</el-form-item>
			<el-form-item label="备注:">
				<el-input type="textarea" :rows="5" placeholder="请输入备注信息" v-model.trim="editForm.comment">
				</el-input>
			</el-form-item>
		</el-form>
		<div style="text-align:center">
			<el-button type="primary" @click="switchStatus" v-if="type==1">编辑</el-button>
			<el-button type="primary" @click="edit" v-else>确定</el-button>
			<el-button @click="handleClose">取消</el-button>
		</div>
	</el-dialog>
</template>


<script>
import { ref, getCurrentInstance, reactive } from "vue";
import { dateFormat } from "@/utils/time.js";
import { ElMessage } from "element-plus";
export default {
	setup() {
		let instance = getCurrentInstance();
		let api = instance.appContext.config.globalProperties.$api;
		let dialogVisible = ref(false);
		let type = ref(1); //1详情 2编辑

		let relationshipList = reactive([
			{ id: 1, name: "业主" },
			{ id: 2, name: "家属" },
			{ id: 3, name: "租客" }
		])
		let sexList = reactive([
			{ id: 1, name: '男' },
			{ id: 2, name: '女' }
		])

		let politicsList = reactive([
			{ id: 1, name: '群众' },
			{ id: 2, name: '党员' },
			{ id: 3, name: '团员' },
			{ id: 4, name: '民主党派' },
			{ id: 5, name: '其他' }
		])
		//验证规则
		let rules = reactive({
			sex: [
				{ required: true, message: '请选择性别', trigger: 'blur' },
			],
			relationship: [
				{ required: true, message: '请选择身份', trigger: 'blur' },
			],
			phone: [
				{ required: true, message: '请输入手机号码', trigger: 'blur' },
				{ pattern: /^1[13456789]\d{9}$/, message: '手机号码格式不正确' }
			],
			userName: [
				{ required: true, message: '请输入姓名', trigger: 'blur' },
				{ max: 15, message: '姓名不超过15个字符', trigger: 'blur' },
				{ pattern: /^[A-Za-z\u4e00-\u9fa5]+$/, message: '只允许输入中文和英文' }
			],
		})
		let detailForm = ref({});
		let editForm = reactive({
			sex: null,
			identityCard: null,
			phone: null,
			userName: null,
			relationship: null,
			comment: null,
			politicsStatus: null,
			workUnit: null,
			householdAddress: null,
		})
		let id = ref(null);
		//打开弹窗
		let open = (row) => {
			id.value = row.id;
			api.home.home.homeFileDetail(row.roomId, row.id).then(res => {
				if (res.errorCode == 0) {
					detailForm.value = res.data;
					Object.keys(editForm).forEach(key => {
						editForm[key] = res.data[key]
					});
					dialogVisible.value = true;
				}
			})
		}

		//关闭
		let handleClose = () => {
			type.value = 1;
			dialogVisible.value = false
		}
		//切换编辑状态
		let switchStatus = () => {
			type.value = type.value == 1 ? 2 : 1
		}
		//编辑
		let edit = () => {
			instance.refs.rulesForm.validate((valid) => {
				if (valid) {
					let params = comparison(detailForm.value, editForm);
					api.home.home.homeFileEdit(id.value, params).then(res => {
						if (res.errorCode == 0) {
							ElMessage.success("编辑成功");
							handleClose()
						}
					})
				}
			})
		}

		//比较新旧数据，挑出改动的数据
		let comparison = (obj1, obj2) => {
			let newObj = {};
			Object.keys(obj2).map(key => {
				if (obj1[key] !== obj2[key]) {
					newObj[key] = obj2[key];
				}
			})
			return newObj;
		}


		return {
			dialogVisible,
			detailForm,
			editForm,
			dateFormat,
			type,
			relationshipList,
			sexList,
			politicsList,
			rules,
			edit,
			handleClose,
			open,
			switchStatus
		}
	}
}
</script>