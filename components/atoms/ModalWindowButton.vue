<template>
  <div class="modal-window">
    <p>ボタンを押すとモーダルウィンドウが開きます</p>
    <button @click="openModal">Open</button>

    <!-- コンポーネント MyModal -->
    <ModalWindow @close="closeModal" v-if="modal">
      <!-- default スロットコンテンツ -->
      <p>Vue.js Modal Window!</p>
      <div><input v-model="message"></div>
      <!-- /default -->
      <!-- footer スロットコンテンツ -->
      <!-- /footer -->
    </ModalWindow>
  </div>
</template>
<script>
import ModalWindow from '~/components/organisms/ModalWindow.vue'
export default {
  components: { moda },
  data() {
    return {
      modal: false,
      message: ''
    }
  },
  methods: {
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    }
  }
}
</script>


