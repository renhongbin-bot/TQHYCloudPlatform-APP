<template>
	<view>
		<view class="empty"></view>
		<nav><span slot="terminal" class="nav">工单管理</span></nav>
		<u-tabs :list="list1" @click="click" lineWidth="50" lineColor="#fff" inactiveStyle="{ color: '#706266', fontSize: '10rpx' }"></u-tabs>
		
		<view v-if="index === 0">
			<view><u-search class="search" placeholder="请输入未处理的工单" v-model="untreated" :showAction="false"></u-search></view>
			<view class="body">
				<u-list>
					<u-list-item v-for="(item, index) in tables" :key="index">
						<u-cell @click="gotoEditTask(item.userId)" :title="item.userName">
							<u-avatar slot="icon" shape="square" size="35" :src="item.url" customStyle="margin: -3px 5px -3px 0"></u-avatar>
						</u-cell>
					</u-list-item>
				</u-list>
			</view>
		</view>

		<view v-if="index === 1">
			<view><u-search class="search" placeholder="请输入完成的工单" v-model="finish" :showAction="false"></u-search></view>
			<view class="body">
				<u-list>
					<u-list-item v-for="(item, index) in tables" :key="index">
						<u-cell @click="gotoOderDetails(item.userId)" :title="item.userName">
							<u-avatar slot="icon" shape="square" size="35" :src="item.url" customStyle="margin: -3px 5px -3px 0"></u-avatar>
						</u-cell>
					</u-list-item>
				</u-list>
			</view>
		</view>

		<view v-if="index === 2">
			<view><u-search class="search" placeholder="请输入用户名" v-model="search" :showAction="false"></u-search></view>
			<view class="body">
				<u-list>
					<u-list-item v-for="(item, index) in tables" :key="index">
						<u-cell @click="gotoProject(item.userId)" :title="item.userName">
							<u-avatar slot="icon" shape="square" size="35" :src="item.url" customStyle="margin: -3px 5px -3px 0"></u-avatar>
						</u-cell>
					</u-list-item>
				</u-list>
			</view>
		</view>
	</view>
</template>

<script>
import Nav from '@/components/nav/Nav.vue';
export default {
	data() {
		return {
			search: '',
			finish: '',
			untreated: '',
			indexList: [],
			list1: [
				{
					name: '未处理'
				},
				{
					name: '已处理'
				},
				{
					name: '工单下发'
				}
			],
			index: 0,
			projectList: []
		};
	},
	components: {
		Nav
	},
	computed: {
		tables: {
			get() {
				const search = this.search;
				if (search) {
					return this.indexList.filter(function(dataNews) {
						return Object.keys(dataNews).some(function(key) {
							return (
								String(dataNews[key])
									.toLowerCase()
									.indexOf(search) > -1
							);
						});
					});
				}
				return this.indexList;
			},
			set(newValue) {
				return newValue;
			}
		}
	},
	onLoad() {
		this.getUserGroupList();
	},
	methods: {
		getUserGroupList() {
			this.$sendRequest({
				url: 'showUserGroup',
				success: res => {
					this.indexList = res.data.data;
					const userlist = [];

					console.log(userlist);
					const url = '../../static/images/user-pro.png';
					for (let i = 0; i < 5; i++) {
						this.indexList[i]['url'] = url;
					}
					console.log(this.indexList);
				}
			});
		},
		gotoEditTask(id) {
			uni.navigateTo({
				url: `/pages/developer/editTask?id=${id}`
			});
		},
		gotoOderDetails(id) {
			uni.navigateTo({
				url: `/pages/developer/oderDetails?id=${id}`
			});
		},
		gotoProject(id) {
			uni.navigateTo({
				url: `/pages/developer/project?id=${id}`
			});
		},
		click(item) {
			this.index = item.index;
			console.log(this.index);
		}
	}
};
</script>

<style lang="scss" scoped>
.empty {
	width: 100%;
	height: 56rpx;
	background-color: rgba($color: #000000, $alpha: 0.5);
}
.nav {
	display: block;
	height: 88rpx;
	line-height: 88rpx;
	text-align: center;
	background-color: rgba($color: #000000, $alpha: 0.5);
	color: #222;
}
.search {
	width: 100%;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
}
</style>
