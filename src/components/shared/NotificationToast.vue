<template>
	<v-snackbar
		v-model="snackbar"
		:timeout="props.timeout"
	>
		{{ props.text }}
		<template v-slot:actions>
			<v-btn
				color="error"
				variant="text"
				@click="$emit('close')"
			>
				Close
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script setup lang="ts">
const props = defineProps<{
	timeout: number
	text: string
}>()
const snackbar = ref(true)
</script>
