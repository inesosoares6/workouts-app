<template>
	<v-dialog
		v-model="settingsMenu"
		activator="parent"
		transition="dialog-bottom-transition"
		fullscreen
	>
		<v-card>
			<v-toolbar>
				<v-btn
					icon="mdi-close"
					@click="settingsMenu = false"
				/>

				<v-toolbar-title>Settings</v-toolbar-title>
			</v-toolbar>
			<v-card-text>
				<v-list class="d-flex flex-column ga-2">
					<v-list-item
						v-for="item in switchButtons"
						:key="item.label"
						:title="item.label"
					>
						<template v-slot:append>
							<v-switch
								v-model="item.value"
								color="secondary"
								inset
								hide-details
								@change="item.action"
							/>
						</template>
					</v-list-item>
					<v-divider class="mb-1" />
					<v-list-item
						v-for="button in actionButtons"
						:key="button.title"
						class="my-1"
						:title="button.title"
						:subtitle="button.subtitle"
						:class="`text-${button?.class}`"
					>
						<template v-slot:append>
							<v-icon>mdi-chevron-right</v-icon>
						</template>
						<component
							v-if="button?.component"
							:is="button.component"
							data-type="data"
							:button-class="button?.class"
							:text-confirmation="button?.textConfirmation"
							@preview-imported-data="button.action"
							@confirm="button.action"
						/>
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
import PreviewList from '@/components/HomeView/pop-ups/PreviewList.vue'
import ConfirmationPopup from '@/components/shared/ConfirmationPopup.vue'
import FileReader from '@/components/HomeView/pop-ups/FileReader.vue'

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

const saveUserData = () => {
	storeApp.saveUserData()
}

const previewImportedData = (data: string) => {
	importedData.value = JSON.parse(data)
	imported.value = true
}

const switchButtons = ref([
	{
		label: 'Dark Mode',
		value: isDarkMode,
		action: toggleTheme
	},
	{
		label: 'Group workouts by type',
		value: groupByTypeEnabled,
		action: groupByTypeFunction
	}
])

const actionButtons = shallowRef([
	{
		title: "Export the user's data to file",
		subtitle: "This will save the user's personal data",
		action: saveUserData,
		component: ConfirmationPopup,
		textConfirmation: 'Do you want to share the user data through a file?'
	},
	{
		title: 'Import data from another file',
		subtitle: 'Add data previously stored in file',
		action: previewImportedData,
		component: FileReader
	},
	{
		title: 'Delete all cache',
		subtitle: 'This will delete all the stored data',
		action: deleteAllCache,
		class: 'red-darken-3',
		component: ConfirmationPopup,
		textConfirmation:
			'Are you sure that you want to erase all the application cached data?'
	}
])

onMounted(() => {
	isDarkMode.value = theme.value.global.name === ThemeValue.DARK
})

onUpdated(() => {
	groupByTypeEnabled.value = storeApp.groupByType
})
</script>
