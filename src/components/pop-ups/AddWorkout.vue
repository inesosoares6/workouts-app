<template>
	<v-dialog
		v-model="addWorkout"
		activator="parent"
	>
		<AddEditWorkoutForm
			title="Add"
			buttonText="Add"
			@submit-workout="submitWorkout"
		/>
	</v-dialog>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'
import { Workout } from '@/types/WorkoutsTypes'

const storeWorkouts = useStoreWorkouts()
const addWorkout = ref(false)

const submitWorkout = (workout: Workout) => {
	addWorkout.value = false
	storeWorkouts.addWorkout(workout)
}
</script>
