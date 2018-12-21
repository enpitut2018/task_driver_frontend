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
        data: () => ({
            params: {}
        }),
        mounted: function(){
          this.$apollo.mutate({
              mutation: getURLmutation
          }).then(res => {
              this.params = res.data;              
              console.log(this.params);
              window.location.href = this.params.createRedirecturlMutation.url
          }).catch(err => {
              console.log(err);
          });
        }
    }
</script>