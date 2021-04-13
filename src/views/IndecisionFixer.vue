<template>
  <h1>Indecision Fixer</h1>
  <div class="flex-row">
    <div class="flex-1">
      <label>Add a thing to decide on</label>
      <input
        type="text"
        v-model="currentThing"
        @keydown.enter="addThingToThings"
      />
    </div>
    <div style="flex: 0 0 150px; justify-content: flex-end">
      <input type="button" value="Add" @click="addThingToThings" />
    </div>
  </div>
  <div class="flex-row">
    <div class="flex-1">
      <input type="button" value="Fix my indecision" @click="fixIndecision" />
    </div>
    <div class="flex-small">
      <ConfirmButton
        text="Clear things"
        :classes="['warning']"
        @confirmed="clearAll"
      />
    </div>
  </div>
  <div class="flex-row" v-if="output">
    <div class="flex-1 output">
      {{ output }}
    </div>
  </div>
  <div>
    <h2>
      Things to decide on
      <Badge :value="`${things.length}`" color="dark" dark />
    </h2>
  </div>
  <div class="flex-row">
    <ul class="flex-1 thing" ref="things">
      <li v-for="(thing, i) in things" :key="`thing-${i}`">
        <div class="flex-row">
          <div class="flex-1">
            {{ thing }}
          </div>
          <div>
            <input type="button" value="Remove" @click="clearOne(i)" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ConfirmButton from "@/components/ConfirmButton";
import Badge from "@/components/Badge";

export default {
  components: { ConfirmButton, Badge },
  data() {
    return {
      currentThing: null,
      output: null,
      answer: null,
      things: []
    };
  },
  watch: {
    things: {
      handler(val) {
        localStorage.setItem("if_things", JSON.stringify(val));
      },
      deep: true
    }
  },
  mounted() {
    const things = localStorage.getItem("if_things");

    if (things && things !== "null") {
      this.things = JSON.parse(things);
    }
  },
  methods: {
    addThingToThings() {
      if (!this.things.includes(this.currentThing)) {
        this.things.push(this.currentThing);
        this.currentThing = null;
      }
    },
    fixIndecision() {
      this.output = null;
      const iterations = 50;
      const maximum = this.things.length;
      const listOfThings = this.$refs.things.querySelectorAll("li");
      let iterationCount = 0;

      const timer = setInterval(() => {
        console.log(`iteration ${iterationCount}`);
        if (this.answer !== null) {
          listOfThings[this.answer].classList.remove("choosing");
        }

        const selection = Math.floor(Math.random() * maximum);
        this.answer = selection;
        listOfThings[selection].classList.add("choosing");

        iterationCount++;
        if (iterationCount === iterations) {
          clearInterval(timer);
          this.output = this.things[this.answer];
        }
      }, 100);
    },
    clearOne(index) {
      this.things.splice(index, 1);
    },
    clearAll() {
      this.things = [];
    }
  }
};
</script>

<style scoped>
.thing {
  list-style: none;
  margin: 0;
  padding: 0;
}

.thing > li {
  border-radius: 6px;
  padding: 6px 12px;
}
.thing > li:hover {
  background-color: #fafafa;
}

.thing > li.choosing {
  background-color: #42b983;
  color: #fff;
}

.output {
  background-color: orange;
  border: 4px solid #ff6600;
  border-radius: 8px;
  align-items: center;
  color: #fff;
  height: 140px;
  font-size: 30px;
}
</style>
