import { defineStore } from "pinia";
import { Player, PlayerState } from "@/types";

export const usePlayerStore = defineStore({
  id: "playerStore",
  state() {
    return {
      players: []
    };
  },
  actions: {
    initialise() {
      if (localStorage.getItem("gn-tools:players")) {
        this.players = JSON.parse(
          localStorage.getItem("gn-tools:players") as string
        );
      }
    },
    addNewPlayer(player: Player) {
      // Get the number of items in the players array before adding
      const count = this.players.length;

      // If this player doesn't exist, add them to the array
      if (
        !this.players.find(
          (listedPlayer: Player) => listedPlayer.id === player.id
        )
      ) {
        this.players.push(player);
        localStorage.setItem("gn-tools:players", JSON.stringify(this.players));
      }

      // If the length of the array increased, send true. Otherwise, send false
      return this.players.length > count;
    },
    removePlayerById(id: string) {
      // Get the number of items in the players array before removing
      const count = this.players.length;

      // Find the player, and remove them from the array
      this.players.splice(
        this.players.findIndex(
          (listedPlayer: Player) => listedPlayer.id === id
        ),
        1
      );
      localStorage.setItem("gn-tools:players", JSON.stringify(this.players));

      // Send back the number of players that were removed
      return count - this.players.length;
    }
  },
  getters: {
    all: (state: PlayerState) => state.players,
    byId: (state: PlayerState) => (id: string) =>
      state.players.find((player: Player) => player.id === id)
  }
});
