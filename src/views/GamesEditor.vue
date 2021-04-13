<template>
	<div>
		<h1>Games Editor</h1> 
		<div class="flex-row">
			<div class="flex-1">
				<h2>Add a game</h2>
				<Input
					v-model="newGameName"
					labelText="Game name"
				/>
				<Input
					v-model="newGamePlayersPerTeam"
					type="number"
					labelText="Maximum players per team"
				/>
				<input type="button" @click="addGame" value="Add" />
			</div>
			<div class="flex-1">
				<h2>Edit games</h2>
				<ul>
					<li
						v-for="game in allGames"
						:key="game.id"
						class="flex-row"
					>
						<span class="flex-1">
							<span>
								{{ game.name }}
								<Badge :value="`${game.playersPerTeam}`" color="dark" dark />
							</span>
						</span>
						<input type="button" @click="removeGame(game.id)" value="Remove" />
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

export default {
	components: { Input, Badge },
	setup() {
		const gameStore = useGameStore();

		return {
			gameStore
		};
	},
	data() {
		return {
			newGameName: "",
			newGamePlayersPerTeam: null
		};
	},
	computed: {
		allGames: {
			get() {
				return this.gameStore.all;
			}
		}
	},
	methods: {
		addGame() {
			const success = this.gameStore.addNewGame({
				id: v4(),
				name: this.newGameName,
				playersPerTeam: this.newGamePlayersPerTeam
			});

			if(success) {
				this.newGameName = "";
				this.newGamePlayersPerTeam = "";
			}
		},
		removeGame(id) {
			const numberRemoved = this.gameStore.removeGameById(id);

			console.info(`Removed ${numberRemoved} game(s) from store`);
		}
	}
};
</script>
