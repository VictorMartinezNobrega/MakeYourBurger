<template>
    <div>
        <Message :msg="msg" v-show="msg" />
        <div>
            <form id="burger-form" @submit="createBurger">
                <div class="input-container">
                    <label for="nome">Nome do cliente:</label>
                    <input type="text" name="nome" id="nome" v-model="nome" placeholder="Digite seu nome">
                </div>
                <div class="input-container">
                    <label for="pao">Escolha o pão:</label>
                    <select name="pao" id="pao" v-model="pao">
                        <option value="">Selecione seu pão</option>
                        <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
                          {{ pao.tipo }}     <!--v-for pega pao selecionado em paes-->
                        </option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="carne">Escolha a carne do seu Burger:</label>
                    <select name="carne" id="carne" v-model="carne">
                        <option value="">Selecione seu tipo de carne</option>
                        <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
                          {{ carne.tipo }}     <!--v-for pega pao selecionado em paes-->
                        </option>
                    </select>
                </div>
                <div id="opcionais-container" class="input-container">
                  <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
                  <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
                    <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo">
                    <span>{{ opcional.tipo }}</span>
                  </div>
                </div>
                <div class="input-container">
                    <input class="submit-btn" type="submit" value="Criar meu Burger!">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Message from "./Message.vue";

export default {
  props: ['mode'],
  name: "BurgerForm",

  data() {
    return{
      paes: null,       //<<< dados que vem do servidor
      carnes: null,    //<<< dados que vem do servidor
      opcionaisdata: null, //<<< dados que vem do servidor

      nome: null,       //<<<<dados que serão envidados
      pao: null,       //<<<<dados que serão envidados
      carne: null,       //<<<<dados que serão envidados
      opcionais: [],       //<<<<dados que serão envidados um array pois pode ser mais de 1

      status: "Solicitado",
      msg: null
    }
  },

  //Receber dados do bando de dados
  methods:{                             /*O async/await trabalha com o código baseado em Promises,
                                         porém esconde as promessas para que a leitura seja mais fluída
                                          e simples de entender.*/

      async getIngredientes(){                                                /*async, podemos utilizar a palavra-chave await antes de qualquer 
                                                                              expressão que retorne uma promessa. Dessa forma, a execução da função 
                                                                              externa (a função async) será pausada até que a Promise seja resolvida.
                                                                              */
                                                                              /*await recebe uma Promise e a transforma em um valor de retorno 
                                                                              (ou lança uma exceção em caso de erro). Quando utilizamos await, 
                                                                              o JavaScript vai aguardar até que a Promise finalize.  */                                                
      const req = await fetch('http://localhost:3000/ingredientes')          /* fetch provê ao navegador uma interface para a   
      //requesição que recebe await fetch com a url que da acesso no bd       execução de requisições HTTP através de Promises.*/ 
      const data = await req.json();

      this.paes = data.paes
      this.carnes = data.carnes
      this.opcionaisdata = data.opcionais

    },
    async createBurger(e) {       //Enviar dados para banco de dados

      e.preventDefault();     //cancelar auele event, "aquele f5 auto"

      const data = {
        nome: this.nome,      // this para acessar os dados no data la de cima
        carne: this.carne,
        pao: this.pao,
        opcionais: Array.from(this.opcionais), //esses dados vao para um array, por isso p Array.from
        status: "Solicitado"
      }

        const dataJson = JSON.stringify(data)  //O método JSON.stringify() converte valores em javascript para uma String JSON

        const req = await fetch("http://localhost:3000/burgers", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: dataJson
      });

        const res = await req.json();

        //colocar uma msg de sistema
        this.msg = `Pedido Nº ${res.id} realizado com sucesso`
        //limpar msg
        setTimeout(() => this.msg = "", 3000)
        //limpar campos
        this.nome = "";
        this.pao = "";
        this.carne = "";
        this.opcionais = []

    }
  },
  mounted(){
    this.getIngredientes() //quando inicializa esse componente ja mostra a func getIngredientes
  },
  components:{
    Message
  }
}
</script>

<style>
  #burger-form {
    max-width: 400px;
    margin: 0 auto;
  }
  .input-container {
    display: flex;
    flex-direction: column;   /*Forma colunas*/
    margin-bottom: 20px;
  }
  label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;;
    padding: 5px 10px;
    border-left: 4px solid #fcba03;
  }
  .dark label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #E8E8E8;;
    padding: 5px 10px;
    border-left: 4px solid #fcba03;
  }
  input, select {
    padding: 5px 10px;
    width: 300px;
  }
  #opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
  }
  #opcionais-title {
    width: 100%;
  }
  .checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
  }
  .checkbox-container span,
  .checkbox-container input {
    width: auto;                /*Ficam com a largura que eles tem, não com a que herdaram do CSS */
  }
  .checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
  }
  .submit-btn {
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
    border: 2px solid #fcba03;
  }
  .submit-btn:hover {
    background-color: transparent;
    color: #222;
  }
</style>