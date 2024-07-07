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
							:index="[key, index]"
							@update-main-checkbox="updateMainCheckbox"
						/>
					</div>
					<div v-else>
						<PreviewPersonalValue
							v-for="(listItem, index) in list"
							:key="index"
							:personal-value="(listItem as Measurement | PersonalRecord)"
							:index="[key, index]"
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
					:disabled="!selected.length"
				>
					Generate
					<FileGenerator
						:workoutList="selected"
						@close-menu="downloadedWorkouts"
					/>
				</v-btn>
				<v-btn
					v-else
					color="secondary"
					:disabled="!selected.length"
					@click="importWorkouts"
				>
					Import
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStoreWorkouts } from '@/stores/workouts'
import { Workout } from '@/types/WorkoutsTypes'
import { FileAction } from '@/enums/HomeEnums'
import { Measurement, PersonalRecord } from '@/types/PersonalTypes'

const storeWorkouts = useStoreWorkouts()
const router = useRouter()

const emit = defineEmits(['downloaded-workouts'])
const props = defineProps<{
	data: {
		workouts: Workout[]
		personalRecords?: PersonalRecord[]
		measurements?: Measurement[]
	}
	action: string
}>()

const previewList = ref(false)
const selected = ref()
const selectedAll = ref(false)

const downloadedWorkouts = (fileName: string) => {
	emit('downloaded-workouts', fileName)
	previewList.value = false
}

const importWorkouts = () => {
	storeWorkouts.importWorkouts(selected.value)
	router.push('AllView')
}

const updateCheckboxes = (value: boolean) => {
	selected.value = []
	if (!value) return
	selected.value = [...Object.values(props.data)]
}

const updateMainCheckbox = (value: boolean, index: Array<number | string>) => {
	selected.value[index[0]][index[1]] = value
	selectedAll.value = selected.value.length === Object.values(props.data).length
}

onMounted(() => {
	updateCheckboxes(false)
})
</script>
