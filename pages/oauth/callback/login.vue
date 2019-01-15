<template>
  <div>
      <p>Twitterでログインしています。</p>
      	<form @submit.prevent="authenticate">
			<button class="loginButton" type="submit">Twitterでログイン</button>
		</form>
  </div>
  
</template>

<script>
	export default {
		data: () => ({
			user: { 'oauth_token': '', 'oauth_verifier': '' },
			message: ""
		}),

		methods: {
			async authenticate () {
                this.user.oauth_token = this.$route.query.oauth_token
                this.user.oauth_verifier = this.$route.query.oauth_verifier
				
				this.$store.dispatch('auth/loginwithtwitter', this.user).then(() => {
					if (this.$store.state.auth.isAuthenticated == true) {
						console.log(this.$store.state.auth.token);
						this.$apolloHelpers.onLogin(this.$store.state.auth.token)
						this.$router.push('/home')
					}
					else{
						this.message = "入力されたメールアドレスやパスワードが正しくありません。\n確認してからやりなおしてください。"
					}
				});
			},
			// async loginwithtwitter () {
			// 	this.$store.dispatch('auth/redirecttwitter', this.user).then(() => {
			// 		console.log("ま:" + this.$store.state.auth.url);
			// 		window.location.href = this.$store.state.auth.url
			// 	});
			// }
		},

		computed: {
			loginInfo () {
				return { 'user': this.user }
			}
		},
	}
</script>