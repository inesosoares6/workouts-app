<template>
	<v-dialog
		v-model="fileReader"
		activator="parent"
	>
		<v-card class="mb">
			<ImportExportHeader title="Import" />
			<v-card-subtitle>{{ `Select the ${dataType} file` }}</v-card-subtitle>
			<v-card-text>
				<v-file-input
					v-model="fileInput"
					type="file"
					:label="`Import ${dataType}`"
					accept=".json"
					hide-details
				/>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					color="secondary"
					:disabled="!fileInput"
					@click="importFile"
				>
					Import
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
defineProps<{
	dataType: string
}>()

const emit = defineEmits(['preview-imported-data'])

const fileReader = ref(false)
const fileInput = ref()

const openPreviewList = (list: string | ArrayBuffer | null) => {
	emit('preview-imported-data', list)
	fileReader.value = false
}

const importFile = () => {
	var reader = new FileReader()
	reader.addEventListener('load', () => {
		openPreviewList(reader.result)
	})
	reader.readAsText(fileInput.value)
}
</script>
