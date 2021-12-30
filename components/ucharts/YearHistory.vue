<template>
	<view>
		<view class="charts-box">
		  <qiun-data-charts
		    type="line"
		    :chartData="chartData"
		    background="none"
		  />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			machineId: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				dayHistoryList: {},
				id: this.machineId,
				chartData:{
				  categories:[],
				  series:[{
						name: '年数据',
						data: []
					}],
				},
			}
		},
		watch: {
			machineId(newValue) {
				this.id = newValue
			}
		},
		mounted() {
			this.getDayHistoryList()
		},
		methods: {
			async getDayHistoryList() {
				await this.$sendRequest({
					url: `getNewYearDataForEcharts/${this.id}`,
					success: res => {
						const daylist = res.data.data
						this.chartData.series[0].data = []
						this.chartData.categories = []
						for(let i = 0; i < daylist.length; i++) {
							this.chartData.categories.push(parseInt(daylist[i].hDate))
						}
						for(let i = 0; i < daylist.length; i++) {
							var ret=  /^-?\d+(\.\d{1,3})?$/
							if(!ret.test(parseFloat(daylist[i].avgNum))) {
								this.chartData.series[0].data.push(parseFloat(daylist[i].avgNum).toFixed(2))
							}else{
								this.chartData.series[0].data.push(parseInt(daylist[i].avgNum))
							}
							
						}
					}
				})
			}
		}
	}
</script>

<style>

</style>
