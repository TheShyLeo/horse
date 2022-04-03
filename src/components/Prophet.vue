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
// import lcu from '../tools/api/lcu';

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
		};
	},
	created() {
	},
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
