<template>
    <div>
    <Header/>
    <ModalWindow/>
    <ModalWindowButton/>
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
    import ModalWindow from '~/components/organisms/ModalWindow.vue'
    import ModalWindowButton from '~/components/atoms/ModalWindowButton.vue'
    export default {
        components: {
            Header,
            ModalWindow,
            ModalWindowButton
        }
    }
</script>