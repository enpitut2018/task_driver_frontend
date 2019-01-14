<template>
	<div>
		<div class="five-minutes">
           <FiveMinutesModal :taskname= task.name @close="closeModal" ref="minute" v-if="modal"/>
        </div>
		
		<div class="update-task">
			<NewTaskModal :newTask="newTask" :groups="groups" :title="'タスクの更新'" :button="'更新'" @close="closeformModal" @send="updateTask" v-if="formModal"/>
		</div>

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
				<div class="tags">
					<TaskCardTag v-for="group in task.group.ancestorAndSelfGroups" :key="group.id" :group="group"/>
					<button @click="deleteTask">タスクの削除</button>
					<button @click="openformModal">タスクの更新</button>
				</div>
			</div>

			<div class="taskBody">
				<div class="note">
					{{task.note}}
				</div>
				<template v-if="task.status==1">
					<button @click="start_contribution" class="start_btn">始める</button>
				</template>
				<template v-if="task.status==2">
					<button @click="finish_contribution" class="finish_btn">やめる</button>
				</template>
			</div>

			<div class="taskFooter">
				<div class="clap_count" @click="clap_countup">
					<i class="far fa-thumbs-up"></i> {{task.clap}}
				</div>
			</div>
		</div>

		<div class="contributions" v-if="task.contributions.length > 0">
			<ContributionList :contributions="task.contributions"/>
		</div>

	</div>
</template>

<style lang="scss" scoped>
.taskCard {
	margin: 50px 0;
	padding: 35px 70px 15px;
	background-color: #fff;
	border-radius: 5px;
	border: 1px solid #ddd;
	.taskHead {
		h1 {
			display: inline-flex;
			align-items: center;
			.status {
				font-size: 60%;
				color: #fff;
				padding: 2px 8px;
				margin: 0 10px;
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
		.tags {
			margin: 5px 3px;
		}
	}
	.taskBody {
		.note {
			margin: 15px 10px;
		}
		button {
			font-weight: 500;
			font-size: 14px;
			letter-spacing: .1em;
			padding: 8px 20px;
			width: 100%;
			border-radius: 6px;
			border: none;
			width: 70%;
			display: block;
			margin: 15px auto;
			&.start_btn {
				@include buttonReflect($startButtonColor, $white);
			}
			&.finish_btn {
				@include buttonReflect($finishButtonColor, $white);
			}
		}
	}
	.taskFooter {
		.clap_count {
			color: red;
			border: red 1px solid;
			border-radius: 50px;
			display: inline-flex;
			justify-content: space-between;
			align-items: center;
			width: 44px;
			padding: 4px 12px;
		}
	}
}
</style>

<script>
	import gql from 'graphql-tag'
	import moment from '~/plugins/moment'

	import ContributionList from '~/components/organisms/ContributionList.vue'
	import TaskCardTag from '~/components/atoms/TaskCardTag.vue'

	import NewTaskModal from '~/components/organisms/NewTaskModal.vue'
	import FiveMinutesModal from '~/components/organisms/FiveMinutesModal.vue'

	import getTaskQuery from '~/apollo/queries/get_task_query.gql'
	import getUserGroupsQuery from '~/apollo/queries/get_user_groups_query.gql'

	import createClapMutation from '~/apollo/queries/create_clap_mutation.gql'
	import startContributionMutation from '~/apollo/queries/start_contribution_mutation.gql'
	import finishContributionMutation from '~/apollo/queries/finish_contribution_mutation.gql'

    import updateTaskMutation from '~/apollo/queries/update_task_mutation.gql'
	import deleteTaskMutation from '~/apollo/queries/delete_task_mutation.gql'

	export default {
		data() {
			return {
				modal: false,
				formModal: false,
				userid: this.$route.params.userid,
				groupid: this.$route.params.groupid,
				taskid: this.$route.params.taskid,
				task: {
					group: {
						ancestorAndSelfGroups: [],
					},
					contributions: [],
				},
				groups: [],
				newTask: {},
				finality: false,
			}
		},

		components: {
			ContributionList,
			TaskCardTag,
			FiveMinutesModal,
			NewTaskModal
		},

		methods: {
			openModal() {
                this.modal = true
            },

            closeModal() {
                this.modal = false
			},
			
			openformModal() {
                this.formModal = true
			},
			
            closeformModal() {
            	this.formModal = false
			},
			
            updateTask(){
                let task = this.newTask;
				let deadline = moment(task.deadline);

				console.log(task);

                this.$apollo.mutate({
                    mutation: updateTaskMutation,
                    variables: {
						taskId: this.$route.params.taskid,
                        name: task.name,
                        deadline: {
                            year: deadline.year(),
                            month: deadline.month() + 1,
                            day: deadline.date(),
                            hour: deadline.hour(), 
                            minute: deadline.minute(), 
                            second: deadline.second()
                        },
                        importance: Number(task.importance),
                        note: task.note,
                        groupId: Number(task.groupId),
                    },
                }).then(res => {
                    console.log(res);
                    // this.tasks_todo.push(res.data.updateTask.task);
					this.task = res.data.updateTask.task;
                }).catch(err => {
                    console.log(err);
                });
            },
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
				let task = this.task;
				this.$apollo.mutate({
					mutation: startContributionMutation,
					variables: {
						taskId: this.$route.params.taskid,
					},
				}).then(res => {
					console.log(res);
					task.status = res.data.startContribution.task.status;

					task.contributions.push(res.data.startContribution.contribution);
				}).catch(err => {
					console.log(err);
				})
			},

			finish_contribution () {
				let task = this.task;
				this.$apollo.mutate({
					mutation: finishContributionMutation,
					variables: {
						contributionId: task.contributions[task.contributions.length - 1].id,
						finality: this.finality,
					},
				}).then(res => {
					console.log(res);
					task.status = res.data.finishContribution.task.status;
					
					task.contributions.pop();
					task.contributions.push(res.data.finishContribution.contribution);
				}).catch(err => {
					console.log(err);
				})
			},

			deleteTask () {
				let task = this.task;
				this.$apollo.mutate({
					mutation: deleteTaskMutation,
					variables: {
						taskId: this.$route.params.taskid,
					},
				}).then(res => {
					console.log(res);
					this.$router.push('/home')
				}).catch(err => {
					console.log(err);
				})
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
				this.newTask = Object.assign({}, res.data.task);
				this.newTask.deadline = moment(this.newTask.deadline).toISOString();

				if (this.$route.query.fiveminutes == "true"){
					this.modal = true;
				}
				
			}).catch(err => {
				console.log(err);
			});
			
			this.$apollo.query({
				query: getUserGroupsQuery,
				variables: {
                        id: this.$store.state.auth.user.id,
                },
			}).then(res => {
				console.log(res);
				for (let group of res.data.user.groups) {
                        let group_data = {
                            id: group.id,
                            name: group.name,
                            userId: group.userId,
                        }
                        this.groups.push(group_data);
                };
			}).catch(err => {
				console.log(err);
			});
		},
	}
</script>