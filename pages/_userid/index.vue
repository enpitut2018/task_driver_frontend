<template>
	<div>
		<h1 class="groupName">{{groupid}}</h1>
		<div class="boards">
			<TaskBoard/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.groupName {
		font-size: 35px;
		font-weight: 700;
		margin: 25px 0 10px 0;
	}
	.boards {
		width: 100%;
		display: flex;
	}
</style>

<script>
	import TaskBoard from '~/components/organisms/TaskBoard.vue'

	export default {
		data() {
			return {
				userid: this.$route.params.userid,
				groupid: this.$route.params.groupid
			}
		},
		components: {
			TaskBoard
		}
	}
</script>