<template>
    <div class="container">
        <div class="modal-window">
            <div class="icon_circle"  @click="openModal">
                <div class="circle_inner">
                    <i class="fas fa-plus"></i>
                </div>
            </div>
            <NewGroupModal :newGroup="newGroup" :groups="user.groups" :title="'新規グループの追加'" :button="'追加'" @close="closeModal" @send="addGroup" v-if="modal"/>
        </div>

        <div id="tab">
            <ul class="tabMenu">
                <li @click="isSelect('1')" v-bind:class="{'active': isActive === '1'}" >
                    <h2>
                        自分のグループ
		        	    <span class="taskCount">{{user.groups.length}}</span>
		            </h2>
                </li>
                <li @click="isSelect('2')" v-bind:class="{'active': isActive === '2'}" >
                    <h2>
                        みんなのグループ
		        	    <span class="taskCount">{{publicgroup.length}}</span>
		            </h2>
                </li>
            </ul>

            <div class="tabContents">
                <div v-show="isActive === '1'">
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

                <div v-show="isActive === '2'">
                    <p>こんな感じ</p>
                    <div v-for="pgroup in publicgroup" :key="pgroup.users.id">
                        <div class="card">
                            <h2>
                                <nuxt-link :to="{ name: 'userid-groupid', params: { userid: pgroup.users.id, groupid: pgroup.groups.id }}">{{pgroup.groups.name}}</nuxt-link>
                                <span class="star" v-for="n in pgroup.groups.importance" :key="n">★</span>
                                <p><nuxt-link :to="{ name: 'userid', params: { userid: pgroup.users.id,}}">{{pgroup.users.username}}</nuxt-link></p>
                            </h2>
                            <div class="tags">
                                <TaskCardTag v-for="group_tag in pgroup.groups.ancestorGroups" :key="group_tag.id" :group="group_tag"/>
                            </div>
                            <button @click="fork">このグループをフォークする</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 1000px;
    margin: auto;
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

// $green: #007db9;
$white: #fff;
#tab {
    width: 100%;
    margin: 40px auto;
    .tabMenu {
        display: flex;
        li {
            list-style: none;
            text-align:center;
            width: 100%;
            padding: 10px 20px;
            color: $white;
            border-right: 1px solid $white;
            background-color: #9CC5E6;
            cursor: pointer;
            border-radius: 5px;
            &:last-child {
                border-right: none;
            }
            &.active {
                background-color: #006495;
            }
        }
    }
    .tabContents {
        width: 100%;
        // position: relative;
        background-color: #fff;
        // margin: 13px 20px;
        padding: 20px;
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
        .board {
            width: 50%;
            background-color: $boardBackgroundColor;
            margin: 20px 8px;
            border-radius: 3px;
            border: 1px solid $boardBorderColor;
            padding-bottom: 35px;
        }
    }
    .taskCount {
        color: $white;
        font-weight: 600;
        background-color: $boardCountShadow;
        border-radius: 50px 50px 50px 50px / 50px 50px 50px 50px;
        font-size: 14px;
        padding: 2px 14px;
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
    import getPublicGroupQuery from '~/apollo/queries/get_public_groups_query.gql'
    

    import createGroupMutation from '~/apollo/queries/create_group_mutation.gql'
    import forkGroupMutation from '~/apollo/queries/fork_group_mutation.gql'

    import NewGroupModal from '~/components/organisms/NewGroupModal.vue'

    const getGroupsQuery = gql`
                    query($id: ID!){
                        user(id: $id){
                            username
                            id
                            groups {
                                id
                                name
                                importance
                                deadline
                                public
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
                user: {
                    groups:[],
                    
                },
                publicgroup: {
                    groups: [],
                    users: []
                },
                activities: [{
                    contributions: [],
                    tasks: [],
                }],
                isActive: '1',
                newGroup: {},
                modal: false,
                groups: []
            }
        },

        mounted: function(){
            this.$apollo.query({
                query: getPublicGroupQuery,
                variables: {
                    id: 1
                    // id: this.$store.state.auth.user.id,
                },
                }).then(res => {
                    this.publicgroup = res.data.publicgroup;

                }).catch(err => {
                    console.log(err);
                });

            this.$apollo.query({
                query: getGroupsQuery,
                variables: {
                    id: 1
                    // id: this.$store.state.auth.user.id,
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
            NewGroupModal
        },

        methods: {
            isSelect: function (num) {
                this.isActive = num;
            },

            openModal() {
                this.modal = true
            },

            closeModal() {
                this.modal = false
            },

            fork(){
                this.$apollo.query({
                    query: forkGroupMutation,
                    variables: {
                        groupId: 1
                        // id: this.$store.state.auth.user.id,
                    },
                }).then(res => {
                    this.groups = this.groups.concat(res.data.forkGroup.groups);
                    this.publicgroup = res.data.publicgroup;

                }).catch(err => {
                    console.log(err);
                });
            },

            addGroup(){
                console.log(this.newGroup);
                let group = this.newGroup;
                let deadline = moment(group.deadline);

                this.$apollo.mutate({
                    mutation: createGroupMutation,
                    variables: {
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
                    this.groups.push(res.data.createGroup.group);
                    this.newGroup = {};

                }).catch(err => {
                    console.log(err);
                });
            }
        },
        computed: {

        }
    }
</script>