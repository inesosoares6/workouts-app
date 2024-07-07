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
					@click="downloadFile"
				>
					Download
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { Workout } from '@/types/WorkoutsTypes'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'

const emit = defineEmits(['close-menu'])
const props = defineProps<{
	workoutList: Workout[]
}>()

const fileGenerator = ref(false)
const name = ref('')

const closeMenu = (fileName: string) => {
	fileGenerator.value = false
	emit('close-menu', fileName)
}

const downloadFile = async () => {
	try {
		const fileName =
			(name.value.length === 0 ? 'Workout' : name.value) + '.json'
		await Filesystem.writeFile({
			path: fileName,
			data: JSON.stringify(props.workoutList, null, 4),
			directory: Directory.Documents,
			encoding: Encoding.UTF8
		})
		closeMenu(fileName)
	} catch (e) {
		alert('Unable to write file')
	}
}
</script>
