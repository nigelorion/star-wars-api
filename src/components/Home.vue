<template>
  <div class="main">
    <form>
      <input type="text" name="" value="" v-model="userInput">

      <button v-on:click.prevent="searchCall()">test-api</button>
    </form>
    <div v-if="resultsState">
      <img v-if="loading" src="https://i.imgur.com/BuWTrly.gif" alt="">
      <h1>{{result.name}}</h1>
      <h2>{{result.height}}</h2>
      <h3>{{result.gender}}</h3>
      <p>{{shipsData.name}}</p>
      <p>{{shipsData.manufacturer}}</p>

    </div>
    <div v-if="oops">

      <p>oops! try a different search</p>

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
      userInput: 'luke',
      resultsState: true,
      oops: false,
      type: 'people',
      peopleShips: '',
      shipsData: '',
      loading: false
    }
  },
  mounted () {
    // this.randomGen()
    this.searchCall()
  },
  methods: {
    searchCall: function () {
      this.loading = true
      axios.get('https://swapi.co/api/' + this.type + '/?search=' + this.userInput).then(response => {
        this.loading = false
        console.log(this.userInput)
        console.log(response.data)
        console.log(response.data.results[0])
        this.peopleShips = response.data.results[0].starships[0]
        this.result = response.data.results[0]
        if (this.result == null) {
          this.oops = true
          this.resultsState = false
        } else {
          this.resultsState = true
          this.oops = false
        }
        if (this.peopleShips == null) {
          this.peopleShips = 'nothing'
        } else {
          this.searchShip()
        }
      }).catch(e => {
        console.log(e)
      })
      // this.loading = false
    },
    searchShip: function () {
      axios.get(this.peopleShips).then(response => {
        console.log(response.data)
        this.shipsData = response.data
      }).catch(e => {
        console.log(e)
      })
    },
    randomGen: function () {
      this.randomNum = Math.floor(Math.random() * 10)
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
