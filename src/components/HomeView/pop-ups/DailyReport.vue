<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
	<v-dialog
		v-model="showWorkoutDone"
		activator="parent"
	>
		<v-card>
			<template v-slot:prepend>
				<v-icon color="secondary">mdi-history</v-icon>
			</template>
			<template v-slot:title>
				{{ selectedDay.day + ' Workouts' }}
			</template>
			<template v-slot:append>
				<v-btn
					icon
					flat
					size="small"
					@click="shareReport"
				>
					<v-icon color="secondary">mdi-share-variant</v-icon>
				</v-btn>
			</template>
			<v-list
				id="element-to-convert"
				class="py-0"
			>
				<div
					v-for="(workout, index) in getWorkoutsDone"
					:key="index"
					width="95%"
				>
					<v-divider />
					<v-card
						flat
						:title="workout.name"
						:subtitle="`${workout.type} - ${workout.time} min`"
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
							class="text-center"
							v-html="workout.exercises.replaceAll('\n', '<br/>')"
						/>
					</v-card>
				</div>
			</v-list>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { html2Image, shareImage } from '@/helpers/utils'
import { useStoreWorkouts } from '@/stores/workouts'
import { DayData } from '@/types/GeneralTypes'

const storeWorkouts = useStoreWorkouts()
const props = defineProps<{
	selectedDay: DayData
}>()

const showWorkoutDone = ref(false)

const getWorkoutsDone = computed(() =>
	storeWorkouts.allWorkouts.filter(wod =>
		props.selectedDay.workoutsId.includes(wod.id)
	)
)

const shareReport = async () => {
	const dataUrl = await html2Image('element-to-convert')
	shareImage('Daily-Report', dataUrl)
}
</script>
