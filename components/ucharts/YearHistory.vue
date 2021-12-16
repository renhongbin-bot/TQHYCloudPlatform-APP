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
		props: ['machineId'],
		data() {
			return {
				dayHistoryList: {},
				chartData:{
				  categories:[],
				  series:[{
						name: '年数据',
						data: []
					}],
				},
			}
		},
		created() {
			this.getDayHistoryList( )
		},
		methods: {
			getDayHistoryList() {
				this.$sendRequest({
					url: `getNewYearDataForEcharts/${this.machineId}`,
					success: res => {
						console.log(res.data)
						const daylist = res.data.data
						console.log(daylist)
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
