import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { undoRedoPlugin } from '../store/undo-redo';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataSelect: [],
    counter: 0,
    onLoading: false,
    onError: false,
    values: {},
    selected: [],
  },
  mutations: {
    setData(state, data) {
      state.dataSelect = data;
    },

    updateValues(state, value) {
      let arr = []
      state.values[typeof value[0]] = value;
      for (let key in state.values) {
        state.values[key].forEach((element) => {
          arr.push(element);
        });
      }
      state.selected = arr;
    },

    resetState(state) {
      state.values = {};
    }
  },
  actions: {
    loadData(context) {
      this.state.onLoading = true;
      this.state.onError = false;
      let timer = setInterval(() => this.state.counter++, 1);
      return axios
        .get('https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json')
        .then((response) => {
          context.commit('setData', response.data.testArr);
          this.state.onLoading = false;
          clearInterval(timer);
        })
        .catch(() => {
          this.state.onLoading = false;
          this.state.onError = true;
        });
    },
  },

  getters: {
    parsedData: (state) => {
      const flattened = [];
      function flatten(arr) {
        for (let item of arr) {
          if (Array.isArray(item)) {
            console.log(item)
            flatten(item);
          } else {
            flattened.push(item);
          }
        }
      }
      flatten(state.dataSelect);
      const strings = [];
      const numbers = [];
      const objects = [];
      for (let item of flattened) {
        if (item !== null) {
          switch (typeof item) {
            case 'string': strings.push(item);
              break;
            case 'number': numbers.push(item);
              break;
            case 'object': if (Object.keys(item).length !== 0) {
              objects.push(item);
            }
          }
        }

      }
      return [strings, numbers, objects];
    },
  },

  plugins: [undoRedoPlugin],
})
