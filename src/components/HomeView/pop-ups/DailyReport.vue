<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
	<v-dialog
		v-model="showWorkoutDone"
		activator="parent"
	>
		<v-card
			class="workouts-done-card"
			style="overflow-y: auto"
		>
			<template v-slot:prepend>
				<v-icon color="secondary">mdi-history</v-icon>
			</template>
			<template v-slot:title>
				{{ selectedDay.day + ' Workouts' }}
			</template>
			<v-divider thickness="0px" />
			<div class="scroll-view">
				<div
					v-for="(workout, index) in getWorkoutsDone()"
					:key="index"
					width="95%"
				>
					<v-divider />
					<v-card
						:title="workout.name"
						:subtitle="workout.type + ' - ' + workout.time + ' min'"
					>
						<template v-slot:prepend>
							<v-icon
								size="small"
								color="secondary"
							>
								mdi-weight-lifter
							</v-icon>
						</template>
						<v-card-text
							style="text-align: center"
							v-html="workout.exercises.replaceAll('\n', '<br/>')"
						/>
					</v-card>
				</div>
			</div>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'
import { DayData } from '@/types/GeneralTypes'

const storeWorkouts = useStoreWorkouts()
const props = defineProps<{
	selectedDay: DayData
}>()

const showWorkoutDone = ref(false)

const getWorkoutsDone = () =>
	storeWorkouts.allWorkouts.filter(wod =>
		props.selectedDay.workoutsId.includes(wod.id)
	)
</script>
<style>
.scroll-view {
	max-height: 500px;
	overflow-y: auto;
}
</style>
