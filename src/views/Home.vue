<template>
	<el-container class="home">
		<el-aside width="200px" class="Aside">
			<div class="lv-left-head">
				<img src="../assets/123.png" alt="icon" width="42" height="42" style="border-radius: 50%; vertical-align: middle; margin: 10px 50px" />
				<div class="lv-left-head-name">
					<span>{{ user.name }}</span>
					<span>{{ user.rank }}</span>
				</div>
			</div>
			<div class="lv-left-menu">
				<div class="lv-left-menu-container">
					<ul>
						<li v-for="(item, index) in MenuData" :key="index" ripple="" :class="item.active" @click="change(index)">
							<span class="sf-icon-play-1" v-if="index > 1 && item.icon === 'sf-icon-bars'" />
							<i :class="item.icon" />{{ item.name }}
						</li>
					</ul>
				</div>
			</div>
		</el-aside>
		<el-main>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column label="昵称" width="80" align="center">
					<template slot-scope="scope">
						<el-popover trigger="hover" placement="top">
							<p>姓名: {{ scope.row.name }}</p>
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">{{ scope.row.name }}</el-tag>
							</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column label="胜率" width="180" prop="percent"> </el-table-column>
				<el-table-column label="战绩" align="center">
					<template slot-scope="scope">
						<div slot="reference" class="history">
							<el-tag :key="index" v-for="(tag, index) in scope.row.history" size="medium" effect="light" :type="tag.type" style="margin-left: 10px;font-weight: bold;">
								{{ tag.name }}
							</el-tag>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
	</el-container>
</template>

<script>
// @ is an alias to /src
import Aside from '@/components/Aside.vue';

export default {
	components: {
		// Aside
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
.el-table, .el-table__expanded-cell{
    background-color: transparent!important;
}
/* 表格内背景颜色 */
.el-table th,
.el-table tr,
.el-table td {
    background-color: transparent!important;
}
</style>
