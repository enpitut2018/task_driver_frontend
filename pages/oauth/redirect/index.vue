<template>
  <p>Twitterへリダイレクトしています</p>
</template>

<script>
    import gql from 'graphql-tag'
    // import moment from '~/plugins/moment'

    const getURLmutation = gql`
      mutation{
        createRedirecturlMutation{
          url
        }
      }`

    export default {
        middleware: [
            'auth',
        ],
        data: () => ({
            task: {}
        }),

        mounted: function(){
          this.$apollo.mutate({
              mutation: getURLmutation
          }).then(res => {
              // console.log(this.task);
              window.location.href = this.data.createRedirecturlMutation.url
          }).catch(err => {
              console.log(err);
          });
        }
    }
</script>