<template>
  <div>
    <div v-if="isAuthenticated">
      <h1>Hi, {{ user.email }}!</h1>
      id: {{ user.id }}, name: {{ user.username }}
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

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
    },
  };
</script>