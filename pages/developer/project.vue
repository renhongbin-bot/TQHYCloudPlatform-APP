<template>
	<view>
		<nav-home :title="title" @developer="rightClick()"></nav-home>
		<view><u-search class="search" placeholder="请输入项目名称" v-model="search" :showAction="false"></u-search></view>
		<view class="search checkbox">
			<u-swipe-action>
				<u-swipe-action-item v-for="(item, index) in tables" :index="index" :key="item.taskId" :options="options2" @click="editTask($event.index, item.taskId)">
					<view class="swipe-action u-border-bottom">
						<view class="swipe-action__content">
							<text class="swipe-action__content__text">{{ item.taskName }}</text>
						</view>
					</view>
				</u-swipe-action-item>
			</u-swipe-action>
			<u-overlay :show="show" @click="show = false">
				<view class="warp">
					<u--form labelPosition="left" :model="editForm" label="详细信息" class="form-bgc">
						<u-form-item label="项目Id" labelWidth="100" borderBottom><u--text :text="editForm.taskId"></u--text></u-form-item>
						<u-form-item label="项目名称" labelWidth="100" borderBottom><u--text :text="editForm.taskName"></u--text></u-form-item>
						<u-form-item label="详细信息" labelWidth="100" borderBottom><u--text :text="editForm.taskContent"></u--text></u--input></u-form-item>
						<u-form-item label="项目状态" labelWidth="100" borderBottom>
							<u-tag
								:text="editForm.taskState == 0 ? '已完成' : editForm.taskState == 1 ? '进行中' : editForm.taskState == 2 ? '已过期' : '123'"
								:type="editForm.taskState == 0 ? 'success' : editForm.taskState == 1 ? 'warning' : editForm.taskState == 2 ? 'error' : '123'"
							></u-tag>
						</u-form-item>
						<u-form-item label="项目开始时间" labelWidth="100" borderBottom>
							<u--text :text="editForm.taskStartTime"></u--text>
						</u-form-item>
						<u-form-item label="项目结束时间" labelWidth="100" borderBottom>
							<u--text :text="editForm.taskEndTime"></u--text>
						</u-form-item>
					</u--form>
				</view>
			</u-overlay>
			<u-modal
				confirmColor="#dd524d"
				cancelColor="#007aff"
				:show="deleteShow"
				confirmText="确认"
				cancelText="取消"
				showCancelButton
				content="是否确认删除该任务信息？"
				@confirm="deleteTask()"
				@cancel="deleteShow = false"
			></u-modal>
		</view>
	</view>
</template>

<script>
	import NavHome from '@/components/nav/NavHome.vue'
	export default {
		data() {
			return {
				title: '用户项目',
				userId: 0,
				projectList: [],
				editForm: {},
				search: '',
				deleteShow: false,
				show: false,
				options2: [
					{
						text: '详情',
						style: {
							backgroundColor: '#006699'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#f56c6c'
						}
					}
				]
			}
		},
		computed: {
			tables: {
				get() {
					const search = this.search;
					if (search) {
						return this.projectList.filter(function(dataNews) {
							return Object.keys(dataNews).some(function(key) {
								return (
									String(dataNews[key])
										.toLowerCase()
										.indexOf(search) > -1
								);
							});
						});
					}
					return this.projectList;
				},
				set(newValue) {
					return newValue;
				}
			}
		},
		components: {
			NavHome
		},
		onLoad(option) {
			this.userId = option.id
			this.getProjectList()
		},
		methods: {
			getProjectList() {
				this.$sendRequest({
					url: `showUserTaskInfo/${this.userId}`,
					success: res => {
						this.projectList = res.data.data
						console.log(this.projectList)
					}
				})
			},
			editTask(index, taskId) {
				if (!index) {
					// 查看
					this.$sendRequest({
						url: `showUserTaskById/${taskId}`,
						method: 'GET',
						success: res => {
							this.editForm = res.data.data;
							console.log(this.editForm);
						},
						fail: fa => {
							console.log(fa);
						}
					});
					this.show = true;
				} else {
					this.deleteShow = true;
					this.taskId = taskId;
				}
			},
			deleteTask() {
				this.$sendRequest({
					url: `deleteTask/${this.taskId}`,
					success: res => {
						console.log(res.data);
					},
					fail: fa => {
						console.log(fa);
					}
				});
				this.deleteShow = false;
				uni.showToast({
					title: '删除成功'
				});
				setTimeout(() => {
					this.getProjectList()
				}, 500);
			},
			rightClick() {
				uni.switchTab({
					url: '/pages/developer/developer'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.swipe-action {
	&__content {
		padding: 25rpx 0;

		&__text {
			font-size: 15px;
			color: $u-main-color;
			padding-left: 30rpx;
		}
	}
}
.warp {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}
.form-bgc {
	background-color: #fff;
	width: 85%;
	text-align: center;
	padding-left: $uni-spacing-row-sm * 2;
}	
.search {
	width: 92%;
	padding-left: 4%;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
}
</style>
