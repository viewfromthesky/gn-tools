<template>
  <h1>Advanced team generator</h1>
  <div class="flex-row">
    <div class="flex-1">
      <div>
        <input v-model="balanced" type="checkbox" value="Balanced" label="Balanced" />
        <label>Balanced</label>
      </div>
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
      <label>Name</label>
      <input v-model="player.name" type="text" />
    </div>
    <div style="flex: 0 0 100px">
      <label>Handicap</label>
      <input v-model="player.handicap" type="number" />
    </div>
    <div style="flex: 0 0 150px; justify-content: flex-end">
      <input type="button" @click="addPlayer" value="Add player" />
    </div>
  </div>
  <div v-for="(player, i) in players" :key="`player-${i}`" class="flex-row player">
    <div class="flex-1">
      {{ player.name }} ({{ player.handicap }})
    </div>
    <input type="button" @click="removePlayer(i)" value="-" />
  </div>
  <Teams :teams="teams" />
</template>

<script>
import Teams from '@/components/Teams';

export default {
  components: { Teams },
  data() {
    return {
      player: {
        name: null,
        handicap: 0
      },
      players: [],
      size: 4,
      teams: [],
      balanced: false
    };
  },
  computed: {
    teamSize() {
      return Number(this.size) || 4;
    },
    noOfTeams() {
      return Math.ceil(this.players.length / this.teamSize);
    },
    perTeamMaximum() {
      const limit = Math.ceil(this.players.length / this.noOfTeams);

      if(Number.isNaN(limit)) return 0;

      return limit;
    }
  },
  watch: {
    players: {
      handler(val) {
        localStorage.setItem("advPlayers", JSON.stringify(val));
      },
      deep: true
    }
  },
  mounted() {
    const savedPlayers = localStorage.getItem("advPlayers");

    if(savedPlayers && savedPlayers !== "null")
    {
      this.players = JSON.parse(savedPlayers);
    }
  },
  methods: {
    addPlayer() {
      this.players.push({
        ...this.player
      });
    },
    removePlayer(index) {
      this.players.splice(index, 1);
    },
    generateTeams() {
      this.teams = [];

      for (let i = 0; i < this.noOfTeams; i++) {
        this.teams.push([]);
      }

      this.players.forEach(player => {
        const index = Math.floor(Math.random() * this.noOfTeams);
        this.addPlayerToTeam(index, player.name);
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
.player {
  border-radius: 6px;
  align-items: center;
  margin-bottom: 6px;
  padding: 6px 14px;
  transition: background-color 0.1s;
}

.player:last-of-type {
  margin-bottom: 0;
}

.player:hover {
  background-color: #fafafa;
  transition: background-color 0s;
}
</style>