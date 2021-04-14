<template>
  <div>
    <h1>Games Editor</h1>
    <div class="flex-row">
      <div class="col-6">
        <h2>Add a game</h2>
        <Input v-model="newGameName" labelText="Game name" />
        <Input
          v-model="newGamePlayersPerMatch"
          type="number"
          labelText="Maximum players per team/match"
        />
        <input type="button" @click="addGame" value="Add" />
      </div>
      <div class="col-6">
        <h2>Edit games</h2>
        <ul class="column">
          <li v-for="game in allGames" :key="game.id">
            <div class="flex-row center">
              <span class="flex-1">
                <span>
                  {{ game.name }}
                  <Badge :value="`${game.playersPerMatch}`" color="dark" dark />
                </span>
              </span>
              <input
                type="button"
                @click="setEditing(game.id)"
                :value="editing && game.id === editing ? 'Editing' : 'Edit'"
                :disabled="editing && game.id === editing"
              />
              <ConfirmButton
                text="Remove"
                @confirmed="removeGame(game.id)"
                :classes="['warning']"
              />
            </div>
            <div class="flex-1" v-if="editing && game.id === editing">
              <Input v-model="editedGameName" labelText="Game name" />
              <Input
                v-model="editedGamePlayersPerMatch"
                labelText="Maximum players per team/match"
              />
              <input
                type="button"
                @click="saveEdits"
                value="Save"
                style="margin-right: 12px;"
              />
              <input type="button" @click="setEditing(null)" value="Cancel" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from "@/store/games";
import Input from "@/components/ui/Input";
import { v4 } from "uuid";
import Badge from "@/components/Badge";
import ConfirmButton from "@/components/ConfirmButton";

export default {
  components: { Input, Badge, ConfirmButton },
  setup() {
    const gameStore = useGameStore();

    return {
      gameStore
    };
  },
  data() {
    return {
      newGameName: "",
      newGamePlayersPerMatch: null,
      editing: null,
      editedGameName: "",
      editedGamePlayersPerMatch: 0
    };
  },
  computed: {
    allGames: {
      get() {
        return this.gameStore.all;
      }
    },
    gameBeingEdited: {
      get() {
        return this.gameStore.byId(this.editing);
      }
    }
  },
  methods: {
    addGame() {
      const success = this.gameStore.addNewGame({
        id: v4(),
        name: this.newGameName,
        playersPerMatch: this.newGamePlayersPerMatch
      });

      if (success) {
        this.newGameName = "";
        this.newGamePlayersPerMatch = "";
      }
    },
    removeGame(id) {
      const numberRemoved = this.gameStore.removeGameById(id);

      console.info(`Removed ${numberRemoved} game(s) from store`);
    },
    setEditing(id) {
      this.editing = id;

      if (this.gameBeingEdited) {
        this.editedGameName = this.gameBeingEdited.name;
        this.editedGamePlayersPerMatch = this.gameBeingEdited.playersPerMatch;
      } else {
        this.editedGameName = "";
        this.editedGamePlayersPerMatch = 0;
      }
    },
    saveEdits() {
      const status = this.gameStore.editGame({
        id: this.editing,
        name: this.editedGameName,
        playersPerMatch: this.editedGamePlayersPerMatch
      });

      if (status) {
        this.setEditing(null);
      } else {
        console.error("Could not make edits, try again");
      }
    }
  }
};
</script>
