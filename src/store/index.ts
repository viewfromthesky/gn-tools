import { defineStore } from "pinia";
import { useGameStore } from "@/store/games";
import { usePlayerStore } from "@/store/players";

export const useDefaultStore = defineStore({
	id: "index",
	actions: {
		initialise() {
			// Initialise all stores on load
			const gameStore = useGameStore();
			const playerStore = usePlayerStore();

			gameStore.initialise();
			playerStore.initialise();
		}
	}
});
