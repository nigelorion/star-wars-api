<template>
  <div class="main">
    <form>
      <input type="text" name="" value="" v-model="userInput">

      <button v-on:click.prevent="searchCall()">search</button>
      <button type="button" v-on:click="randomSearch()">random</button>

    </form>
    <div v-if="oops">

      <p>oops! try a different search</p>

    </div>
    <div v-if="resultsState">
      <!-- <img v-if="loading" src="https://i.imgur.com/BDwzPBF.gif" alt=""> -->
      <h1>{{result.name}}</h1>
      <p>birth year: <b>{{result.birth_year}}</b></p>
      <p>eye color: <b>{{result.eye_color}}</b></p>
      <!-- <p>films: <b>{{result.films}}</b></p> -->
      <p>gender: <b>{{result.gender}}</b></p>
      <p>hair color: <b>{{result.hair_color}}</b></p>
      <p>height: <b>{{result.height}}</b></p>
      <p>homeworld: <b>{{planetData.name}}</b></p>
      <p>mass: <b>{{result.mass}}</b></p>
      <p>skin color: <b>{{result.skin_color}}</b></p>
      <p>species: <b>{{speciesData.name}}</b></p>
      <p>language: <b>{{speciesData.language}}</b></p>

      <!-- <p>{{shipsData.name}}</p>
      <p>{{shipsData.manufacturer}}</p> -->
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      result: {},
      randomNum: 1,
      userInput: 'Luke Skywalker',
      resultsState: true,
      oops: false,
      type: 'people',
      peopleShips: '',
      shipsData: '',
      loading: false,
      speciesURL: '',
      speciesData: '',
      planetURL: '',
      planetData: ''
    }
  },
  mounted () {
    // this.randomGen()
    this.searchCall()
  },
  methods: {
    searchCall: function () {
      // this.loading = true
      this.loading = true
      axios.get('https://swapi.co/api/' + this.type + '/?search=' + this.userInput).then(response => {
        // this.peopleShips = response.data.results[0].starships[0]
        this.result = response.data.results[0]
        console.log(this.result)
        if (this.result == null) {
          this.oops = true
          this.resultsState = false
        } else {
          this.resultsState = true
          this.oops = false
          this.speciesURL = this.result.species[0]
          this.speciesSearch()
          this.planetURL = this.result.homeworld
          this.planetSearch()
        }
        this.loading = false
      }).catch(e => {
        console.log(e)
      })
      // this.loading = false
    },
    randomSearch: function () {
      this.randomGen()
      axios.get('https://swapi.co/api/people/' + this.randomNum).then(response => {
        console.log(response.data)
      }).catch(e => {
        console.log(e)
      })
    },
    ships: function () {
      axios.get(this.peopleShips).then(response => {
        console.log(response.data)
        this.shipsData = response.data
      }).catch(e => {
        console.log(e)
      })
    },
    speciesSearch: function () {
      axios.get(this.speciesURL).then(response => {
        console.log(response.data)
        this.speciesData = response.data
      }).catch(e => {
        console.log(e)
      })
    },
    planetSearch: function () {
      axios.get(this.planetURL).then(response => {
        console.log(response.data)
        this.planetData = response.data
      }).catch(e => {
        console.log(e)
      })
    },
    randomGen: function () {
      this.randomNum = Math.floor(Math.random() * 87)
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}

.main {
  background-color: rgba(177, 177, 177, 0.63);
  height: 50%;
  width: 50%;
}
</style>
