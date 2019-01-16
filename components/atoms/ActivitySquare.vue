<template>
	<div class="cell">
		<li :class="{
			high: score >= 15,
			middle_high: score >= 10 && score < 15,
			middle: score >= 5 && score < 10,
			middle_low: score > 0 && score < 5,
			low: score == 0
		}"
		v-on:mouseover="toggle_activeness"
		v-on:mouseleave="toggle_activeness"></li>
		<div class="detail" :class="{active:isActive}">
			<span>スコア: </span>{{score}} | {{activity.date.format('YYYY-MM-DD dddd')}}
		</div>
	</div>
</template>

<style lang="scss" scoped>
.cell {
	position: relative;
	li {
		width: 100%;
		height: 100%;
		&.low {
			background-color: #EBEDF0;
		}
		&.middle_low {
			background-color: #C6E38B;
		}
		&.middle {
			background-color: #7BC86F;
		}
		&.middle_high {
			background-color: #499B3C;
		}
		&.high {
			background-color: #2C6227;
		}
	}
	.detail {
		display: none;
		position: absolute;
		z-index: 10;
		background-color: #333;
		color: #ddd;
		padding: 5px 8px;
		border-radius: 3px;
		font-size: 12px;
		font-weight: 400;
		left: 50%;
		width: 180px;
		margin-left: -90px;
		margin-top: 5px;
		opacity: .9;
		text-align: center;
		span {
			font-weight: 600;
		}
	}
	.active {
		display: block;
	}
}
</style>

<script>
	import moment from '~/plugins/moment'

	export default {
		data () {
			return {
				isActive: false,
			}
		},
		props: {
			activity: {
				type: Object,
				defaut: function () {
					return {
						date: moment(),
						contributions: new Array,
						tasks: new Array,
					}
				}
			},
		},
		computed: {
			score () {
				return this.activity.contributions.length * 1 + this.activity.tasks.length * 2;
			},
			date() {
				return this.activity.date.format('YYYY-MM-DD');
			},
		},
		methods: {
			toggle_activeness () {
				this.isActive = !this.isActive
			},
		},
	}
</script>