<template>
	<section class="list">
		<h1>タスクへの取り組み</h1>
		<div class="cards" v-for= "contribution in contributions" :key= "contribution.id">
			<div class="card_wrap" :class="{ active: contribution.status }">
				<i class="far fa-dot-circle"></i>
				<ContributionCard :contribution="contribution"/>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.list {
	width: 95%;
	margin: 0 2.5% 30px 2.5%;
	h1 {
		margin: 15px 0;
	}
	.cards {
		position: relative;
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
		width: 97.5%;
		margin: 0 0 0 2.5%;
		&:before {
			background-color: #ddd;
			bottom: 0;
			content: "";
			display: block;
			left: 0px;
			position: absolute;
			top: 0;
			width: 4px;
			z-index: -1;
		}
		.card_wrap {
			position: relative;
			i {
				font-size: 35px;
				position: absolute;
				top: 35%;
				left: -16px;
				color: #ddd;
			}
			&.active {
				i {
					color: rgb(224, 0, 130);
				}
			}
		}
	}
}
</style>

<script>
	import ContributionCard from '~/components/molecules/ContributionCard.vue'
	
	export default {
		components: {
			ContributionCard
		},
		props: ['contributions']
	}
</script>