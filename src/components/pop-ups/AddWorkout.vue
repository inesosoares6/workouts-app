<template>
	<v-dialog
		v-model="addWorkout"
		activator="parent"
	>
		<AddEditWorkoutForm
			:title="'Add'"
			:workout="{}"
			:buttonText="'Add'"
			v-on:submit-workout="submitWorkout"
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

<style scoped lang="css">
.v-card-title {
	margin-top: 10px;
}
</style>
