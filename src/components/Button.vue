<template>
    <div class="button">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {{ label }}
    </div>
</template>

<script>
 export default {
    name: 'Button',

    props: {
        label: {
            type: String,
            default: ''
        }
    }
 }
</script>

<style>

 .button {
  position: relative;
  display: inline-block;
  padding: 10px;
  color: #05c9d3;
  font-size: 16px;
  text-decoration: none;
  font-variant: small-caps;
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
  transition: 0.5s;
  margin: 20px;
}

.button:hover {
  color: #fff;
}

.button span {
  position: absolute;
  display: block;
}

.button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #05c9d3);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}

.button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #05c9d3);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}

.button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #05c9d3);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}

.button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #05c9d3);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}

</style>
