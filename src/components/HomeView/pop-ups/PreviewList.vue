<template>
	<v-dialog
		v-model="previewList"
		activator="parent"
	>
		<v-card title="Select Workouts">
			<template v-slot:append>
				<v-checkbox
					v-model="selectedAll"
					hide-details
					@change="updateCheckboxes(selectedAll)"
				/>
			</template>
			<v-card-text>
				<v-list
					class="preview-wod-list"
					lines="two"
					v-if="workouts.length"
				>
					<v-list-item
						v-for="(workout, key) in workouts"
						:key="key"
						:value="workout"
						rounded="xl"
						:title="workout.name"
						:subtitle="workout.type + ' - ' + workout.time + ' min'"
					>
						<template v-slot:prepend>
							<v-avatar :color="workout.completions ? 'secondary' : 'error'">
								<v-icon>mdi-dumbbell</v-icon>
							</v-avatar>
						</template>
						<template v-slot:append>
							<v-checkbox
								v-model="selected[key]"
								hide-details
								@change="updateMainCheckbox()"
							/>
						</template>
					</v-list-item>
				</v-list>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					v-if="action === 'export'"
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

const storeWorkouts = useStoreWorkouts()
const router = useRouter()

const emit = defineEmits(['downloaded-workouts'])
const props = defineProps<{
	workouts: Workout[]
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
	selected.value = [...props.workouts]
}

const updateMainCheckbox = () => {
	selectedAll.value = selected.value.length === props.workouts.length
}

onMounted(() => {
	updateCheckboxes(false)
})
</script>

<style scoped lang="css">
.preview-wod-list {
	max-height: 500px;
	overflow-y: auto;
}
</style>
