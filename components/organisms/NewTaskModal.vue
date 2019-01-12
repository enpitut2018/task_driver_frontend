<template>
  <div class="modal-window">
  <ModalWindow @onClickOverlay="$emit('close')">
    <NewTaskForm :newTask=newTask :groups=groups></NewTaskForm>
    <NewTaskButton @send="send"></NewTaskButton>
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
      props: ['newTask', 'groups'],
      methods: {
        send(){
          this.$emit('close');
          this.$emit('send');
        }
      }
    }
</script>
