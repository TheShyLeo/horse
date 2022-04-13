<template>
	<el-aside width="200px" class="Aside">
		<div class="lv-left-head">
			<img :src="user.icon" alt="icon" width="52" height="52" style="border-radius: 50%; vertical-align: middle; margin: 10px 50px" />
			<div class="lv-left-head-name">
				<span>{{ user.name }}</span>
				<span>{{ user.rank }}</span>
			</div>
		</div>
		<div class="lv-left-menu">
			<el-menu
				default-active="Prophets"
				class="el-menu-vertical-demo"
				@select="handleSelect"
				background-color="transparent"
				text-color="#000000"
				active-text-color="#ffd04b"
			>
				<el-menu-item index="Prophets">
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
	data() {
		return {
			user: {
				name: '喜乐难寻',
				rank: 'Lv.1',
				icon: 'http://ddragon.leagueoflegends.com/cdn/12.7.1/img/profileicon/3456.png',
			},
			Client: {},
			credentials: {},
		};
	},
	methods: {
		handleSelect(index) {
			this.$router.push('/' + index);
		},
		async getCurrentSummoner() {
			let data = await this.Client.getCurrentSummoner();
			if (data) {
				this.user.name = data.displayName;
				this.user.rank = 'Lv.'+ data.summonerLevel;
				this.user.icon = `http://ddragon.leagueoflegends.com/cdn/12.7.1/img/profileicon/${data.profileIconId}.png`;
			}
		},
	},
	created() {},
	mounted() {
		console.log('credentials mounted: ', this.credentials);
	},
	async beforeCreate() {
		this.$ipc.on('auth', (event, data) => {
			this.credentials = data;
			this.Client = new client(this.credentials);
			this.getCurrentSummoner();
		});
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
