<template>
  <div>
    <h1>Insights</h1>
    <div class="flex-row">
      <div class="col-8">
        <h2>Selection</h2>
        <DataSelector dataSource="games" v-model="selectedGameId" />
        <template v-if="selectedGameId">
          Selected: {{ selectedGame.name }}
        </template>
      </div>
      <div class="col-4">
        <h2>Editor</h2>
        <div>
          <h3>Add a new player</h3>
          <Input
            v-model="newPlayer"
            @enter-pressed="addNewPlayer"
            labelText="Player name"
          />
          <h3>Add a new game</h3>
          <Input
            v-model="newGame"
            @enter-pressed="addNewGame"
            labelText="Game name"
          />
          <h3>Add a new poll</h3>
          <Input v-model="newPoll.date" labelText="Enter date (yyyy-MM-dd)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 } from "uuid";
import Input from "@/components/ui/Input";
import { usePlayerStore } from "@/store/players";
import { useGameStore } from "@/store/games";
import DataSelector from "@/components/ui/DataSelector";

export default {
  components: { Input, DataSelector },
  setup() {
    const playerStore = usePlayerStore();
    const gameStore = useGameStore();

    return {
      playerStore,
      gameStore
    };
  },
  data() {
    return {
      newPlayer: "",
      newGame: "",
      selectedGameId: null,
      newPoll: {
        date: "",
        options: [],
        votes: {}
      }
    };
  },
  computed: {
    players: {
      get() {
        return this.playerStore.all;
      }
    },
    games: {
      get() {
        return this.gameStore.all;
      }
    },
    selectedGame: {
      get() {
        return this.gameStore.byId(this.selectedGameId);
      }
    }
  },
  watch: {
    selectedGame(val) {
      console.log("recieved", val);
    }
  },
  methods: {
    addNewPlayer() {
      const success = this.playerStore.addNewPlayer({
        id: v4(),
        name: this.newPlayer
      });

      if (success) {
        this.newPlayer = "";
      }
    },
    addNewGame() {
      const success = this.gameStore.addNewGame({
        id: v4(),
        name: this.newGame
      });

      if (success) {
        this.newGame = "";
      }
    },
    removePlayer(id) {
      const numberRemoved = this.playerStore.removePlayerById(id);

      console.info(`Removed ${numberRemoved} player(s) from store`);
    },
    removeGame(id) {
      const numberRemoved = this.gameStore.removeGameById(id);

      console.info(`Removed ${numberRemoved} game(s) from store`);
    }
  }
};
</script>
