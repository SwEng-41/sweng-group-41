<template>
    <section>
        <div class="section-inner">
            <div class="success-box">
                <span style="text-align: center; font-size: 18px; color: #243b55"> Success! </span>
            </div>
            <div class="success-box">
                <span style="text-align: center; font-size: 14px; color: #243b55"> Your account has been successfully renewed! If you have any questions, please email us at:  </span>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Success",
}
</script>

<style scoped>
.section-inner {
    padding: 80px 20% 80px 20%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.success-box {
  display: inline-flex;
  justify-content: center;
  padding: 20px;
  border: solid 2px #243b55;
  background-color: white;
  border-radius: 15px;
  margin: 8px;
}
</style>
