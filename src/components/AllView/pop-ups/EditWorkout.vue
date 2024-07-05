<template>
	<v-dialog
		v-model="editWorkout"
		activator="parent"
	>
		<AddEditWorkoutForm
			title="Edit"
			:workout="workout"
			buttonText="Update"
			@submit-workout="updateWorkout"
		/>
	</v-dialog>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'
import { Workout } from '@/types/WorkoutsTypes'

const props = defineProps<{
	workout: Workout
	id: string
}>()

const storeWorkouts = useStoreWorkouts()
const editWorkout = ref(false)

const updateWorkout = (workout: Workout) => {
	editWorkout.value = false
	storeWorkouts.updateWorkout({
		id: props.id,
		updates: workout
	})
}
</script>

<style lang="css">
.v-card-title {
	margin-top: 10px;
}
</style>
