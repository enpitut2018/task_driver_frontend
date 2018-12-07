<template>
  <div class="modal-window">
    <p>ボタンを押すとモーダルウィンドウが開きます</p>
    <button @click="openModal">Open</button>

    <!-- コンポーネント MyModal -->
    <ModalWindow @close="closeModal" v-if="modal">
      <!-- default スロットコンテンツ -->
      <p>hogehoge</p>
      <!-- /default -->
      <!-- footer スロットコンテンツ -->
      <!-- /footer -->
    </ModalWindow>
  </div>
</template>

<script>
import ModalPage from '~/layouts/modal_page.vue'
import ModalWindow from '~/components/organisms/ModalWindow.vue'
export default {
  layout: ModalPage,
  components: { ModalWindow },
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
