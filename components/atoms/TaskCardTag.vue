<template>
	<span><nuxt-link :to="{ name: 'userid-groupid', params: { userid: group.userId, groupid: group.id }}" class="tag">{{group.name}}</nuxt-link></span>
</template>

<style lang="scss" scoped>
	.tag {
		color: $white;
		background-color: $tagColor;
		margin: 2px;
		padding: 2px 8px;
		border-radius: 5px;
		font-size: 75%;
		font-weight: 400;
		@include HoverLine(underline, none);
	}
</style>

<script>
export default {
	props: ['group'],
}
</script>
