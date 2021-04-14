<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/team-generator">Team generator</router-link>
    <router-link to="/adv-team-generator">Advanced team generator</router-link>
    <router-link to="/indecision-fixer">Indecision Fixer</router-link>
    <router-link to="/edit/games">Games Editor</router-link>
    <router-link to="/insights">Insights</router-link>
  </div>
  <div id="main">
    <router-view />
  </div>
</template>

<script typescript>
import { useDefaultStore } from "@/store";

export default {
  setup() {
    const defaultStore = useDefaultStore();

    defaultStore.initialise();
  }
};
</script>

<style>
html,
body {
  margin: 0;
}

#app {
  font-family: "IBM Plex Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
}

#nav {
  border-right: 1px solid #ddd;
  flex: 0 0 180px;
  padding: 30px 10px 30px 20px;
  position: relative;
}

#nav a {
  border-radius: 6px;
  color: #2c3e50;
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
  padding: 6px 12px;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

#nav a:last-of-type {
  margin: 0;
}

#nav a:hover {
  background-color: #ddd;
}

#nav a.router-link-exact-active {
  background-color: #42b983;
  color: #fff;
}

#main {
  flex: 1 0 auto;
  padding: 50px;
}

.flex-row {
  align-items: flex-start;
  display: flex;
  margin-bottom: 12px;
  position: relative;
}

.flex-row.center {
  align-items: center;
}

.flex-row:last-of-type {
  margin-bottom: 0;
}

.flex-row > * {
  display: flex;
  flex-direction: column;
  margin-right: 12px;
  position: relative;
}

.flex-row > *:last-of-type {
  margin-right: 0;
}

.flex-1,
.flex-2,
.flex-3,
.flex-4 {
  justify-content: center;
}

.flex-1 {
  flex: 1 0 auto;
}

.flex-2 {
  flex: 2 0 auto;
}

.flex-3 {
  flex: 3 0 auto;
}

.flex-4 {
  flex: 4 0 auto;
}

.flex-small {
  flex: 0 0 150px;
  justify-content: flex-end;
}

textarea,
input[type="text"],
input[type="number"],
input[type="button"] {
  border: 2px solid #ddd;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 15px;
}

textarea:hover,
input[type="text"]:hover,
input[type="number"]:hover,
input[type="button"]:hover {
  border-color: #bbb;
}

textarea:focus,
input[type="text"]:focus,
input[type="number"]:focus,
input[type="button"]:focus {
  border-color: #42b983;
  outline-width: 0;
  outline: none;
}

input[type="button"] {
  border-color: #eee;
  cursor: pointer;
}

input[type="button"]:hover {
  border-color: #42b983;
}

input[type="button"]:active {
  background-color: #42b983;
  color: #fff;
}

input[type="button"].warning:hover,
input[type="button"].warning:focus {
  border-color: #f7390e;
}

input[type="button"].warning:active {
  background-color: #f7390e;
}

input[type="button"]:disabled {
	pointer-events: none;
}

* {
  transition: border-color 0.14s, background-color 0.14s, color 0.14s;
}

*:hover,
*:focus,
*:active {
  transition: border-color 0s, background-color 0s, color 0s;
}

ul {
  list-style: none;
  padding: 0;
}

ul.column > li {
  flex-direction: column;
}

li {
  border-radius: 9px;
  display: flex;
  justify-content: stretch;
  margin-bottom: 4px;
  padding: 9px;
}

li:last-child {
  margin-bottom: 0;
}

li > * {
  width: 100%;
}

li:nth-child(even) {
  background-color: #fafafa;
}

li:hover {
  background-color: #dddddd;
}
</style>
