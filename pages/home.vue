<template>
    <div class="container">
        <h1>ホーム</h1>
        <div class="modal-window">
            <div class="icon_circle"  @click="openModal">
                <div class="circle_inner">
                    <i class="fas fa-plus"></i>
                </div>
            </div>
            <NewTaskModal :newTask="newTask" :groups="groups" :title="'新規タスクの追加'" :button="'追加'" @close="closeModal" @send="addTask" v-if="modal"/>
        </div>

        <div class="boards">
            <TaskBoard :tasks="tasks_todo" :title="'TODO'"></TaskBoard>
            <TaskBoard :tasks="tasks_doing" :title="'DOING'"></TaskBoard>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 1000px;
    margin: auto;
    h1 {
        margin: 10px 0;
    }
    .boards {
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
}
</style>

<script>
    import gql from 'graphql-tag'
    import moment from '~/plugins/moment'
    import serviceworker from '~/plugins/serviceworker'

    import TaskBoard from '~/components/organisms/TaskBoard.vue'
    import NewTaskModal from '~/components/organisms/NewTaskModal.vue'

    import getUserTasksQuery from '~/apollo/queries/get_user_tasks_query.gql'
    import createTaskMutation from '~/apollo/queries/create_task_mutation.gql'

    export default {
        data: () => ({
            tasks_todo: [],
            tasks_doing: [],
            groups: [],
            modal: false,
            message: '',
            newTask: {}
        }),

        components: {
            TaskBoard,
            NewTaskModal
        },

        mounted: function(){
            if (!this.$store.getters['auth/isAuthenticated']) {
                // 未ログイン時にはログインページに遷移
                this.$router.push('/login')
            } else {
                console.log(this.$store.state.auth.user.id);
                serviceworker(this.$store.state.auth.user.id);
                this.$apollo.query({
                    query: getUserTasksQuery,
                    variables: {
                        id: this.$store.state.auth.user.id,
                    },
                }).then(res => {
                    let tasks = [];
                    for (let group of res.data.user.groups) {
                        tasks.push(group.tasks);
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
        }
    }
</script>