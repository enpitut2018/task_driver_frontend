<template>
	<div class="form-inline" id="chat">
		<p>{{sendData}}</p>
		<form v-on:submit.prevent="addTask">
			タスク名:<input type="text" name="" v-model="sendData.name">
			<br>
			メモ:<textarea v-model="sendData.note" value=""></textarea>
			<br>
			締め切り:<input type="date" v-model="sendData.deadline_date" >
			<input type="time" v-model="sendData.deadline_time">
			<br>
			重要度:
			<select v-model="sendData.importance">
				<option value=1>☆</option>
				<option value=2>☆☆</option>
				<option value=3>☆☆☆</option>
				<option value=4>☆☆☆☆☆</option>
				<option value=5>☆☆☆☆☆</option>
			</select>
			<br>

			進みぐあい:
			<select v-model="sendData.status">
				<option value=1>TODO(まだ)</option>
				<option value=2>DOING(いまやっている)</option>
				<option value=3>DONE(おわった)</option>
			</select>

			<!-- グループ　ユーザーが持っているグループを参照できるようにしたい: -->
			<!-- 現在決め撃ち　-->
			グループ:
			<select v-model="sendData.groupId">
				<option value=1>公務員試験</option>
				<option value=2>国語の勉強</option>
				<option value=3>英語の勉強</option>
			</select>
			<button type="submit" name="button" class="btn btn-primary col-sm-3">作成</button>
		</form>
	</div>
</template>

<script>
import gql from 'graphql-tag'

const createTaskMutation = gql`
	mutation ($name: String!, $deadline: String!, $importance: Int!, $note: String!, $status: Int!, $groupId: ID!, $userId: ID!) {
		createTask(name: $name, deadline: $deadline, importance: $importance, note: $note, status: $status, groupId: $groupId, userId: $userId) {
			task {
				name
				deadline
				importance
				note
				status
				groupId
				userId
			}
			errors 
		}
	}`

export default {
	middleware: [
        'auth',
	],

	props: ["sendData"],
	
	methods: {
		addTask(){
			this.$apollo.mutate({
				mutation: createTaskMutation,
				variables: {
					name: this.sendData.name,
					deadline: this.sendData.deadline_date  + " " + this.sendData.deadline_time + ":00",
					// deadlineのフォーマット ->  "2018-12-12 14:51:02",
					importance: Number(this.sendData.importance),
					note: this.sendData.note,
					groupId: Number(this.sendData.groupId),
					status: Number(this.sendData.status),
					userId: this.$auth.user.id
				},
			}).then(res => {
				console.log(res);
				// this.task.clap = res.data.createClap.task.clap;
				
				this.sendData.name =  "",
                this.sendData.deadline_date = "",
                this.sendData.deadline_time = "",
				this.sendData.importance =  1,
				this.sendData.note =  "",
				this.sendData.group_id =  "",
				this.sendData.status = 1 
				
			}).catch(err => {
				console.log(err);
			});
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
