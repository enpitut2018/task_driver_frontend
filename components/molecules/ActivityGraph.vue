<template>
	<div class="card">
		<div class="container">
			<div class="graph">
				<ul class="months" :style="month_widths">
					<li class="empty"></li>
					<li v-for="month in months" :key="month.id">{{month}}</li>
				</ul>
				<ul class="days">
					<li>日</li>
					<li>月</li>
					<li>火</li>
					<li>水</li>
					<li>木</li>
					<li>金</li>
					<li>土</li>
				</ul>
				<ul class="squares">
					<ActivitySquare v-for="activity in activities" :key="activity.id" :activity="activity" />
				</ul>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	ul {
		list-style: none;
		padding: 0;
	}
	.card {
		background-color: #fff;
		margin: 13px 20px;
		padding: 25px 35px;
		border-radius: 5px;
		border: 1px solid #ddd;
		font-size: 9px;
		font-weight: 400;
		color: #333;
		.container {
			width: min-content;
			margin: auto;
			.graph {
				display: inline-grid;
				grid-template-areas: "empty months"
									 "days squares";
				grid-gap: 5px;
				grid-template-columns: auto;
				justify-content: center;
				.months {
					display: grid;
					grid-area: months;
					grid-auto-flow: column;
				}
				.days, .squares {
					display: grid;
					grid-template-rows: repeat(7, 10px);
					grid-gap: 2px;
				}
				.days {
					grid-area: days;
					text-align: right;
					line-height: 1;
				}
				.squares {
					grid-area: squares;
					grid-auto-flow: column;
					grid-auto-columns: 10px;
				}
				.days li:nth-child(odd) {
					visibility: hidden;
				}
			}
		}
	}
</style>

<script>
	import ActivitySquare from '~/components/atoms/ActivitySquare.vue'
	import moment from '~/plugins/moment'

	import gql from 'graphql-tag'
	import getActivitiesQuery from '~/apollo/queries/get_activities_query.gql'

	export default {
		data() {
			return {
				activities: [],
				months: [],
				month_widths: {},
			}
		},
		props: {
			userid: Number,
		},
		components: {
			ActivitySquare,
		},
		mounted: function() {
			// 今日の日付
			let today = moment(new Date());
			// 最初のセル(今日から1年前の週の日曜日)
			let first_day = moment(new Date()).subtract(1, 'years').day(0);
			// セルの初期化
			// セルの個数
			let days_count = today.diff(first_day, 'days')+1;
			// activityの1年分の配列
			let activities = [...Array(days_count+1).keys()].map(i => {
				let obj = {};
				obj['date'] = first_day.clone().add(i, 'days');
				obj['contributions'] = [];
				obj['tasks'] = [];
				return obj;
			});
			// データの取得
			this.$apollo.query({
				query: getActivitiesQuery,
				variables: {
					userId: this.userid,
				},
			}).then(res => {
				res.data.activities.map((val, idx) => {
					let date = moment(val['date'], "YYYY-MM-DD HH:mm:ss Z");
					let index = date.diff(first_day, 'days')+1;
					activities[index]['contributions'] = val['contributions'];
					activities[index]['tasks'] = val['tasks'];
				});
			}).catch(err => {
				console.log(err);
			})
			this.activities = activities;

			// 各月の表示位置の計算
			// 各月初日のセルがある列の上に月名を表示したい

			// グラフの列数
			let columns_count = Math.ceil(days_count/7);
			// 最初の月を求める
			let first_month;
			if (first_day.date() == 1) {
				first_month = first_day;
			} else {
				first_month = first_day.clone().date(1).add(1, 'months');
			}
			// 各月の名前、位置の配列を作る
			let months = [];
			let positions = [];
			[...Array(12).keys()].map(i  => {
				let month = first_month.clone().add(i, 'months');
				months.push(month.format('MMM'));
				positions.push(Math.floor(month.diff(first_day, 'days')/7));
			});
			this.months = months;
			// 各月の幅の配列を作る
			let widths = [];
			positions.map((val, idx) => {
				if (idx == 0) {
					widths.push(positions[idx]);
				} else {
					widths.push(positions[idx] - positions[idx-1]);
				}
			});
			widths.push(columns_count - positions[positions.length - 1]);

			this.month_widths['grid-template-columns'] = widths.map((val) => {
				return `calc(12px * ${val})`
			}).join(' ');
		},
	}
</script>