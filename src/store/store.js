import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    planetData: {},
    testingData: 'data is working!'
  },
  mutations: {
    update (planet) {
      this.planetData = planet
      console.log(planet)
    }
  }
})
