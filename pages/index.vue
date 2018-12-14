<template>

  <div class="modal-window">
    <p>ボタンを押すとモーダルウィンドウが開きます</p>
    <button @click="openModal">Open</button>
    <TaskNewModal @close="closeModal" v-if="modal"/>
    <TaskInfoModal @close="closeModal" v-if="modal"/>
    <!-- コンポーネント MyModal -->
<!--    <ModalWindow @close="closeModal" v-if="modal">-->
      <!-- default スロットコンテンツ -->
      <!--<p>hogehoge</p>-->
      <!-- /default
      <footer>
      </footer>
    </ModalWindow>-->
  </div>
</template>

<script>


import TaskNewModal from '~/components/organisms/TaskNewModal.vue'
import TaskInfoModal from '~/components/organisms/TaskInfoModal.vue'
export default {

  components: { TaskNewModal },
  components: { TaskInfoModal },

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
