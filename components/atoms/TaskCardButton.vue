<template>
	<button v-on:click="startTask();" class="start">始める</button>
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
	methods: {
		startTask(){
			this.url = "/" + this.task.group.userId + "/" + this.task.group.id + "/" + this.task.id + "?fiveminutes=true"
			this.$router.push(this.url)
		}
	},
	props: ['task']
}
</script>