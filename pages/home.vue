<template>
    <div>
        <div v-if="isAuthenticated">
            <TaskBoard :tasks= this.todo ></TaskBoard>
            <!-- <TaskBoard :tasks= this.doing :status="DOING"></TaskBoard>         -->
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag'
    import moment from '~/plugins/moment'
    import TaskBoard from '~/components/organisms/TaskBoard.vue'

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

    export default {
        middleware: [
            'auth',
        ],
        data: () => ({
            task: {}
        }),

        components: 
        {
            TaskBoard
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