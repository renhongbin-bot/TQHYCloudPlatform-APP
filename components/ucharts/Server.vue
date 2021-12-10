<template>
	<view class="content">
		<view class="charts-box">
			<qiun-data-charts
				type="area"
				:chartData="chartsData"
				:echartsH5="true"
				:echartsApp="true"
			/>
		</view>
	</view>
</template>

<script>
export default {
	name: 'Server',
	data() {
		return {
			chartsData: {}
		};
	},
	mounted() {
		this.getServerData();
	},
	methods: {
		getServerData() {
			const xAxis = [];
			const data = [];
			uni.request({
				url: 'http://localhost:8081/getCPUData',
				method: 'POST',
				success: res => {
					for (let i = 0; i < res.data.length; i++) {
						xAxis.push(res.data[i].cpuDataDate);
					}
					for (let i = 0; i < res.data.length; i++) {
						data.push(res.data[i].cpuTotalFree);
					}
				}
			});
			//渐变色区域图
			let linearareadata = {
				categories: xAxis,
				series: [
					{
						name: '服务器状态',
						smooth: true,
						areaStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									{
										offset: 0,
										color: '#1890FF' // 0% 处的颜色
									},
									{
										offset: 1,
										color: '#FFFFFF' // 100% 处的颜色
									}
								],
								global: false // 缺省为 false
							}
						},
						data: [46.23, 55.33, 45.39, 56.78, 45.48, 25.50, 32.23, 45.56, 43.25, 45.23]
					}
				]
			};
			this.chartsData = linearareadata;
		}
	}
};
</script>

<style>
.charts-box {
	width: 100%;
	height: 300px;
}
</style>
