<template>
	<v-dialog
		v-model="dialog"
		activator="parent"
		transition="dialog-bottom-transition"
		fullscreen
	>
		<v-card
			id="element-to-convert"
			:class="theme.global.name.toLocaleUpperCase()"
		>
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

			<v-list class="px-5 mb-5">
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
import { useTheme } from 'vuetify'
import html2canvas from 'html2canvas'
import { shareImage } from '@/helpers/utils'

const theme = ref(useTheme())

const storeApp = useStoreApp()
const storeWorkouts = useStoreWorkouts()

const dialog = ref(false)

const getWorkoutsDone = (selectedDay: { workoutsId: string[] }) => {
	return storeWorkouts.allWorkouts.filter(wod =>
		selectedDay.workoutsId.includes(wod.id)
	)
}

const shareReport = async () => {
	const element = document.getElementById('element-to-convert') as HTMLElement
	html2canvas(element, {
		logging: true,
		allowTaint: true,
		useCORS: true,
		width: element.scrollWidth, // Capture the full width including offscreen content
		height: element.scrollHeight, // Capture the full height including offscreen content
		scrollX: -window.scrollX, // Adjust for horizontal scroll
		scrollY: -window.scrollY // Adjust for vertical scroll
	}).then(canvas => {
		// Process the canvas as needed, e.g., convert to image and download
		const dataUrl = canvas.toDataURL()
		shareImage('Weekly Report', dataUrl)
	})
}
</script>

<style scoped lang="css">
.DARK {
	background-color: #212121;
}

.LIGHT {
	background-color: #fafafa;
}
</style>
