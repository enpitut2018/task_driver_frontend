<template>
  <div>
      <!-- {{getParams}} -->
      <p>Twitterアカウントを登録しています。</p>
  </div>
</template>

<script>

const sendTokenMutation = gql`
mutation($oauth_token: String!, $oauth_verifier: String!){
  createOauthMutation(oauthToken: $oauth_token, oauthVerifier: $oauth_verifier){
    oauth
  }
}
`

export default {
    middleware: [
        'auth',
    ],

    data: () => ({
        params: {}
    }),

    mounted: function(){
        this.$apollo.mutate({
            mutation: sendTokenMutation,
            variables: {
                oauth_token: this.$route.query.oauth_token,
                oauth_verifier: this.$route.query.oauth_verifier
            },

        }).then(res => {
            this.params = res.data;
            console.log(this.params);
            
        }).catch(err => {
            console.log(err);
        });
    },
    computed: {
        // getParams(){
        //     var access_token = ""
        //     var access_token_secret = ""
        //     var text = this.$route.query;
        //     return text;
        // }
    }
}
</script>