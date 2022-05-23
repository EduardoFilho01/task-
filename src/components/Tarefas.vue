<template>
  <div class="alinhamento espacamento-input container">
    <div>
      <div class="espaco-baixo">
        <div class="input-group">
          <input v-model="tarefa" type="text" class="form-control" placeholder="Insira a tarefa" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="adicionarTarefa()"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>

      <div class="input-group">
        <textarea v-model="descricao" placeholder="Descrição da tarefa" class="form-control" aria-label="With textarea"></textarea>
      </div>

      <div class="lista-tarefas-content">
        <div class="input-group-text estilo-tarefa" v-for="(value, index) in listaTarefas" :key="index">
          <div class="form-check ">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label class="form-check-label " for="flexCheckDefault">
              ID
              {{ value.id}}
              -
              {{ value.titulo_tarefa}}
            </label>
             <button type="button" @click="editarTarefa(value.id)" class="config-botao "><i class="fa-solid fa-pen"></i></button>
            <button @click="excluirTarefa(value.id)" class="botao2 " ><i class="fa-solid fa-trash "></i></button>
          </div>
        </div>
      </div>

      <div class="botao-apagar">
        <!-- Button trigger modal -->
        
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Tarefas",
    data() {
      return {
        tarefa: null,
        descricao: null,
        listaTarefas: [],
      };
    },

    created() {
      this.buscarTodasTarefas();
    },

    methods: {
      buscarTodasTarefas() {
        let that = this;
        axios
          .get("http://localhost:8000/tarefa")
          .then(function (response) {
            if (response.data) {
              that.listaTarefas = response.data;
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      },

      adicionarTarefa() {
        if (this.tarefa == "" || this.tarefa == null) {
          alert("Ainda restam campos a serem preenchidos.");
          return false
        } else if (this.descricao == "" || this.descricao == null) {
          alert("Ainda restam campos a serem preenchidos.");
          return false
        } else if ((this.descricao && this.tarefa == "") || (this.descricao && this.tarefa == null)) {
          alert("Ainda restam campos a serem preenchidos.");
          return false
        }

        // this.listaTarefas.push({
        //   tarefa: this.tarefa,
        //});

        this.salvarTarefaApi()

        console.log(this.listaTarefas);
      },

      salvarTarefaApi(){

        let titulo = this.tarefa
        let descricao = this.descricao
        let that = this;

         axios
          .post("http://localhost:8000/tarefa/adicionar", {
            	titulo_tarefa: titulo,
              descricao: descricao
          })
          .then(function (response) {
              that.buscarTodasTarefas()
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            alert('Algo deu errado ao tentar salvar a sua tarefa!')
          });
      },

      editarTarefa(id) {

        let titulo = prompt('Insira a nova tarefa')
        let descricao = prompt('Insira a nova descrição')
        let that = this;

         axios
          .put(`http://localhost:8000/tarefa/${id}/atualizar`, {
            	titulo_tarefa: titulo,
              descricao: descricao
          })
          .then(function (response) {
              that.buscarTodasTarefas()
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            alert('Algo deu errado ao tentar atualizar a sua tarefa!')
          });

        alert("Tá pegando");
      },

      excluirTarefa(id) {

        
        let titulo = this.tarefa
        let descricao = this.descricao
        let that = this;

         axios
          .delete(`http://localhost:8000/tarefa/${id}/deletar`)
          .then(function (response) {
              that.buscarTodasTarefas()
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            alert('Algo deu errado ao tentar salvar a sua tarefa!')
          });

      },
    },
    mounted() {},
  };
</script>

<style scoped>
  .alinhamento {
    text-align: center;
  }

  .espacamento-input {
    padding-top: 18px;
  }

  .espaco-baixo {
    padding-bottom: 15px;
  }

  .espaco-lado {
    margin-left: 4px;
  }

  .lista-tarefas-content {
    margin: 10px 0px;
    height: 200px;
    overflow: auto;
  }

  .botao-apagar {
    padding: 10px 0px;
    text-align: end;
  }

  .estilo-tarefa {
    width: 100%;
    margin-bottom: 10px
  }

  .config-botao{
    height: auto;
    width: auto;
    margin-left: 220px;
    border: none;
    color: #1e7ad6;
  }

   .config-botao:hover{
     color: #c20e0e;
   }

.botao2{
  border: none;
    color: red;
    margin-left: 5px;
}
</style>
