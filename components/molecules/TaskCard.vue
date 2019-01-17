<template>
	<div class="card">
		<div class="cardHeader">
			<h3>
				<nuxt-link :to="{ name: 'userid-groupid-taskid', params: { userid: task.group.userId, groupid: task.group.id, taskid: task.id }}" class="cardLink">
					{{task.name}}
				</nuxt-link>
				<span class="stars" v-for="n in task.importance" :key="n">★</span>
			</h3>
		</div>

		<div class="cardBody">
			{{deadline(task.deadline)}}まで
			<div class="tags">
				<TaskCardTag v-for="group in task.group.ancestorAndSelfGroups" :key="group.id" :group="group"/>
			</div>
		</div>

		<Button/>
	</div>
</template>

<style lang="scss" scoped>
	.card {
		margin: 16px 12px;
		padding: 12px 30px 18px 30px;
		border-radius: 3px;
		border: 1px solid $borderColor;
		background-color: $cardBackgroundColor;
		.cardHeader {
			font-size: 18px;
			margin: 8px 0;
			.cardLink {
				color: $textColor;
				@include HoverLine();
			}
			.stars {
				font-size: 60%;
				margin-left: 5px;
				color: $starColor;
			}
		}
		.tags {
			width: 100%;
			margin: 8px 0;
			display: inline-flex;
			justify-content: flex-end;
		}
	}
</style>

<script>
	import TaskCardTag from '~/components/atoms/TaskCardTag.vue'
	import Button from '~/components/atoms/TaskCardButton.vue'
	import moment from '~/plugins/moment'

	export default {

		methods: {
			deadline (deadline) {
				return moment(deadline).format("YY/MM/DD hh:mm:ss");
			},			
		},
		
		components: {
			TaskCardTag,
			Button
		},
		props: ['task']
	}
</script>