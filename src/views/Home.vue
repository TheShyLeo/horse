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
import Prophet from '@/components/Prophet.vue';

export default {
	components: {
		Aside
	},
	data() {
		return {
			MenuData: [
				{
					name: '知己知彼',
					icon: 'sf-icon-globe',
					data: '/discover',
					active: 'active',
				},
				{
					name: '游戏设置',
					icon: 'sf-icon-tv',
					data: '/local',
					active: '',
				},
				{
					name: '我喜欢的音乐',
					icon: 'sf-icon-heart-o',
					active: '',
				},
			],
			tableData: [
				{
					name: '王小虎',
					kda: '10.2',
					percent: '50%',
					history: [
						{ name: '10/0/12', type: '' },
						{ name: '1/10/2', type: 'success' },
						{ name: '1/10/2', type: 'danger' },
					],
				},
				{
					name: '王小虎',
					kda: '10.2',
					percent: '50%',
					history: [
						{ name: '10/0/12', type: 'success' },
						{ name: '1/10/2', type: 'danger' },
						{ name: '1/10/2', type: 'danger' },
					],
				},
				{
					name: '王小虎',
					kda: '10.2',
					percent: '50%',
					history: [
						{ name: '10/0/12', type: 'success' },
						{ name: '1/10/2', type: 'danger' },
						{ name: '1/10/2', type: 'danger' },
					],
				},
				{
					name: '王小虎',
					kda: '10.2',
					percent: '50%',
					history: [
						{ name: '10/0/12', type: 'success' },
						{ name: '1/10/2', type: 'danger' },
						{ name: '1/10/2', type: 'danger' },
					],
				},
				{
					name: '王小虎',
					kda: '10.2',
					percent: '50%',
					history: [
						{ name: '10/0/12', type: 'success' },
						{ name: '1/10/2', type: 'danger' },
						{ name: '1/10/2', type: 'danger' },
					],
				},
			],
			user: {
				name: '喜乐难寻',
				rank: 'Lv.1',
			},
		};
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
