<template>
	<div class="card">
		<h1>メールアドレスの認証</h1>
		<p>ようこそ、Folivoraへ<br>まずは、あなたのユーザー名を設定しましょう！</p>
		<form @submit.prevent="authenticate">
			<div class="formContent">
				<span>ユーザー名</span>
				<input type="text" v-model="confirmation.username"/>
			</div>
			<button class="loginButton" type="submit">認証する</button>
		</form>
		<p>{{message}}</p>
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
		p {
			width: 100%;
			letter-spacing: .1em;
			text-align: left;
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
			confirmation: { 'confirmation_token': '', 'username': ''},
			message: ""
        }),
        
		methods: {
			async authenticate () {
				this.message = "メールアドレスの認証を行っています。\nしばらくお待ち下さい..."
                this.confirmation.confirmation_token = this.$route.query.confirmation_token;
				this.$store.dispatch('auth/confirm', this.confirmation).then(() => {
					this.message = "メールアドレスが認証されました。\nログインすることができます。"
				// }).catch(() =>{
				// 	console.log("bad");
				// 	this.message = "アカウントを登録することができません。"
				});
			},
		},
		layout: 'unauthenticated',
	}
</script>