<template>
	<div>
		<h1>Games Editor</h1> 
		<div class="flex-row">
			<div class="flex-1">
				<h2>Add a game</h2>
			</div>
			<div class="flex-1">
				<h2>Edit games</h2>
				<ul>
					<li
						v-for="game in allGames"
						:key="game.id"
					>
						{{ game.name }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { useGameStore } from "@/store/games";

export default {
	setup() {
		const gameStore = useGameStore();

		return {
			gameStore
		};
	},
	computed: {
		allGames: {
			get() {
				return this.gameStore.all;
			}
		}
	}
};
</script>
