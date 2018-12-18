<template>
    <div>  
        <!-- <div class="modal-window">
            <button @click="openModal">タスクの追加</button>
            <TaskNewModal :sendData= this.sendData @close="closeModal" v-if="modal"/>
        </div> -->
        <div v-if="isAuthenticated">
            <ul>
                <li :groups= this.group v-for= "(group, index) in groups" :key= "index">
                    {{index}} - {{group.name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag'
    import moment from '~/plugins/moment'
    import TaskBoard from '~/components/organisms/TaskBoard.vue'
    import TaskNewModal from '~/components/organisms/TaskNewModal.vue'

    const getGroupsQuery = gql`
                    query($id: ID!){
                        user(id: $id)
                        {
                            groups{
                                id
                                name
                            }
                        }
                    }`
    
    export default {
        middleware: [
            'auth',
        ],
        data: () => ({
            group: {},
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
                query: getGroupsQuery,
                variables: {
                    id: this.$auth.user.id
                },
            }).then(res => {
				// console.log(res);
                this.group = res.data.user.groups;
                console.log(this.group);

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

            group(){
                var toString = Object.prototype.toString
                const groups = []
                // todos.push(toString.call(this.group.groups));
                // todos.push(this.group.groups.length);

                for (var i in this.group.groups) {
                    var group = {}
                    group["group_id"] = this.group.groups[i].id;
                    group["group_name"] = this.group.groups[i].name;
                }
                return groups
            },
        },
    };
</script>