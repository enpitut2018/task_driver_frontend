<template>
  <div class="modal-window">
    <h1>{{sendData}}</h1>
  <ModalWindow @onClickOverlay="$emit('close')">
    <TaskNewForm :sendData = sendData :groups= groups></TaskNewForm>
    <TaskNewButton @send="send"></TaskNewButton>
  </ModalWindow>
</div>
</template>

<script>
  import ModalWindow from '~/components/organisms/ModalWindow.vue'
  import TaskNewForm from '~/components/atoms/TaskNewForm.vue'
  import TaskNewButton from '~/components/atoms/TaskNewButton.vue'

	export default {
		components: {
			ModalWindow,
      TaskNewForm,
      TaskNewButton
    },
      props: ['sendData', 'groups'],
      methods: {
        send(){
          this.$emit('send');
        }
      }
    }
</script>
