<template>
  <div>
    <HeaderUnauthenticated />
    <article>
        <nuxt/>
    </article>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
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