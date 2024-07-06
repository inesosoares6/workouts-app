<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
	<v-dialog
		v-model="workoutDetails"
		activator="parent"
	>
		<v-card
			title="Workout Details"
			:subtitle="`${workout.name}: ${workout.type} - ${workout.time} min`"
		>
			<template v-slot:append>
				<v-btn
					icon
					flat
					@click="addDetails = !addDetails"
				>
					<v-icon>mdi-{{ addDetails ? 'minus' : 'plus' }}</v-icon>
				</v-btn>
			</template>
			<v-card-text
				v-if="workout?.details"
				v-html="workout.details.replaceAll('\n', '<br/>')"
			/>
			<v-card-text v-else-if="!addDetails">
				Click on the add button to add details to this workout.
			</v-card-text>
			<v-card-text v-if="addDetails">
				<v-textarea
					label="Details"
					v-model="details"
					hide-details
				/>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					v-if="details && addDetails"
					color="secondary"
					@click="saveDetails"
				>
					Save
				</v-btn>
				<v-btn
					v-else
					color="error"
					@click="workoutDetails = false"
				>
					Close
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'
import { Workout } from '@/types/WorkoutsTypes'

const storeWorkouts = useStoreWorkouts()

const props = defineProps<{
	workout: Workout
}>()

const workoutDetails = ref(false)
const addDetails = ref(false)
const details = ref('')
const currentWorkout = ref()

onMounted(() => {
	currentWorkout.value = props.workout
})

const saveDetails = () => {
	storeWorkouts.updateWorkout({
		id: props.workout.id,
		updates: {
			details: details.value
		}
	})
	addDetails.value = false
	workoutDetails.value = false
}
</script>
