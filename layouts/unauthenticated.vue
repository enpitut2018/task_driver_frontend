<template>
  <div>
    <HeaderUnauthenticated/>
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
    import HeaderUnauthenticated from '~/components/molecules/HeaderUnauthenticated.vue'
    
    export default {
        components: {
            HeaderUnauthenticated
        }
    }
</script>