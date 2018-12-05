<template>
  <div>
    <div v-if="isAuthenticated">
      <h1>Hi, {{ me.email }}!</h1>
      id: {{ me.id }}, name: {{ me.username }}
      you're the member of this system since {{ joinedDate }}
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import moment from '~/plugins/moment'

  export default {
    middleware: [
      'auth',
    ],

    data: () => ({
      me: {}
    }),

    apollo: {
      me: {
        query: gql`
        query {
          me {
            created_at
            email
            id
            updated_at
            username
          }
        }`,
      },
    },

    methods: {
      async logout() {
        try {
          await this.$auth.logout();
        } catch (e) {
          this.error = true;
        }
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
        let dateRes = this.me.created_at
        return moment(dateRes, "YYYY-MM-DD HH:mm:ss Z").format("YYYY年M月D日H時m分")
      }
    },
  };
</script>