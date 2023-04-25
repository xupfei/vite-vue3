<template>
	<el-menu style="height:100%" :router="true" :default-active='currentPath'>
		<template v-for="item in menu">
			<el-sub-menu :index="item.path" v-if="item.children" :key="item.id">
				<template #title>
					<el-icon>
						<location />
					</el-icon>
					<span>{{item.name}}</span>
				</template>
				<el-menu-item :index="child.path" v-for="child in item.children" :key="child.id">
					{{child.name}}
				</el-menu-item>
			</el-sub-menu>
			<el-menu-item :index="item.path" v-else :key="item.id">
				<el-icon>
					<document />
				</el-icon>
				<span>{{item.name}}</span>
			</el-menu-item>
		</template>
	</el-menu>
</template>

<script>
import menu from "@/components/mock.js";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
export default {
	setup() {
		const route = useRoute();
		let currentPath = ref(null);
		
		watch(() => route.path, (newVal, oldVal) => {
			currentPath.value = newVal
		}, { immediate: true })
		return {
			menu,
			currentPath
		}
	}
}
</script>