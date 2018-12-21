<template>
  <div class="modal-window">
    <h1>{{sendData}}</h1>
  <ModalWindow @onClickOverlay="$emit('close')">
    <GroupNewForm :sendData = sendData :groups= groups></GroupNewForm>
    <GroupNewButton @send="send"></GroupNewButton>
  </ModalWindow>
</div>
</template>

<script>
  import ModalWindow from '~/components/organisms/ModalWindow.vue'
  import GroupNewForm from '~/components/atoms/GroupNewForm.vue'
  import GroupNewButton from '~/components/atoms/GroupNewButton.vue'

	export default {
		components: {
			ModalWindow,
      GroupNewForm,
      GroupNewButton
    },
      props: ['sendData', 'groups'],
      methods: {
        send(){
          this.$emit('close');
          this.$emit('send');
        }
      }
    }
</script>
