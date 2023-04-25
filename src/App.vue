<template>
	<el-config-provider :locale="locale">
		<router-view></router-view>
	</el-config-provider>

</template>

<script>
// import pageNav from "./page/nav/index.vue";
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { ElConfigProvider } from 'element-plus';
export default {
	components: { ElConfigProvider },
	setup() {
		return {
			locale: zhCn,
		}
	},
}
</script>

<style >
#app {
	width: 100%;
	height: 100%;
}
</style>





