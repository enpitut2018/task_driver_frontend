<template>
  <div class="card">
      <h1>{{message}}</h1>
  </div>
</template>

<style lang="scss" scoped>
	.card {
		width: 40vw;
		margin: 90px auto;
		padding: 50px 60px;
		border-radius: 3px;
		border: 1px solid $borderColor;
		background-color: $cardBackgroundColor;
		h1 {
			width: 100%;
			letter-spacing: .1em;
			text-align: center;
		}
		form {
			padding: 15px 0 45px 0;
			border-bottom: 1px solid #bbb;
			.formContent {
				margin: 20px auto;
				width: 85%;
				span {
					font-weight: 400;
					font-size: 80%;
				}
				input {
					width: 100%;
					box-sizing: border-box;
					height: 40px;
					margin: 10px 0;
					font-size: 16px;
					border: none;
					border: 1px solid #bbb;
					border-radius: 3px;
					padding: 4px 8px;
					display: block;
				}
			}
			.loginButton {
				background-color: $startButtonColor;
				width: 70%;
				height: 40px;
				margin: auto;
				border-radius: 5px;
				font-size: 15px;
				font-weight: 600;
				letter-spacing: .2em;
				color: $white;
				padding: 5px 0;
				display: block;
				@include buttonReflect($startButtonColor, $white);
			}
		}
		.passwordResetLink {
			margin: 30px 0 0 0;
			text-align: center;
			a {
				@include HoverLine();
				color: #777;
			}
		}
	}
</style>

<script>
    import gql from 'graphql-tag'

    const sendTokenMutation = gql`
    mutation($oauth_token: String!, $oauth_verifier: String!){
        createOauthMutation(oauthToken: $oauth_token, oauthVerifier: $oauth_verifier){
            oauth
        }
    }
    `

    export default {
        data: () => ({
            params: {},
            message: "Twitterアカウントを登録しています。"
        }),

        mounted: function(){
            this.$apollo.mutate({
                mutation: sendTokenMutation,
                variables: {
                    oauth_token: this.$route.query.oauth_token,
                    oauth_verifier: this.$route.query.oauth_verifier
                },

            }).then(res => {
                this.message = "Twitterアカウントの連携が完了しました。"
                this.params = res.data;
                console.log(this.params);
                
                this.$router.push('/home');

            }).catch(err => {
                console.log(err);
            });
        }
    }
</script>