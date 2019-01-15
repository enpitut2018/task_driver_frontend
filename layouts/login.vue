<template>
    <div>
    <Header/>
    <article>
        <nuxt/>
    </article>
    <Footer/>
  </div>
</template>

<script>
    import Header from '~/components/molecules/LoginHeader.vue'
    import Footer from '~/components/molecules/Footer.vue'

    export default {
        components: {
            Header,
            Footer
        }
    }
</script>
