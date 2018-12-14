<template>
    <div>
      <div v-if="isAuthenticated">
        <TaskBoard :tasks= this.todo ></TaskBoard>
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
            id: 1
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
          // var todos = []
          // var todos = this.user.filter(function(item, index){
          //   if (item.name == "jiro") return true;
          // });
          // todos.push(this.user.groups);
          // todos.push(toString.call(this.user.groups));
          // todos.push((this.user.groups).length);
          for (var i in this.user.groups) {
            // todos.push(toString.call(this.user.groups[i].tasks));
            // todos.push(this.user.groups[i].tasks);
            // todos.push(toString.call(this.user.groups[i].tasks));
            for (var n in this.user.groups[i].tasks){
              var todo = {}
              todo["group"] = this.user.groups[i].name
              todo["name"] = this.user.groups[i].tasks[n].name
              todo["id"] = this.user.groups[i].tasks[n].id

              if (this.user.groups[i].tasks[n].status == 0){
                todos.push(todo)
                // todos.push(this.user.groups[i].tasks[n]);
              }
            }
          }
          return todos
        }
      },
  };
</script>