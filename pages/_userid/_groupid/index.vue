<template>
	<div class="container">
		<h1 class="groupName">{{groupname}}</h1>
        <p>{{publicity}}</p>
        <span class="star" v-for="n in importance" :key="n">★</span>
        <button @click="openGroupModal">グループの更新</button>
        <button @click="deleteGroup">グループの削除</button>

		<div class="boards">
			<TaskBoard :tasks="tasks_todo" :title="'TODO'"></TaskBoard>
            <TaskBoard :tasks="tasks_doing" :title="'DOING'"></TaskBoard>
		</div>

		<div class="modal-window">
            <div class="icon_circle"  @click="openModal">
                <div class="circle_inner">
                    <i class="fas fa-plus"></i>
                </div>
            </div>
            <NewTaskModal :newTask="newTask" :groups="groups" :title="'新規タスクの追加'" :button="'追加'" @close="closeModal" @send="addTask" v-if="modal"/>
            <NewGroupModal :newGroup="newGroup" :groups="groups" :title="'グループの編集'" :button="'編集'" @close="closeGroupModal" @send="updateGroup" v-if="group_modal"/>
        </div>
	</div>
</template>

<style lang="scss" scoped>
.container {
	width: 1000px;
	margin: auto;
	.groupName {
		font-size: 35px;
		font-weight: 700;
		margin: 25px 0 10px 0;
	}
	.boards {
		width: 100%;
		display: flex;
	}
	.icon_circle {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		vertical-align: top;
		background-color: orange;
		position: fixed;
		bottom: 60px;
		right: 60px;
		width: 65px;
		height: 65px;
		box-shadow: 0 0 3px 0 #000;
		.circle_inner {
			font-size: 2.3em;
			color: #fff;
		}
	}
    .star{
        font-size: 12px;
        margin-left: 1px;
        color: #ffc100;
    }
}
</style>

<script>
    import gql from 'graphql-tag'
    import moment from '~/plugins/moment'

    import TaskBoard from '~/components/organisms/TaskBoard.vue'
    import NewTaskModal from '~/components/organisms/NewTaskModal.vue'

    import getUserTasksQuery from '~/apollo/queries/get_user_tasks_query.gql'
    import createTaskMutation from '~/apollo/queries/create_task_mutation.gql'
    import updateGroupMutation from '~/apollo/queries/update_group_mutation.gql'
    import deleteGroupMutation from  '~/apollo/queries/delete_group_mutation.gql'
    
    import NewGroupModal from '~/components/organisms/NewGroupModal.vue'

    export default {
        data: () => ({
            tasks_todo: [],
            tasks_doing: [],
            groups: [],
            modal: false,
            message: '',
            newTask: {},
            newGroup: {},
			userid: '',
			groupid: '',
            groupname: '',
            group_modal: false,
            publicity: '',
            importance: 1
        }),

        components: {
            TaskBoard,
            NewTaskModal,
            NewGroupModal
		},
		
        mounted: function(){
            if (this.$store.state.auth.user == null) {
                // 未ログイン時にはルートに遷移
                this.$router.push('/')
            } else {
                this.$apollo.query({
                    query: getUserTasksQuery,
                    variables: {
						id: this.$store.state.auth.user.id,
					},		
                }).then(res => {
                    let tasks = [];
                    for (let group of res.data.user.groups) {
						if (group.id == this.$route.params.groupid){
                            tasks.push(group.tasks);

                            if (group.public == true){
                                this.publicity = "公開"
                            }
                            else{
                                this.publicity = "非公開"
                            }
                            this.importance = group.importance
                            this.groupname = group.name
                            this.newGroup = Object.assign({}, group);
				            this.newGroup.deadline = moment(this.newGroup.deadline).toISOString();
						}
						let group_data = {
							id: group.id,
							name: group.name,
							userId: group.userId,
						}
						this.groups.push(group_data);
                    };
                    tasks = tasks.flat();
                    for (let task of tasks) {					
						if (task.status == 1) {
							this.tasks_todo.push(task);
						} else if (task.status == 2) {
							this.tasks_doing.push(task);
						}
					}					
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        methods: {
            openModal() {
                this.modal = true
            },

            closeModal() {
                this.modal = false
            },

            openGroupModal() {
                this.group_modal = true
            },

            closeGroupModal() {
                this.group_modal = false
            },

            addTask(){
                console.log(this.newTask);
                
                let task = this.newTask;
                let deadline = moment(task.deadline);

                this.$apollo.mutate({
                    mutation: createTaskMutation,
                    variables: {
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
                    this.tasks_todo.push(res.data.createTask.task);
                    this.newTask = {};
                }).catch(err => {
                    console.log(err);
                });
            },
            
            updateGroup(){
                let group = this.newGroup;
				let deadline = moment(group.deadline);

                this.$apollo.mutate({
                    mutation: updateGroupMutation,
                    variables: {
						groupId: this.$route.params.groupid,
                        name: group.name,
                        deadline: {
                            year: deadline.year(),
                            month: deadline.month() + 1,
                            day: deadline.date(),
                            hour: deadline.hour(), 
                            minute: deadline.minute(), 
                            second: deadline.second()
                        },
                        importance: Number(group.importance),
                        parentId: Number(group.parentId),
                        publicity: group.publicity
                    },
                }).then(res => {
                    console.log(res);
                    // this.tasks_todo.push(res.data.updateTask.task);
					this.group = res.data.updateGroup.group;
                }).catch(err => {
                    console.log(err);
                });
            },
            
            deleteGroup () {
				let group = this.group;
				this.$apollo.mutate({
					mutation: deleteGroupMutation,
					variables: {
						groupId: this.$route.params.groupid,
					},
				}).then(res => {
					console.log(res);
					this.$router.push('/home')
				}).catch(err => {
					console.log(err);
				})
			},
        },
    }
</script>