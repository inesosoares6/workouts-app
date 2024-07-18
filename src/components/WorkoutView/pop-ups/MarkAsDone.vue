<template>
	<v-dialog
		v-model="markAsDone"
		activator="parent"
	>
		<v-card>
			<template v-slot:title>Mark As Done</template>
			<v-card-text class="pb-0 px-8">
				<v-radio-group>
					<v-radio
						v-for="(item, index) in days"
						:key="index"
						:value="item.day"
						@change="updateWorkoutCompletions(item.day)"
					>
						<template v-slot:label>
							<span :class="{ 'text-secondary': item.today }">
								{{ item.day + (item.today ? ' (today)' : '') }}
							</span>
						</template>
					</v-radio>
				</v-radio-group>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { Workout } from '@/types/WorkoutsTypes'
import { useStoreApp } from '@/stores/app'
import { useStoreWorkouts } from '@/stores/workouts'

const storeWorkouts = useStoreWorkouts()
const storeApp = useStoreApp()

const emit = defineEmits(['done'])
const props = defineProps<{
	workout: Workout
}>()

const markAsDone = ref(false)

const days = computed(() =>
	storeApp.timeline.map(item => ({
		day: item.day,
		today: new Date().toString().split(' ')[0] === item.day.substring(0, 3)
	}))
)

const updateWorkoutCompletions = (day: string) => {
	storeWorkouts.updateWorkout({
		id: storeWorkouts.currentWorkoutId,
		updates: {
			completions: props.workout.completions + 1
		}
	})
	storeApp.updateTimeline(day.substring(0, 3), storeWorkouts.currentWorkoutId)
	emit('done')
}
</script>
