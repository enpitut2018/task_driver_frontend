<template>
    <div>
    <Header/>
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
    import Header from '~/components/molecules/Header.vue'
    export default {
        components: {
            Header
        }
    }
</script>
