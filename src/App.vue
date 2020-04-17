<template lang="pug">
  <div class="hello">
  a(href="http://www.baidu.com") 百2度
  div {{browser}}
  <h1>{{ msg }}</h1>
  <button type="button" @click="reverseAppName">reverse</button>
  <h2>Essential Links</h2>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Base} from "./three/Base";
    import {Detector} from "./util/Detector";
    import {BrowserUtil} from "./util/BrowserUtil";

    interface Data {
        welcomeMsg: string,
        appName: string,
        browser:string
    }
    //Returned expression type   is not assignable to type Data
    export default Vue.extend({
        name:"app",
        data (): Data {
            return {
                welcomeMsg: 'Welcome to Your',
                appName: 'Vue.js App',
                browser:""
            } as Data;
        },

        computed: {
            msg (): string {
                return this.welcomeMsg + ' ' + this.appName
            }
        },

        methods: {
            reverseAppName (): void {
                this.browser = JSON.stringify(BrowserUtil.getBrowserInfo());
                this.appName = this.appName.split('').reverse().join('')
            }
        }
    })
</script>

<style>
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

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
