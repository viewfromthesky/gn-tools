<template>
  <h1>Team generator</h1>
  <div class="flex-row">
    <div class="flex-1">
      <label for="players">Players ({{ playersArray.length }})</label>
      <input v-model="players" name="players" type="text" />
    </div>
    <div style="flex: 0 0 100px">
      <label for="size">Max players per team</label>
      <input v-model="size" name="size" type="number" />
    </div>
    <div style="flex: 0 0 150px; justify-content: flex-end">
      <input type="button" @click="generateTeams" value="Generate" />
    </div>
  </div>
  <div class="flex-row">
    <div class="flex-1">
      <div>
        <div
          v-for="(player, i) in playersArray"
          :key="`player-${i}`"
          class="livePlayer"
        >
          {{ player }}
        </div>
      </div>
    </div>
    <div
      style="flex: 0 0 150px; text-align: right; display: flex; justify-content: center;"
    >
      <div>Balanced max. {{ perTeamMaximum }}</div>
    </div>
  </div>
  <h2>Output</h2>
  <div v-for="(team, i) in teams" :key="`team-${i}`">
    <h3>Team {{ i + 1 }}</h3>
    <ul class="team">
      <li v-for="(player, i) in team" :key="`player-${i}`">{{ player }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      players: null,
      size: 4,
      teams: [],
      testedTeams: []
    };
  },
  computed: {
    playersArray() {
      if (this.players === null) return [];
      return this.players.split(/,\s*/)
        .filter(item => item && item !== "\n");
    },
    teamSize() {
      return Number(this.size) || 4;
    },
    noOfTeams() {
      return Math.ceil(this.playersArray.length / this.teamSize);
    },
    perTeamMaximum() {
      const limit = Math.ceil(this.playersArray.length / this.noOfTeams);

      if(Number.isNaN(limit)) return 0;

      return limit;
    }
  },
  watch: {
    players(val) {
      localStorage.setItem("players", val);
    }
  },
  mounted()
  {
    this.players = localStorage.getItem("players");
  },
  methods: {
    generateTeams() {
      this.teams = [];

      for (let i = 0; i < this.noOfTeams; i++) {
        this.teams.push([]);
      }

      this.playersArray.forEach(player => {
        const index = Math.floor(Math.random() * this.noOfTeams);
        this.addPlayerToTeam(index, player);
      });
    },
    addPlayerToTeam(index, player) {
      if (this.teams[index].length !== this.teamSize) {
        if (this.teams[index].length < this.perTeamMaximum) {
          this.teams[index].push(player);

          return;
        }
      }

      this.addPlayerToTeam(Math.floor(Math.random() * this.noOfTeams), player);
    }
  }
};
</script>

<style scoped>
ul.team {
  border-radius: 12px;
  background-color: #ddd;
  list-style: none;
  padding: 12px;
}

ul.team li {
  background-color: #eee;
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 4px 12px;
}

ul.team li:last-of-type {
  margin: 0;
}

.flex-row {
  display: flex;
  margin-bottom: 12px;
  position: relative;
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

textarea,
input[type="text"],
input[type="number"],
input[type="button"] {
  border: 2px solid #ddd;
  border-radius: 6px;
  display: block;
  padding: 4px 8px;
  font-size: 15px;
  transition: border-color .1s, background-color .1s, color .1s;
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
  transition: border-color 0s, background-color 0s, color 0s;
}

input[type="button"] {
  border-color: #eee;
  cursor: pointer;
}

input[type="button"]:hover {
  border-color: #42b983;
  transition: border-color 0s, background-color 0s, color 0s;
}

input[type="button"]:active {
  background-color: #42b983;
  color: #fff;
}

.livePlayer {
  background-color: #42b983;
  color: #fff;
  border-radius: 16px;
  display: inline-block;
  font-size: 14px;
  line-height: 1.4em;
  margin: 0 8px 0 0;
  padding: 6px 10px;
}

.livePlayer:last-of-type {
  margin: 0;
}
</style>