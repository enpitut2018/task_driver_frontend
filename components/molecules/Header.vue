<template>
	<header v-if="isAuthenticated">
		<div class="container">
			<div class="headerLogo">
				<a href="/home" class="homeLink">Folivora</a>
			</div>
			<nav class="headerNav">
				<ul>
					<li>
						<a href="/groups">グループ</a>

	                <li>
	                	<button class="logoutButton" @click="logout">ログアウト</button>
	                </li>
				</ul>
			</nav>
		</div>
	</header>
	<header v-else>
		<div class="container">
			<div class="headerLogo">
				<a href="/" class="homeLink">Folivora</a>
			</div>
			<nav class="headerNav">
				<ul>
	                <li>
	                	<nuxt-link :to="{ name: 'login' }">
	                		<button class="loginButton">
	                			ログイン
	                		</button>
	                	</nuxt-link>
	                </li>
	                <li>
	                	<nuxt-link :to="{ name: 'signup' }">
	                		<button class="registerButton">
	                			ユーザ登録
	                		</button>
	                	</nuxt-link>
	                </li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<style lang="scss" scoped>
	header {
		background-color: $red;
		padding: 12px 30px;
		.container {
			width: 1000px;
			margin: auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.homeLink {
				color: $white;
				font-weight: 500;
				font-size: 35px;
				text-decoration: none;
			}
			.headerNav {
				ul {
					display: flex;
					list-style: none;
					li {
						a {
							color: $white;
							text-decoration: none;
							margin: 3px;
							font-size: 15px;
							font-weight: 600;
						}
						button {
							font-weight: 500;
							font-size: 14px;
							letter-spacing: .1em;
							padding: 8px 20px;
							border-radius: 6px;
							border: none;
							&.logoutButton {
								@include buttonReflectWithBorder($red, $white);
							}
							&.loginButton {
								@include buttonReflectWithBorder($red, $white);
							}
							&.registerButton {
								@include buttonReflectWithBorder($startButtonColor, $white);
							}
						}
					}
				}
			}
		}
	}
</style>

<script>
export default {
	methods: {
		async authenticate () {
			this.$store.dispatch('auth/logout').then(() => {
				if (!this.$store.state.auth.isAuthenticated) {
					this.$router.push('/')
				}
			});
		},
	},
	computed: {
		isAuthenticated() {
			return this.$store.state.auth.isAuthenticated
		}
	}
};
</script>