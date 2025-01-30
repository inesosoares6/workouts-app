<template>
	<v-dialog
		v-model="fileGenerator"
		activator="parent"
	>
		<v-card>
			<ImportExportHeader title="Export" />
			<v-card-subtitle>Download and import in another device</v-card-subtitle>
			<v-card-text class="d-flex justify-center">
				<v-text-field
					v-model="name"
					label="File name"
					required
					hide-details
				/>
			</v-card-text>
			<v-card-actions>
				<v-checkbox
					v-model="shouldResetCompletions"
					label="Reset completions"
					hide-details
				/>
				<v-spacer />
				<v-btn
					color="secondary"
					@click="handleShare"
				>
					Share
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { formatDate, shareFile } from '@/helpers/utils'
import { Workout } from '@/types/WorkoutsTypes'
import { Clipboard } from '@capacitor/clipboard'

const emit = defineEmits(['close-menu'])
const props = defineProps<{
	workoutList: Workout[]
}>()

const fileGenerator = ref(false)
const shouldResetCompletions = ref(false)
const name = ref('')

const splitBigString = (str: string, chunkSize: number = 20000): string[] =>
	Array.from({ length: Math.ceil(str.length / chunkSize) }, (_, i) =>
		str.substring(i * chunkSize, Math.min((i + 1) * chunkSize, str.length))
	)

const handleShare = async () => {
	const payload = {
		workouts: shouldResetCompletions.value
			? props.workoutList.map(e => ({ ...e, completions: 0 }))
			: props.workoutList
	}
	const workoutsString = JSON.stringify(payload)
	if (workoutsString.length > 20000) {
		const chunks = splitBigString(workoutsString)
		chunks.forEach(async (chunk, index) => {
			await Clipboard.write({
				string: chunk
			})
			alert(
				`The file content was too big, so we had to split it. Content copied to clipboard [part ${
					index + 1
				}/${chunks.length}]`
			)
		})
	} else {
		await shareFile(
			name.value.length ? name.value : `Workouts-${formatDate(new Date())}`,
			payload
		)
	}

	fileGenerator.value = false
	emit('close-menu')
}
</script>
