<template>
	<div class="form-inline" id="chat">
		<p>{{sendData}}</p>
		<form v-on:submit.prevent="addTask">
			タスク名:<input type="text" name="" v-model="sendData.name">
			メモ:<textarea v-model="sendData.note" value=""></textarea>
			<button type="submit" name="button" class="btn btn-primary col-sm-3">作成</button>
		</form>
	</div>
</template>

<script>
export default {
	props: ["sendData"],

	methods: {
		addTask(){
				//Please Add Function 
				
				this.sendData.name =  "",
				this.sendData.deadline =  "",
				this.sendData.importance =  "",
				this.sendData.note =  "",
				this.sendData.parent_id =  "",
				this.sendData.status = 1
		}
	}
}
</script>



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
