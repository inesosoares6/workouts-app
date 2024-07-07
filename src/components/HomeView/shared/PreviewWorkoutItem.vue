<template>
	<v-list-item
		:value="workout"
		rounded="xl"
		:title="workout.name"
		:subtitle="`${workout.type} - ${workout.time} min`"
	>
		<template v-slot:prepend>
			<v-avatar :color="workout.completions ? 'secondary' : 'error'">
				<v-icon>mdi-dumbbell</v-icon>
			</v-avatar>
		</template>
		<template v-slot:append>
			<v-checkbox
				v-model="selected"
				hide-details
				@change="$emit('updateMainCheckbox', {value: selected, index})"
			/>
		</template>
	</v-list-item>
</template>

<script setup lang="ts">
import { Workout } from '@/types/WorkoutsTypes'

defineProps<{
	workout: Workout
	index: Array<number | string>
}>()

const selected = ref(false)
</script>
