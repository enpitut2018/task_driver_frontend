<template>
	<button class="start">始める</button>
</template>

<script>
export default {
	methods: {
		addTask(){
			$this.emit();
		}
	}
}
</script>


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