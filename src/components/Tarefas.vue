<template>
  <div class="alinhamento espacamento-input container">
    <div>
      <div class="espaco-baixo">
        <div class="input-group">
          <input v-model="tarefa" maxlength="25" type="text" class="form-control" placeholder="Insira a tarefa" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="adicionarTarefa()"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>

      <div class="input-group">
        <textarea v-model="descricao" placeholder="Descrição da tarefa" class="form-control" aria-label="With textarea"></textarea>
      </div>

      <div class="lista-tarefas-content">
        <div class="input-group-text estilo-tarefa" v-for="(value, index) in listaTarefas" :key="index">
          <div class="col-1">
            <input class="form-check-input" type="checkbox" v-model="value.feito" @click="updateStatusTarefa(value.id, value.feito)" id="flexCheckDefault" />
          </div>
          <div class="col-9">
            <label class="form-check-label" for="flexCheckDefault">
              <s v-if="value.feito"> ID {{ value.id }} - {{ value.titulo_tarefa.substring(0,24)}} </s>
              <span v-else>
                {{ value.id }} - {{ value.titulo_tarefa.substring(0,24)}}
              </span>
            </label>
          </div>
          <div class="col-1 alinhamento-esquerda">
            <button type="button" @click="editarTarefa(value.id)" class="config-botao"><i class="fa-solid fa-pen"></i></button>
          </div>
          <div class="col-1">
            <button @click="excluirTarefa(value.id)" class="botao2"><i class="fa-solid fa-trash"></i></button>
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
              let lista = [];
              response.data.forEach((value) => {
                value.feito = value.feito == 1 || value.feito == "1" ? true : false;
                lista.push(value);
              });
              that.listaTarefas = lista;
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
          return false;
        } else if (this.descricao == "" || this.descricao == null) {
          alert("Ainda restam campos a serem preenchidos.");
          return false;
        } else if ((this.descricao && this.tarefa == "") || (this.descricao && this.tarefa == null)) {
          alert("Ainda restam campos a serem preenchidos.");
          return false;
        }

        this.salvarTarefaApi();

        console.log(this.listaTarefas);
      },

      salvarTarefaApi() {
        let titulo = this.tarefa;
        let descricao = this.descricao;
        let that = this;

        axios
          .post("http://localhost:8000/tarefa/adicionar", {
            titulo_tarefa: titulo,
            descricao: descricao,
          })
          .then(function (response) {
            that.buscarTodasTarefas();
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            alert("Algo deu errado ao tentar salvar a sua tarefa!");
          });
      },

      editarTarefa(id) {
        let titulo = prompt("Insira a nova tarefa");
        let descricao = prompt("Insira a nova descrição");
        let that = this;

        axios
          .put(`http://localhost:8000/tarefa/${id}/atualizar`, {
            titulo_tarefa: titulo,
            descricao: descricao,
          })
          .then(function (response) {
            that.buscarTodasTarefas();
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            alert("Algo deu errado ao tentar atualizar a sua tarefa!");
          });
      },

      excluirTarefa(id) {
        let titulo = this.tarefa;
        let descricao = this.descricao;
        let that = this;

        axios
          .delete(`http://localhost:8000/tarefa/${id}/deletar`)
          .then(function (response) {
            that.buscarTodasTarefas();
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            alert("Algo deu errado ao tentar salvar a sua tarefa!");
          });
      },

      updateStatusTarefa(id, feito) {
        let that = this;

        axios
          .put(`http://localhost:8000/tarefa/${id}/atualizar/status`, {
            feito: !feito,
          })
          .then(function (response) {
            that.buscarTodasTarefas();
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            alert("Algo deu errado ao tentar atualizar a sua tarefa!");
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

  .alinhamento-esquerda {
    text-align: left !important;
  }

  .botao-apagar {
    padding: 10px 0px;
    text-align: end;
  }

  .estilo-tarefa {
    width: 100%;
    margin-bottom: 10px;
    background: white;
    border-color: #f1f1f1;
    text-align: left;
  }

  .config-botao {
    height: auto;
    width: auto;
    position: static;
    border: none;
    color: #1e7ad6;
    background-color: white;
  }

  .config-botao:hover {
    color: #c20e0e;
  }

  .botao2 {
    border: none;
    color: red;
    margin-left: 5px;
    background-color: white;
  }
</style>
