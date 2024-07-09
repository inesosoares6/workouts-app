<template>
	<v-dialog
		v-model="dialog"
		activator="parent"
		transition="dialog-bottom-transition"
		fullscreen
	>
		<v-card>
			<v-toolbar>
				<v-btn
					icon="mdi-close"
					@click="dialog = false"
				/>

				<v-toolbar-title>Weekly Report</v-toolbar-title>

				<v-spacer />

				<v-toolbar-items>
					<v-btn
						icon
						flat
						size="small"
						class="mr-2"
						@click="shareReport"
					>
						<v-icon color="secondary">mdi-share-variant</v-icon>
					</v-btn>
				</v-toolbar-items>
			</v-toolbar>

			<v-list
				id="element-to-convert"
				class="px-5 mb-5"
			>
				<v-timeline
					align="start"
					truncate-line="both"
				>
					<v-timeline-item
						v-for="(item, index) in storeApp.timeline"
						:key="index"
						:dot-color="item.color"
						size="small"
					>
						<template v-slot:opposite>
							<div
								class="pt-1 headline font-weight-bold"
								:class="`text-${item.color}`"
								v-text="item.day"
							/>
						</template>
						<div
							v-for="(workout, index) in getWorkoutsDone(item)"
							:key="index"
							width="95%"
							class="d-flex flex-column ga-1 text-center mb-2"
						>
							<h2 class="font-weight-light text-secondary">
								{{ workout.name }}
							</h2>
							<h5 class="font-weight-light text-grey">
								{{ `${workout.type} - ${workout.time} min` }}
							</h5>
							<div v-html="workout.exercises.replaceAll('\n', '<br/>')" />
							<v-divider />
						</div>
					</v-timeline-item>
				</v-timeline>
			</v-list>
		</v-card>
	</v-dialog>
</template>
<script setup lang="ts">
import { useStoreApp } from '@/stores/app'
import { useStoreWorkouts } from '@/stores/workouts'
import { html2Image, shareImage } from '@/helpers/utils'

const storeApp = useStoreApp()
const storeWorkouts = useStoreWorkouts()

const dialog = ref(false)

const getWorkoutsDone = (selectedDay: { workoutsId: string[] }) => {
	return storeWorkouts.allWorkouts.filter(wod =>
		selectedDay.workoutsId.includes(wod.id)
	)
}

const shareReport = async () => {
	const dataUrl = await html2Image('element-to-convert')
	shareImage('Weekly-Report', dataUrl)
}
</script>
