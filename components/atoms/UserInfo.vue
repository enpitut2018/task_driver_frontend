<template>
	<div class="user">
		<div class="user_avater"><i class="fas fa-user"></i></div>
		<nuxt-link :to="{ name : 'userid', params : { userid: user.username }}" class="user_name">{{ user.username }}</nuxt-link>
	</div>
</template>

<style lang="scss" scoped>
.user {
	display: flex;
	align-items: center;
	margin: 5px 0;
	.user_avater {
		width: 30px;
		height: 30px;
		background-color: #ddd;
		color: #999;
		border-radius: 15px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		i {
			display: block;
			font-size: 22px;
		}
	}
	.user_name {
		margin: 0 8px;
		color: #333;
		font-weight: 600;
		@include HoverLine(underline, none);
	}
}
</style>

<script>
	export default {
		props: ['user'],
	}
</script>