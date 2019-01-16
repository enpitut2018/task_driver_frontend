<template>
  <div>
    <SignupForm />
  </div>
</template>

<script>
  import SignupForm from '~/components/molecules/SignupForm.vue'
  
  export default {
    components: {
      SignupForm
    },

    layout: 'unauthenticated',
  };
</script>