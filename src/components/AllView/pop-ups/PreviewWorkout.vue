<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
	<v-dialog
		v-model="previewWorkout"
		activator="parent"
	>
		<v-card>
			<template v-slot:prepend>
				<v-icon
					size="small"
					color="secondary"
				>
					mdi-weight-lifter
				</v-icon>
			</template>
			<template v-slot:title>
				{{ workout.name }}
			</template>
			<template v-slot:subtitle>
				{{ `${workout.type} - ${workout.time} min` }}
			</template>
			<template v-slot:append>
				<v-btn
					icon
					color="grey"
				>
					<v-icon>mdi-pencil</v-icon>
					<EditWorkout :workout="workout" />
				</v-btn>
			</template>
			<v-card-text v-html="workout.exercises.replaceAll('\n', '<br/>')" />
			<v-card-actions>
				<span class="ml-3 text-error">
					Done {{ workout.completions }} times!
				</span>
				<v-spacer />
				<v-btn
					color="secondary"
					@click="selectWorkout"
					to="WorkoutView"
				>
					Select
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'
import { Workout } from '@/types/WorkoutsTypes'

const props = defineProps<{
	workout: Workout
}>()

const storeWorkouts = useStoreWorkouts()
const previewWorkout = ref(false)

const selectWorkout = () => {
	storeWorkouts.selectWorkout(props.workout.id)
	previewWorkout.value = false
}
</script>
