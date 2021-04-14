<template>
	<div>
		<h1>Data selector</h1>
		<select
			v-if="dataSource"
			:name="dataSource"
			:id="`${dataSource}-selector`"
			style="width: 100%; margin-bottom: 12px;"
		>
			<option value="" selected disabled></option>
			<option
				v-for="option in options"
				:key="option.id"
				value="option.id"
				@click="sendClick(option.id)"
			>
				{{ option.name }}
			</option>
		</select>
		<h2 v-else>Please select a data source</h2>
	</div>
</template>

<script>
import { useGameStore } from "@/store/games";

export default {
	props: {
		dataSource: {
			type: String,
			default: null
		},
		modelValue: {
			type: String,
			default: null
		}
	},
	setup() {
		const gameStoreName = 'gameStore';

		return {
			gameStoreName,
			[gameStoreName]: useGameStore()
		};
	},
	computed: {
		options: {
			get()
			{
				let store;

				switch(this.dataSource) {
					case 'games':
						store = this.gameStoreName;

						break;
					default:
						break;
				}

				if(store) {
					const options = this[store].all;

					console.log(options);

					return options;
				}

				return null;
			}
		}
	},
	methods: {
		sendClick(id) {
			console.log("id", id);
			this.$emit("update:modelValue", id);
		}
	}
};
</script>
