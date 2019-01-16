<template>
	<span @focus="openBalloon" v-on:mouseover="openBalloon" v-on:mouseleave="trigger" >
		<Ballon :group=group v-show="isFocused" />
		<nuxt-link :to="{ name: 'userid-groupid', params: { userid: group.userId, groupid: group.id }}" class="tag">{{group.name}}</nuxt-link>
	</span>
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
import Ballon from '~/components/atoms/Ballon.vue'
export default {
	data: () => ({
        isFocused : false
    }),
	
	methods: {
		openBalloon () {
			this.isFocused  = true
		},
		closeBalloon () {
			this.isFocused = false
		},
		trigger() {
			setTimeout(() => { this.isFocused = false }, 50)
		}
	},
	components: {
     	Ballon
    },
	props: ['group'],
}
</script>
