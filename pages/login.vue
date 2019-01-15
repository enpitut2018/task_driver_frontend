<template>
  <div>
    <LoginForm />
  </div>
</template>

<script>
  import LoginForm from '~/components/molecules/LoginForm.vue'
  
  export default {
    components: {
      LoginForm
    },

    layout: 'login',
  };
</script>