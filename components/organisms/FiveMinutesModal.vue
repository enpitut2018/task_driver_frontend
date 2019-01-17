<template>
  <div class="modal-window">
  <ModalWindow @onClickOverlay="$emit('close')">
  <div id="timer">
    <div class="timer">
      <div class="time">
          <p>とりあえず5分、{{taskname}}をやっていこう！</p>
          {{ formatTime }}
      </div>
      <button v-on:click="start" v-if="!timerOn">はじめる</button>
      <button v-on:click="stop" v-if="timerOn">やめる</button>
    </div>
  </div>
  </ModalWindow>
</div>
</template>

<script>
  import ModalWindow from '~/components/organisms/ModalWindow.vue'
  import NewTaskForm from '~/components/molecules/NewTaskForm.vue'
  import NewTaskButton from '~/components/atoms/NewTaskButton.vue'

    export default {
        name: 'timer',
        data() {
            return {
                min: 5,
                sec: 0,
                timerOn: false,
                timerObj: null,
            }
        },
        components: {
          ModalWindow,
          NewTaskForm,
          NewTaskButton
        },
        props: ['sendData', 'taskname'],

        methods: {
            count: function() {
                if (this.sec <= 0 && this.min >= 1) {
                    this.min --;
                    this.sec = 59;
                } else if(this.sec <= 0 && this.min <= 0) {
                    this.complete();
                    this.formatTime = "もうちょっと頑張ってみよう！"
                } else {
                    this.sec --;
                }
            },

            start: function() {
                let self = this;
                this.timerObj = setInterval(function() {self.count()}, 1000)
                this.timerOn = true; //timerがOFFであることを状態として保持
            },

            stop: function() {
                clearInterval(this.timerObj);
                this.timerOn = false; //timerがOFFであることを状態として保持
            },
            complete: function() {
                clearInterval(this.timerObj)
            }
        },
        mounted: {
            fire(){
                start();
                console.log("start");
            }
        },
        
        computed: {
            formatTime: function() {
            let timeStrings = [
                this.min.toString(),
                this.sec.toString()
            ].map(function(str) {
                if (str.length < 2) {
                return "0" + str
                } else {
                return str
                }
            })
            return timeStrings[0] + ":" + timeStrings[1]
            }
        }
}
</script>

<style scoped>
#timer {
  display: flex;
  align-items: center;
  justify-content: center;
}
p{
    font-size: 30px;
}
.time {
  font-size: 100px;
  text-align: center;
}
</style>
