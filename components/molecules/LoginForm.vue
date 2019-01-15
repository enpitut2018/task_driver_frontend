<template>
	<div class="card">
		<h1>ログイン</h1>
		
		<form @submit.prevent="authenticate">
			<div class="formContent">
				<span>メールアドレス</span>
				<input type="text" v-model="user.email"/>
			</div>
			<div class="formContent">
				<span>パスワード</span>
				<input type="password" v-model="user.password"/>
			</div>
			<button class="loginButton" type="submit">ログイン</button>
		</form>
		<form @submit.prevent="loginwithtwitter">
			<button class="loginButton" type="submit">Twitterでログイン</button>
		</form>
		{{message}}
		<div class="passwordResetLink">
			<a href="/resetpassword">パスワードをお忘れの方はこちら &gt;</a>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.card {
		width: 30vw;
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
	export default {
		data: () => ({
			user: { 'email': '', 'password': '' },
			message: ""
		}),

		methods: {
			async authenticate () {
				this.$store.dispatch('auth/login', this.user).then(() => {
					if (this.$store.state.auth.isAuthenticated == true) {
						this.$apolloHelpers.onLogin(this.$store.state.auth.token)
						this.$router.push('/home')
					}
					else{
						this.message = "入力されたメールアドレスやパスワードが正しくありません。\n確認してからやりなおしてください。"
					}
				});
			},
			async loginwithtwitter () {
				this.$store.dispatch('auth/redirecttwitter', this.user).then(() => {
					console.log("ま:" + this.$store.state.auth.url);
					window.location.href = this.$store.state.auth.url
				});
			}
		},

		computed: {
			loginInfo () {
				return { 'user': this.user }
			}
		},
	}
</script>