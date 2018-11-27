<template>
  <div>
    {{ isAuthenticated }}
    <div v-if="isAuthenticated">
      <h1>Hi, {{userInfo.email}}!</h1>
      <p>id: {{userInfo.id}}</p>
    </div>
  </div>
</template>

<script>
export default {
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
    }
  },
};
</script>