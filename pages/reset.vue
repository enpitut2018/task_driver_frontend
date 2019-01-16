<template>
	<div class="card">
		<h1>パスワードの再設定</h1>
		<p>パスワードを再設定しましょう。<br>新しいパスワードを入力してください。</p>
		{{message}}
		<form @submit.prevent="authenticate">
			<div class="formContent">
				<span>新しいパスワード</span>
				<input type="password" v-model="user.password"/>
			</div>
			<button class="loginButton" type="submit">新しいパスワードを設定する</button>
		</form> 
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
			user: { 'password': '', 'reset_password_token': ''},
			message: ""
        }),
        
		methods: {
			async authenticate () {
                this.user.reset_password_token = this.$route.query.reset_password_token;
				this.$store.dispatch('auth/reset', this.user).then(() => {
                    this.message = "パスワードを再設定しました。";
				});
			},
		},
		layout: 'unauthenticated',
	}
</script>