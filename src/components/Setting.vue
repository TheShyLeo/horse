<template>
	<el-main class="Setting">
		<el-row>
			<el-col :span="12">
				<div>自动接受对局<el-switch v-model="setting.autoAccept" @change="change"></el-switch></div>
			</el-col>
			<el-col :span="12">
				<div>自动办选英雄<el-switch v-model="setting.autoBanPick" @change="change"></el-switch></div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				<div>
					ban
					<el-select v-model="setting.ban" style="width: 200px" filterable clearable @change="change">
						<el-option v-for="item in champions" :key="item.id" :label="item.name" :value="item.id">
							<img src="../assets/123.png" style="height: 32px; float: right" />
							<span>{{ item.name }}</span>
						</el-option>
					</el-select>
				</div>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
export default {
	name: 'Setting',
	data() {
		return {
			champions: [],
			setting: {
				autoAccept: false,
				autoBanPick: false,
				ban: 1,
				pick: 2,
			},
		};
	},
	methods: {
		success() {
			this.$message({
				message: '保存成功',
				type: 'success',
			});
		},
		failed(err) {
			this.$message({
				message: err,
				type: 'error',
			});
		},
		change() {
			this.saveSetting();
		},
		getSetting() {
			this.$Api.LocalFile.read('setting', (data, err) => {
				if (err) {
					this.failed(err);
				} else {
					this.setting = data;
				}
			});
		},
		saveSetting() {
			this.$Api.LocalFile.write('setting', this.setting, (data, err) => {
				if (err) {
					this.failed(err);
				} else {
					// this.success();
				}
			});
		},
	},
	created() {
		this.getSetting();
	},
};
</script>

<style>
.el-row {
	-webkit-app-region: no-drag;
	margin-top: 20px;
}
/* .el-col {
	padding: 20px;
} */
.el-switch {
	padding: 50px;
}
</style>
