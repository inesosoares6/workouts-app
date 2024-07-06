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
						title="Delete all cache"
						subtitle="This will delete all the stored data"
						class="pa-0"
						@click="deleteAllCache"
					>
						<template v-slot:append>
							<v-icon>mdi-chevron-right</v-icon>
						</template>
					</v-list-item>
				</v-list>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useStoreApp } from '@/stores/app'
import { useTheme } from 'vuetify'

const storeApp = useStoreApp()

const settingsMenu = ref(false)
const isDarkMode = ref(true)
const groupByTypeEnabled = ref(false)
const theme = ref(useTheme())

const emit = defineEmits(['toggle-theme'])

const groupByTypeFunction = () => {
	storeApp.groupByTypeFunction(groupByTypeEnabled.value)
}

const toggleTheme = () => {
	emit('toggle-theme', isDarkMode.value ? 'dark' : 'light')
}

const deleteAllCache = () => {
	storeApp.deleteAllCache()
}

onMounted(() => {
	isDarkMode.value = theme.value.global.name === 'dark'
})

onUpdated(() => {
	groupByTypeEnabled.value = storeApp.groupByType
})
</script>

<style scoped lang="css"></style>
