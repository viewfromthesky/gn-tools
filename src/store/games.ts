import { defineStore } from "pinia";
import { Game, GameState } from "@/types";

export const useGameStore = defineStore({
	id: "gameStore",
	state() {
		return {
			games: []
		};
	},
	actions: {
		addNewGame(game: Game) {
			// Get the number of items in the games array before adding
			const count = this.games.length;

			// If this game doesn't exist, add it to the array
			if(!this.games.find((listedGame: Game) => listedGame.id === game.id)) {
				this.games.push(game);
			}

			// If the length of the array increased, send true. Otherwise, send false
			return this.games.length > count;
		},
		removeGameById(id: string) {
			// Get the number of items in the games array before removing
			const count = this.games.length;

			// Find the game, and remove it from the array
			this.games.splice(this.games.findIndex((listedGame: Game) => listedGame.id === id), 1);

			// Send back the number of games that were removed
			return count - this.games.length;
		}
	},
	getters: {
		all: (state: GameState) => state.games,
		byId: (state: GameState) => (id: string) => state.games.find((game: Game) => game.id === id)
	}
});
