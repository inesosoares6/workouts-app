<template>
	<v-card title="Exchange Workouts">
		<template v-slot:prepend>
			<v-icon
				class="title-icon"
				color="secondary"
			>
				mdi-swap-horizontal
			</v-icon>
		</template>

		<v-card-text>
			<v-row>
				<v-col class="d-flex justify-center">
					<v-btn
						variant="outlined"
						append-icon="mdi-arrow-top-right"
					>
						Send
						<PreviewList
							v-if="Object.keys(allWorkouts).length > 0"
							:workouts="allWorkouts"
							action="export"
							@downloaded-workouts="downloadedWorkouts"
						/>
					</v-btn>
				</v-col>
				<v-col class="d-flex justify-center">
					<v-btn
						variant="outlined"
						prepend-icon="mdi-arrow-bottom-left"
					>
						Receive
						<FileReader @preview-imported-workouts="previewImportedWorkouts" />
					</v-btn>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>

	<PreviewList
		v-model="imported"
		v-if="imported && Object.keys(importedWorkouts).length"
		:workouts="importedWorkouts"
		action="import"
	/>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'

const storeWorkouts = useStoreWorkouts()
const importedWorkouts = ref({})
const imported = ref(false)

const allWorkouts = computed(() => storeWorkouts.allWorkouts)

const emit = defineEmits(['show-snackbar'])

const downloadedWorkouts = (fileName: string) => {
	if (fileName !== '') {
		emit('show-snackbar', fileName + ' exported to Documents folder.')
	}
}

const previewImportedWorkouts = (workouts: string) => {
	importedWorkouts.value = JSON.parse(workouts)
	imported.value = true
}
</script>
