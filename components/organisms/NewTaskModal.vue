<template>
  <div class="modal-window">
  <ModalWindow @onClickOverlay="$emit('close')">
    <NewTaskForm :title=title :newTask=newTask :groups=groups></NewTaskForm>
    <NewTaskButton :button=button @send="send"></NewTaskButton>
  </ModalWindow>
</div>
</template>

<script>
  import ModalWindow from '~/components/organisms/ModalWindow.vue'
  import NewTaskForm from '~/components/molecules/NewTaskForm.vue'
  import NewTaskButton from '~/components/atoms/NewTaskButton.vue'

	export default {
		components: {
			ModalWindow,
      NewTaskForm,
      NewTaskButton
    },
      props: ['newTask', 'groups', 'title', 'button'],
      methods: {
        send(){
          this.$emit('close');
          this.$emit('send');
        }
      }
    }
</script>
