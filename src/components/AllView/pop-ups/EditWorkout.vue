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

const emit = defineEmits(['done'])
const props = defineProps<{
	workout: Workout
}>()

const storeWorkouts = useStoreWorkouts()
const editWorkout = ref(false)

const updateWorkout = (workout: Workout) => {
	editWorkout.value = false
	storeWorkouts.updateWorkout({
		id: props.workout.id,
		updates: workout
	})
  emit('done')
}
</script>
