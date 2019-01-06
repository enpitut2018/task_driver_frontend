<template>
    <div>
        <h1>{{user.username}}</h1>

        <ActivityGraph :userid="Number(userid)" />

        <div v-for="group in user.groups" :key="group.id">
            <div class="card">
                <h2>
                    <nuxt-link :to="{ name: 'userid-groupid', params: { userid: user.id, groupid: group.id }}">{{group.name}}</nuxt-link>
                    <span class="star" v-for="n in group.importance" :key="n">★</span>
                </h2>
                <div class="tags">
                    <TaskCardTag v-for="group_tag in group.ancestorGroups" :key="group_tag.id" :group="group_tag"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h1 {
    margin: 25px 0;
}
.card {
    position: relative;
    background-color: #fff;
    margin: 13px 20px;
    padding: 12px 35px;
    border-radius: 5px;
    border: 1px solid #ddd;
    h2 {
        a {
            color: #000;
            text-decoration: none;
            font-size: 20px;
        }
        .star {
            font-size: 12px;
            margin-left: 1px;
            color: #ffc100;
        }
    }
    .tags {
        margin: 8px 0;
    }
}
</style>

<script>
    import gql from 'graphql-tag'
    import moment from '~/plugins/moment'
    import UserInfo from '~/components/atoms/UserInfo.vue'
    import TaskCardTag from '~/components/atoms/TaskCardTag.vue'
    import ActivityGraph from '~/components/molecules/ActivityGraph.vue'

    import getActivitiesQuery from '~/apollo/queries/get_activities_query.gql'

    const getGroupsQuery = gql`
                    query($id: ID!){
                        user(id: $id){
                            username
                            id
                            groups {
                                id
                                name
                                importance
                                ancestorGroups {
                                    id
                                    name
                                    userId
                                }
                            }
                        }
                    }`
    
    export default {
        data() {
            return {
                userid: this.$route.params.userid,
                user: {
                    groups:[],
                },
                activities: [{
                                    contributions: [],
                                    tasks: [],
                                }],
            }
        },

        mounted: function(){
            this.$apollo.query({
                query: getGroupsQuery,
                variables: {
                    id: this.$route.params.userid,
                },
            }).then(res => {
                this.user = res.data.user;
			}).catch(err => {
				console.log(err);
			});
        },

        components: {
            UserInfo,
            TaskCardTag,
            ActivityGraph,
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
            // group(){
            //     var toString = Object.prototype.toString
            //     const groups = []
            //     // todos.push(toString.call(this.group.groups));
            //     // todos.push(this.group.groups.length);

            //     for (var i in this.group.groups) {
            //         var group = {}
            //         group["group_id"] = this.group.groups[i].id;
            //         group["group_name"] = this.group.groups[i].name;
            //     }
            //     return groups
            // },
        },
    };
</script>