<template>                              <!--componente coringa que pode sair utilizado em varios outros componentes-->
  <div class="message-container">      <!--pois é só uma exibição de uma menssagem-->
      <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
    name: "Message",
    props: {
        msg: String
    }
}
</script>

<style scoped>
.message-container {
    color: #004085;
    background-color: #cce5ff;
    border: 2px solid #b8daff;
    border-radius: 5px;
    padding: 10px;
    max-width: 400px;
    margin: 30px auto;
}
</style>>