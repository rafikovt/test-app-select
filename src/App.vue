<template>
  <div id="app">
    <h1 v-if="$store.state.onLoading">Загрузка</h1>
    <h1 v-else-if="$store.state.onError" class="danger">Ошибка соединения, попробуйте позже</h1>
    <h2>Время загрузки {{$store.state.counter}} мс</h2>
    <div class="container" :key="refreshToken">
      <Mselect v-for="(select, index) in selectData" :key="index" :options="select"    />
      <List :values="values" />
    </div> 
    
    <button @click.prevent="undo">Назад</button>
    <button @click.prevent="redo">Вперед</button>
    <button @click.prevent="resetState">Сброс</button>
  </div>
</template>


<script>

import List from '@/components/List';
import Mselect from '@/components/Mselect';
import {undoRedoHistory} from './store/undo-redo';


export default {
 components: {
    Mselect,
    List,
  },

  computed: {
    selectData() {
      return this.$store.getters.parsedData;
    },

    values: {
      get() {
        return this.$store.state.values;
      },

      set(value) {
        this.$store.commit('updateValues', value);
      }
    }
  },

  data() {
    return {
      onLoading: this.$store.state.onLoading,
      onError: this.$store.state.onError,
      refreshToken: 1,
    }
  },

  methods: {
    resetState() {
      this.refreshToken++
      this.$store.commit('resetState')
      undoRedoHistory.clearHistory()
    },

    undo() {
      undoRedoHistory.undo();
    },

    redo() {
      undoRedoHistory.redo();
    },
  },

  mounted() {
    this.$store.dispatch('loadData')
  }
}
</script>




<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
ul {
  list-style: none;
}
.danger {
  color: red;
}
.container {
  display: flex;
  max-width: 1260px;
  margin: 0 auto;
}

button {
  
}
</style>
