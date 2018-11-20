<template>
  <div>
    <HeaderUnLoggedIn/>
    <article>
      <div class="container">
        <nuxt/>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
    .container {
        width: 1000px;
        margin: auto;
    }
</style>

<script>
    import HeaderUnLoggedIn from '~/components/organisms/HeaderUnLoggedIn.vue'
    export default {
        components: {
            HeaderUnLoggedIn
        }
    }
</script>