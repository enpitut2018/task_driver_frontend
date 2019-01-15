<template>
	<header>
		<div class="container">
			<div class="headerLogo">
				<a href="/" class="homeLink">Folivora</a>
			</div>
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
		}
	}
</style>