<template>
  <div>
    <HeaderUnauthenticated />
    <article>
      <div class="container">
        <nuxt/>
      </div>
    </article>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
    .container {
        width: 1000px;
        margin: auto;
        min-height: 70vh;
    }
</style>

<script>
    import HeaderUnauthenticated from '~/components/molecules/HeaderUnauthenticated.vue'
    import Footer from '~/components/molecules/Footer.vue'
    
    export default {
        components: {
            HeaderUnauthenticated,
            Footer
        }
    }
</script>