<template>
    <div>  
        <div class="modal-window">
            <button @click="openModal">タスクの追加</button>
            <TaskNewModal :sendData= this.sendData @close="closeModal" v-if="modal"/>
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
                                }
                            }
                        }
                    }`
    
    // const createTaskQuery = gql`
    // `

    export default {
        middleware: [
            'auth',
        ],
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
                group_id: "",
                status: 0
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
            }
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
                        todo["group"] = this.task.groups[i].name;
                        todo["name"] = this.task.groups[i].tasks[n].name;
                        todo["id"] = this.task.groups[i].tasks[n].id;
                        
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
            }
        },
    };
</script>