<template>
	<v-dialog
		v-model="fileReader"
		activator="parent"
	>
		<v-card class="mb">
			<ImportExportHeader title="Import" />
			<v-card-subtitle>Select the workouts file</v-card-subtitle>
			<v-card-text>
				<v-file-input
					type="file"
					label="Import workouts"
					accept=".json"
					@change="importFile"
					hide-details
				/>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['preview-imported-workouts'])

const fileReader = ref(false)

const openPreviewList = (list: string | ArrayBuffer | null) => {
	emit('preview-imported-workouts', list)
	fileReader.value = false
}

const importFile = (event: { target: { files: any[] } }) => {
	const file = event.target.files[0]
	var reader = new FileReader()
	reader.addEventListener('load', () => {
		openPreviewList(reader.result)
	})
	reader.readAsText(file)
}
</script>
