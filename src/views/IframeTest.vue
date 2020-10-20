<template>
  <h1>Iframe Test</h1>
  <div class="scrolling-container">
    <div class="container">
      <iframe
        class="iframe"
        allow="encrypted-media"
        src="https://startpage.com"
      />
    </div>
  </div>
</template>

<style scoped>
.scrolling-container {
  height: 500px;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  width: 500px;
}

.container {
  display: block;
  height: 700px; /* 200px at the top, 300px at the bottom we want rid of; subtract both from this value */
  overflow: hidden;
  position: relative;
  width: 500px;
}
.iframe {
  border: none;
  height: 1200px; /* the height here is simply container height + offset, mostly symbolic so you know what you'll be able to see */
  position: absolute;
  top: -200px; /* this is your top offset value, it should be the height of the bar */
  width: 500px;
}
</style>
