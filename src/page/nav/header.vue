<template>
	<div class="header">
		<el-dropdown @command="handleCommand">
			<el-icon :size="20">
				<tools />
			</el-icon>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="signOut">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script>
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
export default {
	setup() {
		let router = useRouter();
		let api = getCurrentInstance().appContext.config.globalProperties.$api;
		//处理下拉菜单
		const handleCommand = (command) => {
			if (command == "signOut") {
				signOut()
			}
		}
		//退出
		const signOut = () => {
			// api.login.signOut().then(res=>{
			// 	if(res.errorCode ==0) {

			// 	}
			// })
			localStorage.clear();
			router.push("/login")

		}
		return {
			handleCommand
		}

	}
}

</script>

<style lang="less" scoped>
.header {
	padding: 20px;
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #ccc;
	display: flex;
	justify-content: right;
	align-items: center;
}
</style>