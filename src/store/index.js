import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    changes: [],
    timer: [0, 0, 0],
    fields: ['A', 'B', 'C'],
    signs: ['+', '-'],
    randomSign: ['+', '+', '+'],
    randomNumbers: []
  },
  mutations: {
    replaceNumbersArray (state) {
      // replace random A, B, C... numbers at time interval
      const A = Number((Math.random() + 1).toFixed(2)); // first number A
      const B = Number((Math.random() + 1).toFixed(2)); // first number B
      const C = Number((Math.random() + 1).toFixed(2)); // first number C
      state.randomNumbers.splice(0, 3, A, B, C);
      console.log(state.randomNumbers);
    }
  }
});

export default store;
