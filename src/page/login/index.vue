<template>
	<div class="main">
		<div class="login">
			<el-form ref="ruleForm" :rules="rules" :model="form">
				<el-form-item label="账号:" prop="username">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="密码:" prop="password">
					<el-input type="password" v-model="form.password"></el-input>
				</el-form-item>
			</el-form>
			<div class="block">
				<el-button type="primary" @click="signIn">登录</el-button>
			</div>
		</div>
	</div>
</template>


<script>
import { getCurrentInstance, reactive } from 'vue';
import { useRouter } from "vue-router";
export default {
	setup(props,ctx) {
		console.log(ctx);
		let router = useRouter();
		let instance = getCurrentInstance();
		let api = instance.appContext.config.globalProperties.$api;
		let form = reactive({
			username: null,
			password: null,
		})
		//验证规则
		let rules = {
			username: [
				{ required: true, message: "请输入账号" }
			],
			password: [
				{ required: true, message: "请输入密码" }
			],
		}
		//登录
		const signIn = () => {
			instance.ctx.$refs.ruleForm.validate(valid => {
				if (valid) {
					router.push("/home");
					// api.login.login.login({
					// 	phone: form.username,
					// 	pwd: form.password
					// }).then(res => {
					// 	if (res.errorCode == 0) {
					// 		localStorage.setItem("token", res.data.token);
					// 		router.push("/home");
					// 	}
					// })
				}
			})

		}

		return {
			form,
			rules,
			signIn
		}
	}
}
</script>


<style lang="less" scoped>
.main {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: url('../../assets/vs1.jpg');
	.login {
		background-color: #fff;
		padding: 30px 20px;
		width: 400px;
		border-radius: 8px;
	}
	.block {
		text-align: center;
	}
}
</style>