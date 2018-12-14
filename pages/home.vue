<template>
    <div>
        <div v-if="isAuthenticated">
            <TaskBoard :tasks= this.todo :status="TODO"></TaskBoard>
            <!-- <TaskBoard :tasks= this.doing :status="DOING"></TaskBoard>         -->
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag'
    import moment from '~/plugins/moment'
    import TaskBoard from '~/components/organisms/TaskBoard.vue'

    export default {
        middleware: [
            'auth',
        ],
        data: () => ({
            user: {}
        }),

        components: 
        {
            TaskBoard
        },
        apollo: {
            // Query with parameters
            user: {
            // gql query
                query: gql`
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
                    }`,
                // ($id: Int!)
                // Static parameters
                variables: {
                    id: 79
                },
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
                let dateRes = this.user.created_at
                return moment(dateRes, "YYYY-MM-DD HH:mm:ss Z").format("YYYY年M月D日H時m分")
            },

            todo(){
                var toString = Object.prototype.toString
                const todos = []
                for (var i in this.user.groups) {
                    for (var n in this.user.groups[i].tasks){
                        var todo = {}
                        todo["group"] = this.user.groups[i].name;
                        todo["name"] = this.user.groups[i].tasks[n].name;
                        todo["id"] = this.user.groups[i].tasks[n].id;

                        if (this.user.groups[i].tasks[n].status == 0){
                            todos.push(todo);
                        }
                    }
                }
                return todos
            },

            doing(){
                // var toString = Object.prototype.toString
                const todos = []
                for (var i in this.user.groups) {
                    for (var n in this.user.groups[i].tasks){
                        var todo = {}
                        todo["group"] = this.user.groups[i].name;
                        todo["name"] = this.user.groups[i].tasks[n].name;
                        todo["id"] = this.user.groups[i].tasks[n].id;

                        if (this.user.groups[i].tasks[n].status == 0){
                            todos.push(todo);
                        }
                    }
                }
                return todos
            }
        },
    };
</script>