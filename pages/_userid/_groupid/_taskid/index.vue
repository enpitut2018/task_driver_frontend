<template>
	<div>
		<div class="taskCard">
			<div class="taskHead">
				<h1>{{taskid}}</h1>
				<h2>{{userid}}</h2>
				<div class="taskBody">
					taskinfo
					<div class="crap_count" @click="crap_countup">
						<i class="far fa-thumbs-up"></i> {{ crap_count }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.taskCard {
		background-color: #fff;
		width: 100%;
		border-radius: 3px;
		padding: 30px;
		margin: 50px 0;
		.taskHead {
			margin: 10px;
		}
		.taskBody .crap_count {
			color: red;
			border: red 1px solid;
			border-radius: 50px;
			width: 50px;
			padding: 10px;
		}
	}
</style>

<script>
	// import gql from 'graphql-tag'

	export default {
		data() {
			return {
				userid: this.$route.params.userid,
				groupid: this.$route.params.groupid,
				taskid: this.$route.params.taskid,
				task: {},
				crap_count: 0
			}
		},
		methods: {
			crap_countup () {
				this.crap_count += 1;
			}
		},
	}
</script>