<template>
	<section class="board">
		<!-- <h2 class="boardHead">TODO<span class="taskCount"></span></h2> -->
		<h2 class="boardHead">{{title}}</h2>
		<div class="cards" v-for= "task in tasks" :key= "task.id">
			<TaskCard v-bind:task="task" ></TaskCard>
		</div>
	</section>
</template>

<style lang="scss" scoped>
	.board {
		width: 50%;
		background-color: $boardBackgroundColor;
		margin: 20px 8px;
		border-radius: 3px;
		border: 1px solid $boardBorderColor;
		padding-bottom: 35px;
		.boardHead {
			margin: 0;
			background-color: $cardBackgroundColor;
			border-radius: 3px;
			padding: 13px 23px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.taskCount {
				color: $white;
				font-weight: 600;
				background-color: $boardCountShadow;
				border-radius: 50px 50px 50px 50px / 50px 50px 50px 50px;
				font-size: 14px;
				padding: 2px 14px;
			}
		}
	}
</style>

<script>
	import TaskCard from '~/components/molecules/TaskCard.vue'
	
	export default {
		components: {
			TaskCard
		},
		props: ['tasks', 'title']
	}
</script>