<template>
	<dialog ref="dialogRef" @confirm="confirmCallback" @close="close"></dialog>
	<div @click="openDialog">打开弹窗</div>
</template>


<script setup>
import dialog from "../tree2.2/index.vue"

const dialogRef = ref(null);

const openDialog = () => {
	dialogRef.value.open()
}
const confirmCallback = (value) => {
	//点击确定按钮的时候可以做一些自己其余的操作，value为弹窗的传值
	console.log(value);
	console.log(2222);
}
const close = () => {
	//点击确定按钮的时候可以做一些自己其余的操作，value为弹窗的传值
	console.log(2222);
}


defineExpose({
	open
})

</script>