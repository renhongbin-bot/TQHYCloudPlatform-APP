<template>
	<view>
		<view class="empty"></view>
		<nav><span slot="terminal" class="nav">工单管理</span></nav>
		<view><u-search class="search" placeholder="请输入用户名" v-model="search" :showAction="false"></u-search></view>
		<view class="body">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item v-for="(item, index) in tables" :key="index">
					<u-cell @click="gotoProject(item.userId)" :title="item.userName">
						<u-avatar slot="icon" shape="square" size="35" :src="item.url" customStyle="margin: -3px 5px -3px 0"></u-avatar>
						</u-cell>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script>
import Nav from '@/components/nav/Nav.vue';
export default {
	data() {
		return {
			search: '',
			indexList: [],
			urls: [
				'https://cdn.uviewui.com/uview/album/1.jpg',
				'https://cdn.uviewui.com/uview/album/2.jpg',
				'https://cdn.uviewui.com/uview/album/3.jpg',
				'https://cdn.uviewui.com/uview/album/4.jpg',
				'https://cdn.uviewui.com/uview/album/5.jpg',
			],
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
					this.indexList = res.data.data
					for(let i = 0; i < this.urls.length; i++) {
						this.indexList[i]['url'] = this.urls[uni.$u.random(0, this.urls.length - 1)]
					}
					console.log(this.indexList)
				}
			});
		},
		gotoProject(id) {
			uni.navigateTo({
				url: `/pages/developer/project?id=${id}`
			})
		}
	}
};
</script>

<style lang="scss" scoped>
	.empty{
		width: 100%;
		height: 46rpx;
		background-color:  rgba($color: #000000, $alpha: 0.5);
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
