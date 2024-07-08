<template>
	<v-card>
		<template v-slot:prepend>
			<v-icon color="secondary">mdi-swap-horizontal</v-icon>
		</template>
		<template v-slot:title>Exchange Workouts</template>

		<v-card-text>
			<v-row>
				<v-col class="d-flex justify-center">
					<v-btn
						variant="outlined"
						append-icon="mdi-arrow-top-right"
					>
						Send
						<PreviewList
							v-if="allWorkouts.length"
							:data="{ workouts: allWorkouts }"
							action="export"
						/>
					</v-btn>
				</v-col>
				<v-col class="d-flex justify-center">
					<v-btn
						variant="outlined"
						prepend-icon="mdi-arrow-bottom-left"
					>
						Receive
						<FileReader
							dataType="workouts"
							@preview-imported-data="previewImportedWorkouts"
						/>
					</v-btn>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>

	<PreviewList
		v-model="imported"
		v-if="imported && Object.keys(importedWorkouts).length"
		:data="importedWorkouts"
		:action="FileAction.IMPORT"
		@completed="imported = false"
	/>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'
import { FileAction } from '@/enums/HomeEnums'

const storeWorkouts = useStoreWorkouts()
const importedWorkouts = ref()
const imported = ref(false)

const allWorkouts = computed(() => storeWorkouts.allWorkouts)

const previewImportedWorkouts = (workouts: string) => {
	importedWorkouts.value = JSON.parse(workouts)
	imported.value = true
}
</script>
