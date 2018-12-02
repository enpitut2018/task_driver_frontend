<template>
  <div>
    <div v-if="isAuthenticated">
      <h1>Hi, {{ user.email }}!</h1>
      id: {{ user.id }}, name: {{ user.username }}
      you're the member of this system since {{ joinedDate }}
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import moment from '~/plugins/moment'

  export default {
    data: () => ({
      user: {}
    }),

    apollo: {
      user: {
        query: gql`
        query {
          user {
            created_at
            email
            id
            updated_at
            username
          }
        }`,
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
      }
    },
  };
</script>