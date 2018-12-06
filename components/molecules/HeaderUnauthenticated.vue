<template>
	<header>
		<div class="container">
			<div class="headerLogo">
				<a href="/" class="homeLink">Folivora</a>
			</div>
			<nav class="headerNav">
				<ul>
	                <li><a href="/login"><button class="loginButton">ログイン</button></a></li>
	                <li><a href="#"><button class="registerButton">ユーザ登録</button></a></li>
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
							margin: 0 3px;
							border: none;
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