<template>
	<v-list lines="two">
		<v-list-item
			v-for="(workout, key) in list"
			:key="key"
			:value="workout"
			:title="workout.name"
			:subtitle="`${workout.type} - ${workout.time} min`"
			rounded="xl"
		>
			<PreviewWorkout :workout="workout" />

			<template v-slot:prepend>
				<v-avatar :color="+workout.completions ? 'secondary' : 'error'">
					<v-icon>mdi-dumbbell</v-icon>
				</v-avatar>
			</template>
			<template v-slot:append>
				<v-btn
					flat
					round
					icon
					@click="storeWorkouts.deleteWorkout(workout.id)"
				>
					<v-icon color="red">mdi-delete</v-icon>
				</v-btn>
			</template>
		</v-list-item>
	</v-list>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'
import { Workout } from '@/types/WorkoutsTypes'

const storeWorkouts = useStoreWorkouts()
defineProps<{
	list: Workout[]
}>()
</script>
