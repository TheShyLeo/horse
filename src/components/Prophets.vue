<template>
	<el-main class="Prophet">
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
						<el-tag
							:key="index"
							v-for="(tag, index) in scope.row.history"
							size="medium"
							effect="light"
							:type="tag.type"
							style="margin-left: 10px; font-weight: bold"
						>
							{{ tag.name }}
						</el-tag>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</el-main>
</template>

<script>
import client from '../tools/api/client';

export default {
	data() {
		return {
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
			],
			Client: client,
			credentials: {},
		};
	},
	methods: {
		async getTeamSummoners() {
			console.log('获取队伍信息');
			let conversation = await this.Client.getCurConversation();
			if (conversation.length > 0) {
				let conversationId = conversation[0].id;
				let messages = await this.Client.getConversationMessages(conversationId);
				for (const v of messages) {
					let matchlist = await this.Client.getMatchList(v.fromSummonerId, 0, 10);
					if (matchlist.length > 0) {
						let match = await this.Client.getMatch(matchlist[0].gameId);
						let participants = match.participants;
						let team = participants.filter(v => v.teamId === 100);
						let teamSummoners = team.map(v => v.summonerId);
						let teamInfo = await this.Client.getSummonerInfo(teamSummoners);
						let teamName = teamInfo.map(v => v.name);
						let teamKDA = teamInfo.map(v => v.stats.kda);
						let teamPercent = teamInfo.map(v => v.stats.winPercent);
						let teamHistory = teamInfo.map(v => v.stats.history);
						let teamData = {
							name: teamName.join('、'),
							kda: teamKDA.join('、'),
							percent: teamPercent.join('、'),
							history: teamHistory.map(v => v.map(v => {
								return {
									name: v.name,
									type: v.type,
								};
							})),
						};
						this.tableData.push(teamData);
					}
				}
			}
			return [];
		},
		// 查询
		search() {
			let data;
			let arr = [];
			if (data) {
				if (data.games && data.games.games && data.games.games.length > 0) {
					data.games.games.forEach((item) => {
						let match = {};
						let participants = item.participants;
						let stats = participants.stats;
						match.championId = participants.championId;
						match.gameId = stats.gameId;
						match.kills = stats.kills;
						match.deaths = stats.deaths;
						match.assists = stats.assists;
						match.win = stats.win;
						match.earlySurrender = stats.causedEarlySurrender;
						match.kda = match.kills + '/' + match.deaths + '/' + match.assists;
						arr.push(match);
					});
				}
			}
		},
	},
	async beforeCreate() {
		this.$ipc.on('auth', (event, data) => {
			this.credentials = data;
			this.Client = new client(this.credentials);
		});
	},
	async created() {},
	name: 'Prophet',
};
</script>

<style>
.el-table,
.el-table__expanded-cell {
	background-color: transparent !important;
}
/* 表格内背景颜色 */
.el-table th,
.el-table tr,
.el-table td {
	background-color: transparent !important;
	border: 0px !important;
}
.el-table::before {
	height: 0px !important;
}
</style>
