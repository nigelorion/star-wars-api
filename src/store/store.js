import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    planetData: {},
    shipData: {},
    peopleData: {},
    userInput: '',
    testingData: 'data is working!'
  },
  mutations: {
    update (planet) {
      this.planetData = planet
      console.log(planet)
    }
  }
})
