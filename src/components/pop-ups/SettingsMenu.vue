<template>
	<v-dialog
		v-model="settingsMenu"
		activator="parent"
	>
		<v-card>
			<template v-slot:title>Settings</template>
			<v-card-text class="pb-0">
				<v-list>
					<v-list-item
						title="Dark Mode"
						class="pa-0"
					>
						<template v-slot:append>
							<v-switch
								v-model="isDarkMode"
								color="secondary"
								inset
								hide-details
								@change="toggleTheme"
							/>
						</template>
					</v-list-item>
					<v-list-item
						title="Group workouts by type"
						class="pa-0"
					>
						<template v-slot:append>
							<v-switch
								v-model="groupByTypeEnabled"
								color="secondary"
								inset
								hide-details
								@change="groupByTypeFunction"
							/>
						</template>
					</v-list-item>
				</v-list>
			</v-card-text>
			<v-divider />
			<v-card-text class="py-0">
				<v-list lines="two">
					<v-list-item
						title="Save all cache to file"
						subtitle="This will save all the stored data"
						class="pa-0"
						@click="saveAllCache"
					>
						<template v-slot:append>
							<v-icon>mdi-chevron-right</v-icon>
						</template>
					</v-list-item>
					<v-list-item
						title="Import data from another file"
						subtitle="Add data previously stored in file"
						class="pa-0"
					>
						<template v-slot:append>
							<v-icon>mdi-chevron-right</v-icon>
						</template>
						<FileReader
							dataType="data"
							@preview-imported-data="previewImportedData"
						/>
					</v-list-item>
					<v-list-item
						title="Delete all cache"
						subtitle="This will delete all the stored data"
						class="pa-0 text-red-darken-3"
					>
						<template v-slot:append>
							<v-icon>mdi-chevron-right</v-icon>
						</template>
						<ConfirmationPopup @confirm="deleteAllCache" />
					</v-list-item>
				</v-list>
			</v-card-text>
		</v-card>
	</v-dialog>
	<PreviewList
		v-if="imported && Object.keys(importedData).length"
		v-model="imported"
		:data="importedData"
		:action="FileAction.IMPORT"
		@completed="imported = false"
	/>
</template>

<script setup lang="ts">
import { ThemeValue } from '@/enums/AppEnums'
import { useStoreApp } from '@/stores/app'
import { useTheme } from 'vuetify'
import { FileAction } from '@/enums/HomeEnums'

const storeApp = useStoreApp()

const settingsMenu = ref(false)
const isDarkMode = ref(true)
const groupByTypeEnabled = ref(false)
const theme = ref(useTheme())

const importedData = ref()
const imported = ref(false)

const emit = defineEmits(['toggle-theme'])

const groupByTypeFunction = () => {
	storeApp.groupByTypeFunction(groupByTypeEnabled.value)
}

const toggleTheme = () => {
	emit('toggle-theme', isDarkMode.value ? ThemeValue.DARK : ThemeValue.LIGHT)
}

const deleteAllCache = () => {
	storeApp.deleteAllCache()
}

const saveAllCache = () => {
	storeApp.saveAllCache()
}

const previewImportedData = (data: string) => {
	importedData.value = JSON.parse(data)
	imported.value = true
}

onMounted(() => {
	isDarkMode.value = theme.value.global.name === ThemeValue.DARK
})

onUpdated(() => {
	groupByTypeEnabled.value = storeApp.groupByType
})
</script>
