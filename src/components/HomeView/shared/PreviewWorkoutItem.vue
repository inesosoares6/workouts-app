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
			/>
		</template>
	</v-list-item>
</template>

<script setup lang="ts">
import { Workout } from '@/types/WorkoutsTypes'

const props = defineProps<{
	modelValue?: boolean
	workout: Workout
	index: Array<number | string>
}>()

const emit = defineEmits(['updateMainCheckbox'])

const selected = computed({
	get() {
		return props.modelValue
	},
	set(newValue) {
		emit('updateMainCheckbox', { value: newValue, index: props.index })
	}
})
</script>
