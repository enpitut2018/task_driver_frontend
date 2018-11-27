<template>
	<header>
		<div class="headerLogo">
			<a href="/" class="homeLink">Folivora</a>
		</div>
		<nav class="headerNav">
			<ul>
                <li><button class="logoutButton" @click="logout">ログアウト</button></li>
			</ul>
		</nav>
	</header>
</template>

<style lang="scss" scoped>
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
					}
				}
			}
		}
	}
</style>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push('/unauthenticated');
      } catch (e) {
        this.error = true;
      }
    },
  }
};
</script>