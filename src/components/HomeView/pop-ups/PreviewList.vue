<template>
	<v-dialog
		v-model="previewList"
		activator="parent"
	>
		<v-card>
			<template v-slot:title>Select Workouts</template>
			<template v-slot:append>
				<v-checkbox
					v-model="selectedAll"
					hide-details
					@change="updateCheckboxes(selectedAll)"
				/>
			</template>
			<v-card-text class="py-0">
				<v-list
					v-for="(list, key) in data"
					:key="key"
					lines="two"
				>
					<v-list-subheader>{{ key.toLocaleUpperCase() }}</v-list-subheader>
					<div v-if="key === 'workouts'">
						<PreviewWorkoutItem
							v-for="(workout, index) in list"
							:key="index"
							:workout="(workout as Workout)"
							:index="[key, workout.id]"
							@update-main-checkbox="updateMainCheckbox"
						/>
					</div>
					<div v-else-if="key === 'objectives'">
						<PreviewObjective
							v-for="(listItem, index) in list"
							:key="index"
							:objective="(listItem as Objective)"
							:index="[key, listItem.id]"
							@update-main-checkbox="updateMainCheckbox"
						/>
					</div>
					<div v-else>
						<PreviewPersonalValue
							v-for="(listItem, index) in list"
							:key="index"
							:personal-value="(listItem as Measurement | PersonalRecord)"
							:index="[key, listItem.id]"
							@update-main-checkbox="updateMainCheckbox"
						/>
					</div>
				</v-list>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					v-if="action === FileAction.EXPORT"
					color="secondary"
					:disabled="!isActionButtonEnabled"
				>
					Generate
					<FileGenerator
						:workoutList="workoutsSelected"
						@close-menu="downloadedWorkouts"
					/>
				</v-btn>
				<v-btn
					v-else
					color="secondary"
					:disabled="!isActionButtonEnabled"
					@click="importData"
				>
					Import
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'
import { useStoreUser } from '@/stores/user'
import { Workout } from '@/types/WorkoutsTypes'
import { FileAction } from '@/enums/HomeEnums'
import { Measurement, Objective, PersonalRecord } from '@/types/PersonalTypes'

const storeWorkouts = useStoreWorkouts()
const storeUser = useStoreUser()

const emit = defineEmits(['downloaded-workouts'])
const props = defineProps<{
	data: {
		workouts: Workout[]
		personalRecords?: PersonalRecord[]
		measurements?: Measurement[]
		objectives?: Objective[]
	}
	action: string
}>()

const previewList = ref(false)
const selected: Ref<Record<string, Record<string, boolean>>> = ref({
	workouts: {},
	measurements: {},
	personalRecords: {},
	objectives: {}
})
const selectedAll = ref(false)

const isActionButtonEnabled = computed(() =>
	Object.values(selected.value).some(item =>
		Object.values(item).some(item => item)
	)
)

// @ts-ignore
const workoutsSelected: ComputedRef<Workout[]> = computed(() => {
	return Object.keys(selected.value.workouts)
		.filter(key => selected.value.workouts[key])
		.map(key => props.data.workouts.find(workout => workout.id === key))
})

// @ts-ignore
const measurementsSelected: ComputedRef<Measurement[]> = computed(() => {
	if (!props.data?.measurements) return
	return Object.keys(selected.value.measurements)
		.filter(key => selected.value.measurements[key])
		.map(key =>
			(props.data.measurements as Measurement[]).find(
				measurement => measurement.id === key
			)
		)
})

// @ts-ignore
const personalRecordsSelected: ComputedRef<PersonalRecord[]> = computed(() => {
	if (!props.data?.personalRecords) return
	return Object.keys(selected.value.personalRecords)
		.filter(key => selected.value.personalRecords[key])
		.map(key =>
			(props.data.personalRecords as PersonalRecord[]).find(
				personalRecord => personalRecord.id === key
			)
		)
})

// @ts-ignore
const objectivesSelected: ComputedRef<Objective[]> = computed(() => {
	if (!props.data?.objectives) return
	return Object.keys(selected.value.objectives)
		.filter(key => selected.value.objectives[key])
		.map(key =>
			(props.data.objectives as Objective[]).find(
				objective => objective.id === key
			)
		)
})

const downloadedWorkouts = (fileName: string) => {
	emit('downloaded-workouts', fileName)
	previewList.value = false
}

const importData = () => {
	if (workoutsSelected.value) {
		storeWorkouts.importWorkouts(workoutsSelected.value)
	}
	if (measurementsSelected.value) {
		storeUser.importMeasurements(measurementsSelected.value)
	}
	if (personalRecordsSelected.value) {
		storeUser.importPersonalRecords(personalRecordsSelected.value)
	}
	if (objectivesSelected.value) {
		storeUser.importObjectives(objectivesSelected.value)
	}
}

const updateCheckboxes = (value: boolean) => {
	Object.keys(props.data).forEach(key => {
		// @ts-ignore
		Object.values(props.data[key]).forEach(item => {
			// @ts-ignore
			selected.value[key][item.id] = value
		})
	})
}

const updateMainCheckbox = (payload: {
	value: boolean
	index: Array<number | string>
}) => {
	const { value, index } = payload
	selected.value[index[0]][index[1]] = value
	selectedAll.value = Object.values(selected.value).every(item =>
		Object.values(item).every(item => item)
	)
}

onMounted(() => {
	updateCheckboxes(false)
})
</script>
