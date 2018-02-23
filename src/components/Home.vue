<template>
  <div class="main">

    <button type="button" v-on:click="testCall()">test-api</button>

    <h1>{{ship.name}}</h1>

  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Star Wars!',
      ship: {},
      randomNum: 1
    }
  },
  mounted () {
    this.randomNum = Math.floor(Math.random() * 20)
  },
  methods: {
    testCall: function () {
      axios.get('https://swapi.co/api/starships/' + this.randomNum + '/').then(response => {
        console.log(response.data)
        this.ship = response.data
      }).catch(e => {
        console.log(e)
      })
    },
    randomGen: function () {
      this.randomNum = Math.floor(Math.random() * 20)
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
