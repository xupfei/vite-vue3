<template>
	<div id="lineChart"></div>
	<div id="barChart"></div>

</template>

<script>
import { reactive, ref, onMounted, getCurrentInstance } from 'vue';

export default {
	setup() {
		let instance = getCurrentInstance();
		let echarts = instance.appContext.config.globalProperties.$echarts;
        //线形图
		let lineOption = reactive({
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					data: [820, 932, 901, 934, 1290, 1330, 1320],
					type: 'line',
					smooth: true
				}
			]
		})
		let chartDom = ref(null);
		let myChart = ref(null);
		const initEcharts = () => {
			chartDom.value = document.getElementById('lineChart');
			myChart.value = echarts.init(chartDom.value);
			myChart.value.setOption(lineOption);
		}
        // 柱形图
		let barOption = reactive({
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					data: [120, 200, 150, 80, 70, 110, 130],
					type: 'bar'
				}
			]
		})
		let barDom = ref(null);
		let barChart = ref(null);
		const initBarEcharts = () => {
			barDom.value = document.getElementById('barChart');
			barChart.value = echarts.init(barDom.value);
			barChart.value.setOption(barOption);
		}
        
		onMounted(() => {
			initEcharts();
			initBarEcharts()
		})

	}
}
</script>

<style lang="less" scoped>
#lineChart {
	width: 600px;
	height: 400px;
}
#barChart {
	width: 600px;
	height: 400px;
}
</style>