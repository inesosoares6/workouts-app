<template>
	<v-dialog
		v-model="settingsMenu"
		activator="parent"
	>
		<v-card>
			<v-card-title>Settings</v-card-title>
			<v-card-text style="padding: 0px 20px 0px 20px">
				<v-list>
					<v-list-item
						title="Dark Mode"
						style="padding: 0px"
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
						style="padding: 0px"
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
			<v-card-text style="padding: 0px 20px 0px 20px">
				<v-list lines="two">
					<v-list-item
						title="Delete all cache"
						subtitle="This will delete all the stored data"
						style="padding: 0px"
						@click="deleteAllCache"
					>
						<template v-slot:append>
							<v-icon class="material-icons">mdi-chevron-right</v-icon>
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

onMounted(() => {
	isDarkMode.value = theme.value.global.name === 'dark'
})

onUpdated(() => {
	groupByTypeEnabled.value = storeApp.groupByType
})

const groupByTypeFunction = () => {
	storeApp.groupByTypeFunction(groupByTypeEnabled.value)
}

const toggleTheme = () => {
	emit('toggle-theme', isDarkMode.value ? 'dark' : 'light')
}

const deleteAllCache = () => {
	storeApp.deleteAllCache()
}
</script>

<style>
.v-divider {
	margin-top: 10px;
	margin-bottom: 10px;
}

.v-row {
	margin-top: 10px;
}

.material-icons {
	margin-right: 5px;
	margin-top: 20px;
}
</style>
