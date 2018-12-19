<template>
	<div class="card">
		<UserInfo :user="contribution.user"/>
		<template v-if="!contribution.status">
			<div class="contribution_detail">
				{{ [contribution.createdAt, contribution.finishedAt] | momentsToDuration | durationFormat }}このタスクに取り掛かりました。
				<div class="times">
					{{ contribution.createdAt | momentToString }} - {{ contribution.finishedAt | momentToString }}
				</div>
			</div>
		</template>
		<template v-if="contribution.status">
			<div class="contribution_detail">
				{{ contribution.createdAt | durationToNow | durationFormat }}このタスクに取り掛かっています。
				<div class="times">
					{{ contribution.createdAt | momentToString }} -
				</div>
			</div>
		</template>
	</div>
</template>

<style lang="scss" scoped>
.card {
	position: relative;
	background-color: #fff;
	margin: 8px 0 8px 4%;
	padding: 12px 35px;
	border-radius: 5px;
	border: 1px solid #ddd;
	&:before{
		content: "";
		position: absolute;
		top: 50%;
		left: -24px;
		margin-top: -12px;
		border: 12px solid transparent;
		border-right: 12px solid #FFF;
		z-index: 2;
	}

	&:after{
		content: "";
		position: absolute;
		top: 50%;
		left: -28px;
		margin-top: -14px;
		border: 14px solid transparent;
		border-right: 14px solid #ddd;
		z-index: 1;
	}
	.contribution_detail {
		margin: 5px 25px;
		.times {
			margin: 5px 0;
			color: #555;
			font-size: 70%;
			font-weight: 500;
		}
	}
}
</style>

<script>
	import moment from '~/plugins/moment'
	import UserInfo from '~/components/atoms/UserInfo.vue'

	export default {
		props: ['contribution'],

		filters: {
			momentToString: function (value) {
				return moment(value, "YYYY-MM-DD HH:mm:ss Z").format("YYYY年M月D日H時m分")
			},

			momentsToDuration: function (value) {
				let moment_s = moment(value[0], "YYYY-MM-DD HH:mm:ss Z");
				let moment_e = moment(value[1], "YYYY-MM-DD HH:mm:ss Z");
				return moment_e.diff(moment_s, 's')
			},

			durationToNow: function (value) {
				let moment_s = moment(value, "YYYY-MM-DD HH:mm:ss Z");
				let moment_e = moment();
				return moment_e.diff(moment_s, 's')
			},

			durationFormat: function (value) {
				let hours = 0;
				let mins = 0;

				hours = Math.floor(value / (60 * 60));
				value = value % (60 * 60);
				mins = Math.floor(value / 60);

				if (hours > 0) {
					// 1時間以上の場合: HH時間MM分
					return hours + '時間' + mins + '分';
				} else if (mins > 0) {
					// 1時間未満の場合: MM分
					return mins + '分';
				} else {
					// 1分未満の場合: 1分
					return '1分';
				}
			},
		},

		components: {
			UserInfo,
		},
	}
</script>