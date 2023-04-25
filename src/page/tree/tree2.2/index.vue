<template>
	<div>
		<el-dialog v-model="dialogVisible" :title="title" width="30%" :before-close="handleClose">
			<span>内容可以自己写，也可以使用插槽自定义</span>
			<template #footer>
				<!-- 默认的插槽内容 -->
				<span class="dialog-footer">
					<el-button @click="close">Cancel</el-button>
					<el-button type="primary" @click="confirm">
						Confirm
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
let props = defineProps({
	title: {
		type: String,
		default: "标题"
	}
})
let emits = defineEmits(['confirm',"close"])
let dialogVisible = ref(false);
//打开
const open = () => {
	dialogVisible.value = true;
	//还可以写一些其他的事件，，，
}
//关闭
const close = () => {
	dialogVisible.value = false;
	//还可以写一些其他的事件，，，
	emits("close")
}
const confirm = () => {
	dialogVisible.value = false;
	//还可以写一些其他的事件，，，
	emits("confirm",1111)
}

</script>