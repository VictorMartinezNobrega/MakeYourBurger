<template>
  <div>
    <div id="nav">
      <router-link id="logo-url" to="/">        <!--Propriedade "to" diz para onde vai levar-->
        <img id="logo" :src="logo" :alt="alt">  
      </router-link>

      <p>Modo noturno</p>
      <input type="checkbox" hidden="hidden" id="username"  :checked="(mode === 'dark')? 'checked' : false" @change="$emit('toggle')">

      <label class="switch" for="username"></label>

      <router-link to="/">Fazer Pedido</router-link>
      <router-link to="/pedidos">Pedidos</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['mode'],
  name: "Navbar",
  props: ["logo", "alt"]
}
</script>

<style scoped>
  #nav {
    background-color: #222;
    border-bottom: 4px solid #111;
    padding: 15px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  #nav #logo-url {
    margin: auto;
    margin-left: 0;
  }
  #logo {
    width: 40px;
    height: 40px;
  }
  #nav a {
    color: #fcba03;
    text-decoration: none;
    margin: 12px;
    transition: .5s;
  }
  #nav a:hover {
    color: #FFF;
  }
  .switch {
    display: inline-block;
    position: relative;
    width: 50px;
    height: 25px;
    border-radius: 20px;
    background: #dfd9ea;
    transition: background 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    vertical-align: middle;
    cursor: pointer;
    margin: 12px;
  }
  .switch::before {
      content: '';
      position: absolute;
      top: 1px;
      left: 2px;
      width: 22px;
      height: 22px;
      background: #fafafa;
      border-radius: 50%;
      transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .switch:active::before {
      box-shadow: 0 2px 8px rgba(0,0,0,0.28), 0 0 0 20px rgba(128,128,128,0.1);
  }
  input:checked + .switch {
      background: #fcba03;
  }
  input:checked + .switch::before {
      left: 27px;
      background: #fff;
  }
  input:checked + .switch:active::before {
      box-shadow: 0 2px 8px rgba(0,0,0,0.28), 0 0 0 20px rgba(0,150,136,0.2);
  }
  p {
    color: #fcba03;
  }
</style>