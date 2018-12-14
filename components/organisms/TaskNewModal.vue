<template>
  <div class="modal-window">
  <ModalWindow @onClickOverlay="$emit('close')">
    <TaskNewForm/>
    <TaskNewButton/>
    <Timer/>
    <!--<default>
    < /default>
    <footer>
    </footer>-->
  </ModalWindow>
</div>
</template>

<script>
  import ModalWindow from '~/components/organisms/ModalWindow.vue'
  import TaskNewForm from '~/components/atoms/TaskNewForm.vue'
  import TaskNewButton from '~/components/atoms/TaskNewButton.vue'
  import Timer from '~/components/molecules/Timer.vue'

	export default {
		components: {
			ModalWindow,
      TaskNewForm,
      TaskNewButton,
      Timer
		}
	}
</script>
