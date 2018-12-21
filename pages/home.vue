<template>
    <div>  
        <div class="modal-window">
            <button @click="openModal">タスクの追加</button>
            <TaskNewModal :sendData= this.sendData :groups= this.groups @close="closeModal" @send="addTask" v-if="modal"/>
        </div>
        <div v-if="isAuthenticated">
            <TaskBoard :tasks= this.todo title="TODO"></TaskBoard>
            <TaskBoard :tasks= this.doing title="DOING"></TaskBoard>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag'
    import moment from '~/plugins/moment'
    import TaskBoard from '~/components/organisms/TaskBoard.vue'
    import TaskNewModal from '~/components/organisms/TaskNewModal.vue'

    const getTasksQuery = gql`
                    query($id: ID!){
                        user(id: $id)
                        {
                            groups{
                                id
                                name
                                tasks{
                                    id
                                    name
                                    status
                                    userId
                                    group {
                                        ancestorAndSelfGroups {
                                            id
                                            name
                                            userId
                                        }
                                    }
                                }
                            }
                        }
                    }`

    const createTaskMutation = gql`
        mutation ($name: String!, $deadline: MomentInput!, $importance: Int!, $note: String!, $groupId: ID!) {
            createTask(name: $name, deadline: $deadline, importance: $importance, note: $note, groupId: $groupId) {
                task {
                    name
                    deadline
                    importance
                    note
                    groupId
                }
                errors 
            }
        }
    `

    export default {
        data: () => ({
            task: {},
            modal: false,
            message: '',
            sendData: {
                name: "",
                deadline_date: "",
                deadline_time: "",
                importance: "",
                note: "",
                group_id: ""
            }
        }),

        components: 
        {
            TaskBoard,
            TaskNewModal
        },

        mounted: function(){
            this.$apollo.query({
                query: getTasksQuery,
                variables: {
                    id: this.$auth.user.id
                },
            }).then(res => {
				// console.log(res);
                this.task = res.data.user,groups;
                console.log(this.task);
			}).catch(err => {
				console.log(err);
			});
        },
        methods: {
            openModal() {
                this.modal = true
            },

            closeModal() {
            this.modal = false
            },

            addTask(){
                var datetime = moment(this.sendData.deadline_date + " " + this.sendData.deadline_time, "YYYY-MM-DD HH:mm")
                
                console.log(datetime);
                console.log(datetime.year());
                console.log(datetime.month());
                console.log(datetime.date());
                console.log(datetime.hour());
                console.log(datetime.minute());
                console.log(datetime.second());

                this.$apollo.mutate({
                    mutation: createTaskMutation,
                    variables: {
                        name: this.sendData.name,
                        deadline: {
                            year: datetime.year(),
                            month: datetime.month() + 1,
                            day: datetime.date(),
                            hour: datetime.hour(), 
                            minute: datetime.minute(), 
                            second: datetime.second()
                        },

                        // deadlineのフォーマット ->  "2018-12-12 14:51:02",
                        importance: Number(this.sendData.importance),
                        note: this.sendData.note,
                        groupId: Number(this.sendData.groupId)
                        // status: Number(this.sendData.status),
                    },
                }).then(res => {
                    console.log(res);
                    // this.task.clap = res.data.createClap.task.clap;
                    
                    this.sendData.name =  "",
                    this.sendData.deadline_date = "",
                    this.sendData.deadline_time = "",
                    this.sendData.importance =  1,
                    this.sendData.note =  "",
                    this.sendData.group_id =  ""
                    
                    // 親イベント発火
                }).catch(err => {
                    console.log(err);
                });
            },
        },
        computed: {
            userInfo () {
                return this.$auth.user
            },
            isAuthenticated () {
                return this.$auth.loggedIn
            },
            joinedDate () {
                let dateRes = this.user.user.created_at
                return moment(dateRes, "YYYY-MM-DD HH:mm:ss Z").format("YYYY年M月D日H時m分")
            },

            todo(){
                var toString = Object.prototype.toString
                const todos = []
                // todos.push(toString.call(this.task.groups));
                // todos.push(this.task.groups.length);

                for (var i in this.task.groups) {
                    for (var n in this.task.groups[i].tasks){
                        var todo = {}
                        todo["group_id"] = this.task.groups[i].id;
                        todo["group_name"] = this.task.groups[i].name;
                        todo["name"] = this.task.groups[i].tasks[n].name;
                        todo["id"] = this.task.groups[i].tasks[n].id;
                        todo["userId"] = this.task.groups[i].tasks[n].userId;
                        if (this.task.groups[i].tasks[n].status == 1){
                            todos.push(todo);
                        }
                    }
                }
                return todos
            },

            doing(){
                var toString = Object.prototype.toString
                const todos = []
                // todos.push(toString.call(this.task.groups));
                // todos.push(this.task.groups.length);

                for (var i in this.task.groups) {
                    for (var n in this.task.groups[i].tasks){
                        var todo = {}
                        todo["group"] = this.task.groups[i].name;
                        todo["name"] = this.task.groups[i].tasks[n].name;
                        todo["id"] = this.task.groups[i].tasks[n].id;
                        
                        if (this.task.groups[i].tasks[n].status == 2){
                            todos.push(todo);
                        }
                    }
                }
                return todos
            },

            groups(){
                const groups = []
                for (var i in this.task.groups) {
                    var group = {}
                    group["id"] = this.task.groups[i].id;
                    group["name"] = this.task.groups[i].name;
                    groups.push(group);
                }
                return groups
            }
        }
    }
</script>