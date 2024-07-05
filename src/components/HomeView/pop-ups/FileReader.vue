<template>
	<v-dialog
		v-model="fileReader"
		activator="parent"
	>
		<v-card class="mb">
			<ImportExportHeader
				:file="file"
				title="Import"
				@toggle-value="(val: boolean) => (file = val)"
			/>
			<div v-if="file">
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
			</div>
			<div v-else>
				<v-card-subtitle>
					Point your camera to the workouts' QR Code
				</v-card-subtitle>
				<v-card-text class="center stream">
					<qr-stream
						@decode="openPreviewList"
						class="mb"
					>
						<div
							style="color: red"
							class="frame"
						></div>
					</qr-stream>
				</v-card-text>
			</div>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['preview-imported-workouts'])

const fileReader = ref(false)
const file = ref(true)

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

<style scoped>
.stream {
	max-height: 500px;
	max-width: 500px;
	margin: auto;
}
.frame {
	border-style: solid;
	border-width: 2px;
	border-color: red;
	height: 200px;
	width: 200px;
	position: absolute;
	top: 0px;
	bottom: 0px;
	right: 0px;
	left: 0px;
	margin: auto;
}
</style>
