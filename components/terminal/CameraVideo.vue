<template>
	<view>
		<live-pusher id="livePusher" :url="camAdress" mode="FHD"></live-pusher>
		<button @click="startLive">开始推流（开始直播）</button>
		<view>
			{{camAdress}}
			<video
				id="myVideo"
				:src="camAdress"
				enable-danmu
				controls
			></video>
		</view>
		<button @click="stopLive">结束推流</button>
	</view>
</template>

<script>
export default {
	props: ['camAdress'],
	data() {
		return {
			enableCamera: false,
			context: null
		};
	},
	computed() {
		this.context = uni.createLivePusherContext('livePusher', this);
		console.log(this.camAdress)
	},
	methods: {
		EnableCamera() {
			this.enableCamera = true;
		},
		startLive() {
			this.context.start({
				success: a => {
					console.log('livePusher.start:' + JSON.stringify(a));
				}
			});
		},
		stopLive() {
			this.context.stop({
				success: a => {
					console.log(JSON.stringify(a));
				}
			});
		}
	}
};
</script>
