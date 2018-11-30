<template>
  <div>
    {{ user }}
    {{ isAuthenticated }}
    <div v-if="isAuthenticated">
      <h1>Hi, {{userInfo.email}}!</h1>
      <p>id: {{userInfo.id}}</p>
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
            groups {
              edges {
                node {
                  name
                  created_at
                  tasks {
                    edges {
                      node {
                        name
                        created_at
                        deadline
                        importance
                        note
                        priority
                        status
                        urgency
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
      }
    },
    methods: {
      async logout() {
        try {
          await this.$auth.logout();
        } catch (e) {
          this.error = true;
        }
      },
      async dumpToken() {
        await console.log(this.$apolloHelpers.getToken());
      },
    },
    computed: {
      userInfo () {
        return this.$auth.user
      },
      isAuthenticated () {
        return this.$auth.loggedIn
      }
    },

    mounted () {
      this.dumpToken();
    }
  };
</script>