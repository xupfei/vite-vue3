<template>
	<div class="container">
		<div class="aside">
			<pageAside></pageAside>
		</div>
		<div class="view">
			<pageHeader></pageHeader>
			<div class="main">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import pageHeader from "./header.vue";
import pageAside from "./aside.vue";
export default {
	components: { pageHeader, pageAside }
}

</script>

<style lang="less" scoped>
.container {
	width: 100%;
	height: 100%;
	display: flex;
	.aside {
		flex: 0 0 240px;
	}
	.view {
		flex: 1;
		height: 100%;
		.main {
			background-color: #f0f2f5;
			height: calc(100% - 41px);
			padding:20px
		}
	}
}
</style>