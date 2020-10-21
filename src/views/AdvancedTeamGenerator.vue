<template>
  <h1>Advanced team generator</h1>
  <div class="flex-row">
    <div class="flex-1">
      <div>
        <input v-model="balanced" type="checkbox" />
        <label>Skill Balanced</label>
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
  <div class="flex-row stats-tape">
    <div>Balanced maximum per team: {{ perTeamMaximum }}</div>
  </div>
  <div class="flex-row collapser">
    <div class="flex-1">
      <h2>Player List <Badge :value="`${players.length}`" color="dark" dark /></h2>
    </div>
    <div style="flex: 0 0 100px; justify-content: center">
      <input type="button" @click="showPlayerList = !showPlayerList" :value="showPlayerList ? 'Hide' : 'Show'" />
    </div>
    <div style="flex: 0 0 100px; justify-content: center">
      <ConfirmButton text="Clear" :classes="['warning']" @confirmed="clearPlayers" />
    </div>
  </div>
  <div v-if="showPlayerList">
    <div
      v-for="(player, i) in players"
      :key="`player-${i}`"
      class="flex-row player"
    >
      <div class="flex-1">
        <div class="flex-row">
          <div style="flex: 0 0 47%">
            {{ player.name }}
          </div>
          <div style="flex: 0 0 47%">
            {{ player.handicap }}
          </div>
        </div>
      </div>
      <input type="button" value="Edit" />
      <input class="warning" type="button" @click="removePlayer(i)" value="Remove" />
    </div>
  </div>
  <h2 v-if="teams.length > 0">
    <template v-if="!generated">Most Recent </template>Output
  </h2>
  <Teams advanced :teams="teams" />
</template>

<script>
import Teams from '@/components/Teams';
import Badge from '@/components/Badge';
import ConfirmButton from '@/components/ConfirmButton';

export default {
  components: { Teams, Badge, ConfirmButton },
  data() {
    return {
      player: {
        name: null,
        handicap: 0
      },
      players: [],
      size: 4,
      teams: [],
      balanced: false,
      showPlayerList: true,
      generated: false
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
    },
    teams: {
      handler(val) {
        localStorage.setItem("advLastOutput", JSON.stringify(val));
      },
      deep: true
    },
    showPlayerList(val)
    {
      localStorage.setItem("advShowPlayers", JSON.stringify(val));
    }
  },
  mounted() {
    const savedPlayers = localStorage.getItem("advPlayers");
    const lastOutput = localStorage.getItem("advLastOutput");
    const showPlayers = localStorage.getItem("advShowPlayers");

    if(savedPlayers && savedPlayers !== "null")
    {
      this.players = JSON.parse(savedPlayers);
    }

    if (lastOutput)
    {
      this.teams = JSON.parse(lastOutput);
    }
    
    if (showPlayers)
    {
      this.showPlayerList = JSON.parse(showPlayers);
    }
  },
  methods: {
    addPlayer() {
      if(this.player.name && this.player.handicap >= -50 && this.player.handicap <= 50) {
        this.players.push({
          ...this.player
        });
      } else if (!this.player.name) {
        alert('Please provide a name');
      } else if (this.player.handicap < -50 || this.player.handicap > 50) {
        alert('Handicap should be between 50 and -50');
      }
    },
    removePlayer(index) {
      this.players.splice(index, 1);
    },
    clearPlayers() {
      this.players = [];
    },
    generateTeams() {
      if (!this.generated) this.generated = true;

      this.teams = [];

      for (let i = 0; i < this.noOfTeams; i++) {
        this.teams.push([]);
      }

      this.players.forEach(player => {
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
    },
  }
};
</script>

<style scoped>
.player {
  border-radius: 6px;
  align-items: center;
  margin-bottom: 6px;
  padding: 6px 6px 6px 14px;
  transition: background-color 0.1s;
}

.player:last-of-type {
  margin-bottom: 0;
}

.player:hover {
  background-color: #fafafa;
  transition: background-color 0s;
}

.player .editable {
  cursor: pointer;
  border-radius: 4px;
  padding: 5px 7px;
}

.player .editable:hover {
  background-color: #eee;
}
</style>