<template>
	<span><a v-bind:href="groupUrl" class="tag">{{group}}</a></span>
</template>

<style lang="scss" scoped>
	.tag {
		// @include buttonReflect($tagColor, $white);
		color: $white;
		background-color: $tagColor;
		// @include HoverFlash(.7, 1);
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
	props: ['group', 'groupUrl']
}
</script>
