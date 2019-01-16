<template>
	<div class="taskCreateform" id="task">
		<h1>{{title}}</h1>
		<form v-on:submit.prevent="addGroup">
			<div class="formContent">
				<span>グループ名</span>
				<input type="text" name="name" v-model="newGroup.name"/>
			</div>

			<div class="formContent">
				<span>締め切り</span>
				<datetime v-model="newGroup.deadline" type="datetime"></datetime>
			</div>

			<div class="formContent">
				<span>重要度</span>
				<select v-model="newGroup.importance" name="importance">
					<option value=1>★</option>
					<option value=2>★★</option>
					<option value=3>★★★</option>
					<option value=4>★★★★</option>
					<option value=5>★★★★★</option>
				</select>
			</div>

			<div class="formContent">
				<span>グループ</span>
				<select v-model="newGroup.parentId">
					<option v-for="group in groups" :key="group.id" :value="group.id">{{group.name}}</option>
				</select>
			</div>

			<div name="formContent">
				<span>公開/非公開設定</span>
					<select v-model="newGroup.publicity">
						<option value=1>公開</option>
						<option value=0>非公開</option>
					</select>
			</div>
		</form>
	</div>
</template>

<style lang="scss" scoped>
form {
	padding: 5px 0;
	.formContent {
		margin: 20px auto;
		width: 75%;
		span {
			font-weight: 400;
			font-size: 80%;
		}
		input, select {
			width: 100%;
			box-sizing: border-box;
			height: 30px;
			margin: 10px 0;
			font-size: 15px;
			border: 1px solid #bbb;
			border-radius: 3px;
			padding: 2px 8px;
			display: block;
		}
		textarea {
			width: 100%;
			box-sizing: border-box;
			height: 70px;
			margin: 10px 0;
			font-size: 14px;
			border: 1px solid #bbb;
			border-radius: 3px;
			padding: 2px 8px;
			display: block;
			resize: none;
		}
	}
}
</style>

<script>
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

export default {
	props: ["newGroup", "groups", "title"],
	components: {
		datetime: Datetime,
	}
}
</script>