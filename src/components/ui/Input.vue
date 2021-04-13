<template>
	<div class="flex-row">
		<div class="flex-1">
			<label>{{ labelText }}</label>
			<input :type="type" v-model="simulatedValue" @keydown.enter="enterPressed" />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		labelText: {
			type: String,
			default: ""
		},
		type: {
			type: String,
			default: "text"
		},
		modelValue: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			localValue: null
		};
	},
	computed: {
		simulatedValue: {
			get() {
				if(!this.localValue) {
					return this.modelValue;
				}

				return this.localValue;
			},
			set(value)
			{
				this.localValue = value;
			}
		}
	},
	watch: {
		localValue(newVal) {
			this.$emit("update:modelValue", newVal);
		},
		modelValue(newVal) {
			this.simulatedValue = newVal;
		}
	},
	methods: {
		enterPressed() {
			this.$emit("enter-pressed");
		}
	}
};
</script>
