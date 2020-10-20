<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/iframe-test">Iframe thing</router-link>
    <router-link to="/team-generator">Team generator</router-link>
    <router-link to="/adv-team-generator">Advanced team generator</router-link>
  </div>
  <div id="main">
    <router-view />
  </div>
</template>

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
</style>
