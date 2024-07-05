<template>
	<v-dialog
		v-model="dialog"
		activator="parent"
		transition="dialog-bottom-transition"
		fullscreen
	>
		<v-card
			id="element-to-convert"
			:class="theme.global.name === 'dark' ? 'DARK' : 'LIGHT'"
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
						@click="printReport"
					>
						<v-icon color="secondary">mdi-download</v-icon>
					</v-btn>
				</v-toolbar-items>
			</v-toolbar>

			<v-list>
				<v-timeline align="start">
					<v-timeline-item
						v-for="(item, index) in storeApp.timeline"
						:key="index"
						:dot-color="item.color"
						size="small"
					>
						<template v-slot:opposite>
							<div
								:class="`pt-1 headline font-weight-bold text-${item.color}`"
								v-text="item.day"
							/>
						</template>
						<div
							v-for="(workout, index) in getWorkoutsDone(item)"
							:key="index"
							width="95%"
						>
							<h2
								:class="`mt-n1 headline font-weight-light mb-2 text-${item.color}`"
							>
								{{ workout.name }}
							</h2>
							<h5 :class="`mt-n1 font-weight-light mb-2 text-grey`">
								{{ workout.type + ' - ' + workout.time + ' min' }}
							</h5>
							<div
								class="mb-4"
								v-html="workout.exercises.replaceAll('\n', '<br/>')"
							/>
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
import { Workout } from '@/types/WorkoutsTypes'
import { html2pdf } from 'html2pdf-ts'
import { useTheme } from 'vuetify'

const theme = ref(useTheme())

const date = new Date().toString().split(' ')
const dateStructured = ref(
	date[0] + ', ' + date[2] + ' ' + date[1] + ' ' + date[3]
)

const storeApp = useStoreApp()
const storeWorkouts = useStoreWorkouts()

const dialog = ref(false)

const getWorkoutsDone = (selectedDay: { workoutsId: string[] }) => {
	let workoutsList: Workout[] = []
	selectedDay.workoutsId.forEach((id: string) => {
		const index = storeWorkouts.allWorkouts.findIndex(wod => wod.id === id)
		workoutsList.push(storeWorkouts.allWorkouts[index])
	})
	return workoutsList
}

const printReport = () => {
	html2pdf.createPDF(
		document.getElementById('element-to-convert')?.outerHTML as string,
		{
			format: 'A4',
			filePath: `Weekly Report - ${dateStructured.value}.pdf`,
			landscape: false,
			protect: {
				password: '1234'
			},
			resolution: {
				height: 1920,
				width: 1080
			}
		}
	)
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
