<template>
	<el-dialog v-model="dialogVisible" :width="width" top="30vh" custom-class="no-title" :before-close="handleClose"
		:center="true" :close-on-click-modal="false" append-to-body>
		<div style="text-align: center">
			<slot name="icon">
				<i class="el-icon-warning" style="color: #e6a23c;font-size: 30px;margin-bottom: 15px;"></i>
			</slot>
			<p class="toople" v-html="content"></p>
		</div>
		<div style="text-align: center;margin-top: 20px">
			<el-button type="primary" @click="confirmCommit">确定</el-button>
			<el-button @click="handleClose" v-if="!closeCancelBtn">取消</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { ref } from 'vue';
export default {
	props: {
		content: {
			type: String,
			default: ""
		},
		width: {
			type: String,
			default: "400px"
		},
		closeCancelBtn: {
			type: Boolean,
			default: false
		},
		beforeClose: {
			type: Function,
			default: null
		}
	},
	emits: ["confirm"],
	setup(props, context) {
		let dialogVisible = ref(false);
		//关闭
		let handleClose = () => {
			if (props.beforeClose) {
				props.beforeClose(() => { dialogVisible.value = false })
			} else {
				dialogVisible.value = false
			}
		}
		//确定
		let confirmCommit = () => {
			context.emit("confirm", () => { dialogVisible.value = false });
		}
		let open = () => {
			dialogVisible.value = true
		}
		return {
			dialogVisible,
			handleClose,
			confirmCommit,
			open
		}

	}
}
</script>