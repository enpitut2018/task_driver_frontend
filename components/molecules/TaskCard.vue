<template>
	<div class="card">
		<a href="#">
			<div class="cardHeader">
				<h3>{{task.name}}</h3>
				<!-- <h3>{{task.name}}<span class="stars">★</span></h3> -->
			</div>
		</a>
		<div class="cardBody">
			<div class="tags">
				<Tag v-bind:group= "task.group" ></Tag>
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
		a {
			color: $textColor;
			text-decoration: none;
		}
		.cardHeader {
			@include HoverLine();
			font-size: 18px;
			margin: 8px 0;
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
	import Tag from '~/components/atoms/TaskCardTag.vue'
	import Button from '~/components/atoms/TaskCardButton.vue'

	export default {
		components: {
			Tag,
			Button
		},
		props: ['task']
	}
</script>