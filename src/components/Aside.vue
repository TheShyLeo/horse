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
			<el-menu
				default-active="prophet"
				class="el-menu-vertical-demo"
				@select="handleSelect"
				background-color="transparent"
				text-color="#000000"
				active-text-color="#ffd04b"
			>
				<el-menu-item index="prophet">
					<i class="el-icon-menu"></i>
					<span slot="title">知己知彼</span>
				</el-menu-item>
				<el-menu-item index="setting">
					<i class="el-icon-setting"></i>
					<span slot="title">游戏设置</span>
				</el-menu-item>
			</el-menu>
		</div>
	</el-aside>
</template>

<script>
import client from '../tools/api/client';
export default {
	props: {
		credentials: Object,
	},
	data() {
		return {
			user: {
				name: '喜乐难寻',
				rank: 'Lv.1',
			},
		};
	},
	methods: {
		handleSelect(index) {
			this.$router.push('/' + index);
		},
	},
	watch: {
		credentials: async function (val) {
			this.credentials = val;// 接收父组件的值
			console.log('credentials watch: ', this.credentials);
			let Client = new client(this.credentials);
			let c = await Client.getCur();
			console.log('c: ', c);
		}
	},
	created() {
	},
	mounted() {
		console.log('credentials mounted: ', this.credentials);
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
.lv-left-menu {
	margin: 20px;
	-webkit-app-region: no-drag;
}
.el-menu {
	border-right: 0px !important;
}
</style>
