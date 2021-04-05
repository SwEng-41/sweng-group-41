<template>
    <section>
        <div class="section-inner">
            <div class="cancellation-box">
                <span style="text-align: center; font-size: 18px; color: #243b55"> Your transaction has been cancelled. </span>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Cancellation",
}
</script>

<style scoped>
.section-inner {
    padding: 80px 20% 80px 20%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.cancellation-box {
  display: inline-flex;
  justify-content: center;
  padding: 20px;
  border: solid 2px #243b55;
  background-color: white;
  border-radius: 15px;
  margin: 8px;
}
</style>
