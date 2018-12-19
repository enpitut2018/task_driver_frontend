<template>
	<div class="taskCreateform" id="task">
		<form v-on:submit.prevent="addTask">
			<ul>
				<div name="name">
					<li><label>タスク名</label></li>
					<li><input type="text" name="" v-model="sendData.name"></li>
				</div>

				<div name="datetime">
					<li><label>締め切り</label></li>
						<li><input type="date" v-model="sendData.deadline_date" >
						<input type="time" v-model="sendData.deadline_time"></li>
				</div>

				<div name="importance">
					<li><label>重要度</label></li>
						<li><select v-model="sendData.importance">
							<option value=1>☆</option>
							<option value=2>☆☆</option>
							<option value=3>☆☆☆</option>
							<option value=4>☆☆☆☆</option>
							<option value=5>☆☆☆☆☆</option>
						</select></li>
				</div>

				<div name="group">
					<li><label>グループ</label></li>
						<li><select v-model="sendData.groupId" >
							<option v-for= "group in groups" :key= "group.id" :value="group.id">{{group.name}}</option>
						</select></li>
					
				</div>

				<div name="note">
					<li><label>メモ</label></li>
					<li><textarea v-model="sendData.note" value=""></textarea></li>
				</div>
			</ul>

		</form>
	</div>
</template>

<script>
import gql from 'graphql-tag'
import moment from '~/plugins/moment'

export default {
	middleware: [
        'auth',
	],
	props: ["sendData", "groups"]
}
</script>

<style lang="scss" scoped>
	.input{
		border:0;
		padding:10px;
		font-size:1.3em;
		font-family:Arial, sans-serif;
		color:#aaa;
		border:solid 1px #ccc;
		margin:0 0 20px;
		width:300px;
	}
	ul li {
		list-style: none;
		label {
			margin-right: 10px;
			width:100px;
			float: left;
		}
	}

	ul {
		width: 500px;
		margin: 0 auto;
	}

	textarea {
		resize: none;
		width:300px;
		height:200px;
	}

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
