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
  <Teams :teams="teams" />
</template>

<script>
import Teams from "@/components/Teams";

export default {
  components: { Teams },
  data() {
    return {
      players: null,
      size: 4,
      teams: []
    };
  },
  computed: {
    playersArray() {
      if (this.players === null) return [];
      return this.players.split(/,\s*/).filter(item => item && item !== "\n");
    },
    teamSize() {
      return Number(this.size) || 4;
    },
    noOfTeams() {
      return Math.ceil(this.playersArray.length / this.teamSize);
    },
    perTeamMaximum() {
      const limit = Math.ceil(this.playersArray.length / this.noOfTeams);

      if (Number.isNaN(limit)) return 0;

      return limit;
    }
  },
  watch: {
    players(val) {
      localStorage.setItem("players", val);
    }
  },
  mounted() {
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
