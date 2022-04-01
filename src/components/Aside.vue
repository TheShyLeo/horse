<template>
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
</template>

<script>
export default {
	data() {
		return {
			user: {
				name: '喜乐难寻',
				rank: 'Lv.1',
			},
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
				}
			],
		};
	},

	name: 'Aside',
};
</script>

<style>
.Aside {
	background: #ebeef5;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.lv-left-head-name {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.lv-left-head-name span {
	font-size: 16px;
	color: #b3b3b3;
	padding: 0px 10px 10px 10px;
}
.lv-left-menu-container {
	padding: 10px 0;
	border-bottom: 1px solid #ebeef5;
}
</style>
