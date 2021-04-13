import { defineStore } from "pinia";

export const useMainStore = defineStore({
	id: "counter",
	state() {
		return {
			count: 0
		};
	}
});
