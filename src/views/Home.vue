<template>
  <Banner/>
  <div class="main-container">
    <h1>Monte o seu burger:</h1>
   
    <BurgerForm />
  </div>
</template>

<script>
import Banner from "../components/Banner.vue"
import BurgerForm from "../components/BurgerForm.vue"

export default{
  props: ['mode'],
  name: "Home",
  components:{
    Banner,
    BurgerForm
  }
}
</script>
<style>
.dark h1{
  color: #E8E8E8;
}
</style>