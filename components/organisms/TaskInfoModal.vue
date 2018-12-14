<template>
  <div class="modal-window">
  <ModalWindow @onClickOverlay="$emit('close')">
    <TaskInfo/>
    <!--<default>
    < /default>
    <footer>
    </footer>-->
  </ModalWindow>
</div>
</template>

<script>
  import ModalWindow from '~/components/organisms/ModalWindow.vue'
  import TaskInfo from '~/components/molecules/TaskInfo.vue'

	export default {
		components: {
			ModalWindow,
            TaskInfo
		}
	}
</script>
