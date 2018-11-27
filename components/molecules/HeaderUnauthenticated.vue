<template>
	<header>
		<div class="headerLogo">
			<a href="/" class="homeLink">Folivora</a>
		</div>
		<nav class="headerNav">
			<ul>
                <li><button class="loginButton" @click="authenticate">ログイン</button></li>
                <li><a href="#"><button class="registerButton">ユーザ登録</button></a></li>
			</ul>
		</nav>
	</header>
</template>

<style lang="scss" scoped>
	button {
		font-weight: 500;
		font-size: 14px;
		letter-spacing: .1em;
		padding: 8px 20px;
		border-radius: 6px;
		border: none;
    	&.loginButton {
        	@include buttonReflectWithBorder($red, $white);
    	}
    	&.registerButton {
        	@include buttonReflectWithBorder($startButtonColor, $white);
    	}
	}
	header {
		background-color: $red;
		padding: 12px 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.homeLink {
			color: $white;
			font-weight: 800;
			font-size: 30px;
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
				}
			}
		}
	}
</style>

<script>
export default {
  methods: {
  	async authenticate () {
  		try {
  			await this.$auth.loginWith('local', {
  				data: {
  					user: {
  						email: 's1611442@u.tsukuba.ac.jp',
  						password: 'password'
  					}
  				}
  			});
  			this.$router.push('/home');
  		} catch (e) {
  			this.error = true;
  		}
  	}
  },
};
</script>