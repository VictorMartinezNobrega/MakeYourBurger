<template>
  <div id="burger-table">
      <div>
          <div id="burger-table-heading">
              <div class="order-id">#:</div>
              <div>Cliente:</div>
              <div>Pão</div>
              <div>Carne:</div>
              <div>Opcionais:</div>
              <div>Ações:</div>
          </div>
      </div>
    <div id="burger-table-rows">
        <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
            <div class="order-number">{{burger.id}}</div>
            <div>{{burger.nome}}</div>
            <div>{{burger.pao}}</div>
            <div>{{burger.carne}}</div>
            <div>
                <ul>
                    <li  v-for="(opcional, index) in burger.opcionais" :key="index">
                        {{ opcional }}
                    </li>
                </ul>
            </div>
            <div>
                <select name="status" class="status" @change="updateBurger($event, burger.id)"><!-- quando houver uma mudança no select vai rodar a func-->
                    <option :value="s.tipo" v-for="s in status" :key="s.id" :selected="burger.status === s.tipo">
                        {{s.tipo}}
                    </option>
                </select>
                <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button> <!--pode passar esse burger.id pois esta em loop de burgers-->
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "Dashboard",
    data(){
        return{
            burgers: null,
            burger_id: null,
            status: []
        }
    },
    methods: {
        async getPedidos() {        //trazer os pedidos do back

            const req = await fetch("http://localhost:3000/burgers") //uma requisição que vai await(esperar) e dar um fetch(buscar) na url

            const data = await req.json() //transformar requisição em json

            this.burgers = data //dados que vieram estou transformando no burger que esta criado em data, ent troca o valor de null para oque veio do "servidor"
            
            //resgatar os status
            this.getStatus();

        },
        async getStatus() {
        
        const req = await fetch('http://localhost:3000/status')
        
        const data = await req.json()
        
        this.status = data

        },
        async deleteBurger(id){//recebe id para saber qual esta excluindo
          
           const req = await fetch(`http://localhost:3000/burgers/${id}`, { //estou passando um id por isso o ``
            method: "DELETE" //essa continuação é algo especifico do Json server
          })

          const res = await req.json()
          
          //msg

          this.getPedidos()

        },
        async updateBurger(event, id){
          
          const option = event.target.value //option recebe o botão que usuario clicou

          const dataJson = JSON.stringify({status: option})//colocando em string o json de status para poder atualizar no banco

          const req = await fetch(`http://localhost:3000/burgers/${id}`, { //acessa bd e atualiza o status dele com value da opcão escolhida
            method: "PATCH", //Patch é como update, mas so atualiza aquele que enviamos
            headers: { "Content-Type" : "application/json" },
            body: dataJson
          })

          const res = await req.json()

          console.log(res)

        }
    },
    mounted(){          //quando pedido for montado vai chamar getPedidos
        this.getPedidos()
    }
}
</script>

<style scoped>
  #burger-table {
    max-width: 1200px;
    margin: 0 auto;
  }
  #burger-table-heading,
  #burger-table-rows,
  .burger-table-row {
    display: flex;
    flex-wrap: wrap;
  }
  #burger-table-heading {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
  }
  .burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #CCC;
  }
  #burger-table-heading div,
  .burger-table-row div {
    width: 19%;
  }
  #burger-table-heading .order-id,
  .burger-table-row .order-number {
    width: 5%;
  }
  select {
    padding: 12px 6px;
    margin-right: 12px;
    width: 110px;
  }
  .delete-btn {
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }
  
  .delete-btn:hover {
    background-color: transparent;
    color: #222;
  }
</style>