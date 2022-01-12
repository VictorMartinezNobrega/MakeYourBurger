<template>
  <div class="app" :class="mode">
  <Navbar :logo="logo_src" :alt="app_name" :mode="mode" @toggle="toggle"/>
  <router-view/>  <!--Imprime as rotas aqui-->
  <button id="back-to-top" @click="up()">Voltar ao topo</button>
  <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default{
  data () {
    return{
      mode: 'light',
      logo_src: "/img/logo.png",
      app_name: "Make Your Burguer",
      btn: document.querySelector("#back-to-top")
    }
  },
  methods:{
    up() {
    window.scrollTo(0, 0)
    },
        toggle () {
      if (this.mode === "dark") {
        this.mode = "light"
      } else {
        this.mode = "dark"
      }
    }
  },
  components: {
    Navbar,
    Footer
  }
}
</script>


<style>
    * {
    font-family: Helvetica;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .main-container {
    margin: 50px;
    min-height: 250px;
  }
 h1 {
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
  }
  #back-to-top {
    position: fixed;
    bottom: 50px;
    right: 50px;
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #fcba03;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }
  .dark {
    background: #192734;
    color: #E8E8E8;
  }
</style>
