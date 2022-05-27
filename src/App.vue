<template>
  <div class="organizacao">
    <div class="box borda-fora">
      <Tarefas />
    </div>
  </div>
</template>

<script>
  import Tarefas from "./components/Tarefas.vue";

  export default {
    name: "App",
    data() {
      return {};
    },
    components: {
      Tarefas,
    },
  };
</script>

<style>
  .organizacao {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(335deg, rgba(2, 0, 36, 1) 0%, rgba(1, 39, 141, 1) 61%, rgba(0, 212, 255, 1) 100%);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .box {
    position: relative;
    width: 450px;
    max-height: 450px;
    background: #fff;
  }

  body {
    margin: 0px;
  }

  .borda-fora {
    border-radius: 13px;
  }
</style>
