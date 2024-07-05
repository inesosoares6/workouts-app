<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
	<v-dialog
		v-model="showWorkoutDone"
		activator="parent"
	>
		<v-card
			class="workouts-done-card"
			:title="selectedDay.day + ' Workouts'"
			style="overflow-y: auto"
		>
			<template v-slot:prepend>
				<v-icon
					class="title-icon"
					color="secondary"
				>
					mdi-history
				</v-icon>
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

const storeWorkouts = useStoreWorkouts()
const props = defineProps<{
	selectedDay: {
		day: string
		color: string
		workoutsIds: string[]
	}
}>()

const showWorkoutDone = ref(false)

const getWorkoutsDone = () =>
	storeWorkouts.allWorkouts.filter(wod =>
		props.selectedDay.workoutsIds.includes(wod.id)
	)
</script>
<style>
.scroll-view {
	max-height: 500px;
	overflow-y: auto;
}
</style>
