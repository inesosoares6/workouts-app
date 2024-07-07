<template>
	<v-dialog
		v-model="fileReader"
		activator="parent"
	>
		<v-card class="mb">
			<ImportExportHeader title="Import" />
			<v-card-subtitle>{{`Select the ${dataType} file`}}</v-card-subtitle>
			<v-card-text>
				<v-file-input
					type="file"
					:label="`Import ${dataType}`"
					accept=".json"
					@change="importFile"
					hide-details
				/>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
defineProps<{
  dataType: string
}>()

const emit = defineEmits(['preview-imported-data'])

const fileReader = ref(false)

const openPreviewList = (list: string | ArrayBuffer | null) => {
	emit('preview-imported-data', list)
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
