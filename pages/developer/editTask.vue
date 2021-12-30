<template>
	<view>
		<nav-home :title="title" @developer="rightClick()"></nav-home>
		<u--form labelPosition="left" :model="editForm" label="详细信息" class="form-bgc">
			<u-form-item label="工单编号:" labelWidth="100"><u--input v-model="editForm.taskId"></u--input></u-form-item>
			<u-form-item label="工单名称:" labelWidth="100"><u--input v-model="editForm.taskName"></u--input></u-form-item>
			<u-form-item label="回执详情:" labelWidth="100">
				<u--textarea placeholder="详细信息" v-model="editForm.taskContent" count></u--textarea>
			</u-form-item>
			<u-form-item label="附件" labelWidth="100"></u-form-item>
			<u-form-item>
				<view class="img-flex">
					<image class="image" @click="editImage(index)" v-for="(item, index) in imgShowList" :src="item" mode="scaleToFill"></image>
					<image class="image" src="/static/images/addImg.png" @click="chooseImage()"></image>
				</view>
			</u-form-item>
			<u-form-item>
				<u-radio-group class="radio-group" v-model="radiovalue1" @change="groupChange">
					<u-radio class="radio" shape="square" v-for="(item, index) in radiolist1" :key="index" :label="item.name" :name="item.name" @change="radioChange"></u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item><u-button @click="uploadingImage(imgShowList)" type="primary">回报工单</u-button></u-form-item>
		</u--form>
	</view>
</template>

<script>
import NavHome from '@/components/nav/NavHome.vue';
export default {
	data() {
		return {
			taskId: 0,
			editForm: {},
			title: '项目详情',
			imgShowList: [],
			radiolist1: [
				{
					name: '已完成',
					disabled: false
				},
				{
					name: '跟进',
					disabled: false
				},
				{
					name: '未完成',
					disabled: false
				}
			],
			radiovalue1: '已完成'
		};
	},
	onLoad(option) {
		this.taskId = option.id;
		// this.getEditTaskList()
	},
	components: {
		NavHome
	},
	methods: {
		// getEditTaskList() {
		// 	// 查看项目详情
		// 	this.$sendRequest({
		// 		url: `showUserTaskById/${1}`,
		// 		method: 'GET',
		// 		success: res => {
		// 			this.editForm = res.data.data;
		// 			console.log(this.editForm);
		// 		},
		// 		fail: fa => {
		// 			console.log(fa);
		// 		}
		// 	});
		// },
		// 选择图片
		chooseImage() {
			uni.chooseImage({
				success: res => {
					this.imgShowList = res.tempFilePaths;
				}
			});
		},
		editPopup(index) {
			console.log(index);
			this.timer = setTimeout(() => {
				this.show = true;
			}, 200);
		},
		// 查看图片
		editImage(index) {
			console.log(index);
			console.log(this.imgShowList[index]);
			uni.previewImage({
				current: index,
				urls: this.imgShowList,
				success: res => {
					uni.saveImageToPhotosAlbum({
						filePath: this.imgShowList[index],
						success: res => {
							console.log(res);
						}
					});
				},
				fail: function(err) {
					console.log(err.errMsg);
				}
			});
		},
		// 上传图片
		uploadingImage(imageList) {
			const imgArr = [];
			for (let i = 0; i < imageList.length; i++) {
				let obj = new Object();
				obj.name = 'file' + i;
				obj.file = imageList[i];
				obj.uri = imageList[i];
				imgArr.push(obj);
			}
			console.log(imgArr);
			// console.log(imageList)
			uni.uploadFile({
				url: 'http://106.12.134.175:8081/file/filesUploader',
				files: imgArr,
				header: { 'Content-Type': 'multipart/form-data' },
				fileType: 'image',
				success: res => {
					let data = JSON.parse(res.data);
					switch (data.state) {
						case 200:
							uni.showToast({
								title: '上传成功'
							});
							break;
						case 40001:
							uni.showToast({
								title: '文件中存在异常文件,请删除后上传',
								icon: 'error'
							});
							break;
					}
				}
			});
			setTimeout(() => {
				this.imgShowList = [];
			}, 1000);
		},
		groupChange(n) {
			console.log('groupChange', n);
		},
		radioChange(n) {
			console.log('radioChange', n);
		},
		rightClick() {
			uni.switchTab({
				url: '/pages/developer/developer'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.form-bgc {
	width: 92%;
	margin-top: 50rpx;
	margin-left: 4%;
}
.img-flex {
	width: 100%;
}
.image {
	width: 200rpx;
	height: 200rpx;
	display: inline-block;
	margin-left: 20rpx;
}
.radio-group{
	display: flex;
}
.radio:nth-child(n + 2 ){
	margin-left: 32rpx;
}
</style>
