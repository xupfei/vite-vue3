<template>
	<el-dialog v-model="dialogVisible" title="详情" width="30%" :before-close="handleClose" :close-on-click-modal="true">
		<el-form label-width="90px" :model="addForm" :rules="rules" ref="rulesForm">
			<el-form-item label="房间:">{{addForm.roomLocation}}</el-form-item>
			<el-form-item label="姓名:" prop="userName">
				<el-input v-model.trim="addForm.userName" placeholder="请输入姓名"></el-input>
			</el-form-item>
			<el-form-item label="身份:" prop="relationship">
				<el-select v-model="addForm.relationship" placeholder="请选择身份" style="width:100%">
					<el-option v-for="item in relationshipList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="性别:" prop="sex">
				<el-select v-model="addForm.sex" placeholder="请选择性别" style="width:100%">
					<el-option v-for="item in sexList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="手机号码:" prop="phone">
				<el-input v-model.trim="addForm.phone" placeholder="请输入手机号码">
				</el-input>
			</el-form-item>
			<el-form-item label="户籍地址:">{{addForm.householdAddress}}</el-form-item>
			<el-form-item label="政治面貌:">
				<el-select v-model="addForm.politicsStatus" placeholder="请选择政治面貌" style="width:100%">
					<el-option v-for="item in politicsList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="身份证号:">
				<el-input v-model.trim="addForm.identityCard" placeholder="请输入身份证号" disabled></el-input>
			</el-form-item>
			<el-form-item label="工作单位:">
				<el-input v-model.trim="addForm.workUnit" placeholder="请输入工作单位"></el-input>
			</el-form-item>
			<el-form-item label="备注:">
				<el-input type="textarea" :rows="5" placeholder="请输入备注信息" v-model.trim="addForm.comment">
				</el-input>
			</el-form-item>
		</el-form>
		<div style="text-align:center">
			<el-button type="primary" @click="add">确定</el-button>
			<el-button @click="handleClose">取消</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { ref, getCurrentInstance, reactive } from "vue";
import { ElMessage } from "element-plus";
export default {
	setup() {
		let instance = getCurrentInstance();
		let api = instance.appContext.config.globalProperties.$api;
		let dialogVisible = ref(false);



		let rulesForm = ref(null)

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

		let addForm = reactive({
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

		//打开弹窗
		let open = () => {
			dialogVisible.value = true;
		}
        //确定
		let add = () => {
			console.log(rulesForm.value,rulesForm.value.validate);
			instance.refs.rulesForm.validate(valid=>{
                if(valid) {
                    // api
                }
            })
		}
        //关闭
        let handleClose = ()=>{
            instance.refs.rulesForm.resetFields();
            dialogVisible.value = false
        }
		return {
			dialogVisible,
			addForm,
			relationshipList,
			sexList,
			politicsList,
			rules,
			rulesForm,
			handleClose,
			open,
            add
		}
	}
}
</script>