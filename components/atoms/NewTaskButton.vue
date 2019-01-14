<template>
	<button class="start" @click="$emit('send')" >{{button}}</button>
</template>

<style lang="scss" scoped>
	button.start{
		@include buttonReflect($startButtonColor, $white);
	}
	button {
		font-weight: 500;
		font-size: 14px;
		letter-spacing: .1em;
		padding: 8px 20px;
		width: 100%;
		border-radius: 6px;
		border: none;
	}
</style>

<script>
	export default {
		props: ['tasks', 'button'],
	}
</script>