<template>
	<v-list lines="two">
		<v-list-item
			v-for="(workout, key) in props.list"
			:key="key"
			:value="workout"
			:title="workout.name"
			:subtitle="
				workout.type + `${workout.time ? ' - ' + workout.time + ' min' : ''}`
			"
			rounded="xl"
		>
			<PreviewWorkout
				:workout="workout"
				:id="key"
			/>

			<template v-slot:prepend>
				<v-avatar :color="workout.completions > 0 ? 'secondary' : 'error'">
					<v-icon>mdi-dumbbell</v-icon>
				</v-avatar>
			</template>
			<template v-slot:append>
				<v-btn
					flat
					round
					icon
					@click="storeWorkouts.deleteWorkout(key)"
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
const props = defineProps<{
	list: Workout[]
}>()
</script>
