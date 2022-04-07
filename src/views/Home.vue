<template>
	<el-container class="home">
		<Aside/>
		<!-- <el-main> -->
			<router-view></router-view>
		<!-- </el-main> -->
	</el-container>
</template>

<script>
// @ is an alias to /src
import Aside from '@/components/Aside.vue';

export default {
	components: {
		Aside
	},
	data() {
		return {
			auth:{}
		};
	},
	methods : {
		
	},
	async beforeCreate() {
		this.$ipc.on('auth', (event, data) => {
			this.auth = data;
			console.log(data);
		});
	},
	name: 'home',
};
</script>

<style>
* {
	padding: 0;
	margin: 0;
}
.home {
	-webkit-app-region: drag;
	height: 100%;
	width: 100%;
	position: absolute;
	background: url('../assets/016.png');
}
</style>
