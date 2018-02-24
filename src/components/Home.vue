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
      <p>birth year: <b>{{peopleData.birth_year}}</b></p>
      <p>eye color: <b>{{peopleData.eye_color}}</b></p>
      <!-- <p>films: <b>{{peopleData.films}}</b></p> -->
      <p>gender: <b>{{peopleData.gender}}</b></p>
      <p>hair color: <b>{{peopleData.hair_color}}</b></p>
      <p>height: <b>{{peopleData.height}}</b></p>
      <p>homeworld: <router-link to="/planet">{{planetData.name}}</router-link>
      <p>mass: <b>{{peopleData.mass}}</b></p>
      <p>skin color: <b>{{peopleData.skin_color}}</b></p>
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
  computed: {
    peopleData () {
      return this.$store.state.peopleData
    },
    planetData () {
      return this.$store.state.planetData
    }
  },
  data () {
    return {
      result: '',
      randomNum: 1,
      userInput: '',
      resultsState: true,
      oops: false,
      type: 'people',
      peopleShips: '',
      shipsData: '',
      loading: false,
      speciesURL: '',
      speciesData: '',
      planetURL: ''
      // planetData: ''
    }
  },
  // mounted () {
  //   // this.randomGen()
  //   this.searchCall()
  // },
  methods: {
    searchCall: function () {
      // this.loading = true
      this.loading = true
      axios.get('https://swapi.co/api/' + this.type + '/?search=' + this.userInput).then(response => {
        // this.peopleShips = response.data.results[0].starships[0]

        this.result = response.data.results[0]
        this.userInput = this.result.name
        this.$store.state.peopleData = this.result
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
        if (this.result == null) {
          this.oops = true
          this.resultsState = false
        } else {
          this.result = response.data
          this.speciesURL = this.result.species[0]
          this.speciesSearch()
          this.planetURL = this.result.homeworld
          this.planetSearch()
        }
      }).catch(e => {
        if (e) {
          this.oops = true
          this.resultsState = false
        }
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
        // this.$store.state.testingData = this.planetData
        this.$store.state.planetData = response.data
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

</style>
