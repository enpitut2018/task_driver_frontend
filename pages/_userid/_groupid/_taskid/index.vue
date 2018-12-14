<template>
	<div>
		<div class="taskCard">
			<div class="taskHead">
				<h1>
					{{task.name}}
					<template v-if="task.status==1">
						<span class="status todo">TODO</span>
					</template>
					<template v-if="task.status==2">
						<span class="status doing">DOING</span>
					</template>
					<template v-if="task.status==3">
						<span class="status done">DONE</span>
					</template>
					<span class="star" v-for="n in task.importance" :key="n">★</span>
				</h1>
				<h2>{{task.groupId}}</h2>
				<div class="taskBody">
					<div class="crap_count" @click="clap_countup">
						<i class="far fa-thumbs-up"></i> {{task.clap}}
					</div>
				</div>
				<button v-if="task.status==1" @click="start_contribution" class="">start</button>
			</div>
			<div class="contributions">
				<ul>
					<li v-for="cont in task.contributions" :key="cont.id">
						{{ cont.userId }}
						{{ cont.createdAt }}
						{{ cont.status }}
					</li>
				</ul>
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
		.status {
			font-size: 60%;
			color: #fff;
			padding: 2px 8px;
			border-radius: 3px;
			font-weight: 500;
			&.todo {
				background-color: #00bb00;
			}
			&.doing {
				background-color: #ff8c00;
			}
			&.done {
				background-color: red;
			}
		}
		.star {
			font-size: 12px;
			margin-left: 1px;
			color: #ffc100;
		}
	}
	.taskBody .crap_count {
		color: red;
		border: red 1px solid;
		border-radius: 50px;
		width: 50px;
		padding: 10px;
	}
	button.start{
		@include buttonReflect($startButtonColor, $white);
	}
	button {
		font-weight: 500;
		font-size: 14px;
		letter-spacing: .1em;
		padding: 8px 20px;
		width: 100%;
		border-radius: 6px;
		border: none;
	}
}
</style>

<script>
	import gql from 'graphql-tag'
	import moment from '~/plugins/moment'

	const createClapMutation = gql`
	mutation ($taskId: ID!) {
		createClap(taskId: $taskId) {
			task {
				id
				status
				clap
			}
			errors 
		}
	}
	`

	const getTaskQuery = gql`
	query ($taskId: ID!) {
		task(id: $taskId) {
			clap
			createdAt
			deadline
			finishTime
			groupId
			importance
			name
			note
			priority
			startTime
			status
			updatedAt
			urgency
			contributions {
				createdAt
				finality
				finishedAt
				id
				status
				userId
			}
		}
	}
	`

	const start_contribution = gql`
	mutation ($taskId: ID!) {
		startContribution(taskId: $taskId) {
			contribution {
				id
				status
				userId
				finishedAt
				createdAt
				finality
			}
			task {
				id
				status
			}
			errors
		}
	}
	`

	export default {
		data() {
			return {
				userid: this.$route.params.userid,
				groupid: this.$route.params.groupid,
				taskid: this.$route.params.taskid,
				task: {},
			}
		},
		methods: {
			clap_countup () {
				this.$apollo.mutate({
					mutation: createClapMutation,
					variables: {
						taskId: this.$route.params.taskid,
					},
				}).then(res => {
					console.log(res);
					this.task.clap = res.data.createClap.task.clap;
				}).catch(err => {
					console.log(err);
				});
			},

			start_contribution () {
				this.$apollo.mutate({
					mutation: start_contribution,
					variables: {
						taskId: this.$route.params.taskid,
					},
				}).then(res => {
					console.log(res);
					this.task.contributions.push(res.data.contribution);
				}).catch(err => {
					console.log(err);
				})
			},

			finish_contribution () {

			},
		},
		mounted: function () {
			console.log(this.$route.params.taskid);
			this.$apollo.query({
				query: getTaskQuery,
				variables: {
					taskId: this.$route.params.taskid,
				},
			}).then(res => {
				console.log(res);
				this.task = res.data.task;
			}).catch(err => {
				console.log(err);
			});
		},
	}
</script>