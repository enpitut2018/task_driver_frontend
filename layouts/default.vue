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
    import Header from '~/components/molecules/Header.vue'
    import Footer from '~/components/molecules/Footer.vue'

    export default {
        components: {
            Header,
            Footer
        },
        head: {
            script: [
                {src: 'sw.plugin.js'}
            ]
  	    },
    }
</script>
