<template>
  <div class="modal-window">
  <ModalWindow @onClickOverlay="$emit('close')">
    <NewGroupForm :title=title :newGroup=newGroup :groups=groups></NewGroupForm>
    <NewTaskButton :button=button @send="send"></NewTaskButton>
  </ModalWindow>
</div>
</template>

<script>
  import ModalWindow from '~/components/organisms/ModalWindow.vue'
  import NewGroupForm from '~/components/molecules/NewGroupForm.vue'
  import NewTaskButton from '~/components/atoms/NewTaskButton.vue'

	export default {
		components: {
			ModalWindow,
            NewGroupForm,
            NewTaskButton
    },
    
      props: ['newGroup', 'groups', 'title', 'button'],
      methods: {
        send(){
          this.$emit('close');
          this.$emit('send');
        }
      }
    }
</script>
