<template>
  <div class="modal-window">
  <!-- コンポーネント MyModal -->
  <ModalWindow>
    <!-- default スロットコンテンツ -->
    <TaskNewForm/>
    <TaskNewButton/>
    <button @click="$emit('close')">Close</button>
    <!-- /default -->
    <!-- footer スロットコンテンツ -->
    <!-- /footer -->
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
    methods:{
      closeModal() {
        this.$emit('close')
      },
      document.getElementById("overlay").onclick = closeModal()
    }
	}
</script>
