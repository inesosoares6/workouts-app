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

const emit = defineEmits(['close-menu'])
const props = defineProps<{
	workoutList: Workout[]
}>()

const fileGenerator = ref(false)
const name = ref('')

const handleShare = async () => {
	await shareFile(
		name.value.length ? name.value : `Workouts-${formatDate(new Date())}`,
		{
			workouts: props.workoutList
		}
	)
	fileGenerator.value = false
	emit('close-menu')
}
</script>
