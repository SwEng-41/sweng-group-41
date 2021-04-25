<script>
export default {
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close');
    },
    confirm() {
      this.$emit('confirm');
    }
  },
  props: {
    title: String,
    body: String,
    confirmation: String,
    confirmText: {
      type: String,
      default: "Confirm"
    },
    closeText: {
      type: String,
      default: "Close"
    }
  }
}
;
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <div class="box">
          <header class="modal-header" id="modalTitle">
            <slot name="header">
              <h3>{{ title }}</h3>
            </slot>
          </header>

          <section class="modal-body" id="modalDescription">
            <slot name="body">
              {{ body }}
            </slot>
          </section>

          <footer class="modal-footer">
            <slot name="footer">
              <button v-if=confirmation @click="confirm();">
                <div class="button">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  {{ confirmText }}
                </div>
              </button>
              <button @click="close();">
                <div class="button">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  {{ closeText }}
                </div>
              </button>
            </slot>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #81a1c1;
  border-radius: 10px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #d08770;
  justify-content: space-around;
  margin: 0 0 30px;
  padding: 0;
  text-align: center;
  font-size: 1.5em;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  margin: 10px;
  padding-bottom: 30px;
  color: white;
  text-align: center;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
</style>
