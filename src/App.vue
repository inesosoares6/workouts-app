<template>
	<v-app>
		<TopToolbar @toggle-theme="toggleTheme" />
		<v-main>
			<router-view />
		</v-main>
		<BottomToolbar />
	</v-app>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'

const theme = ref(useTheme())
const toggleTheme = (newTheme: string) => {
	// @ts-ignore
	theme.value.global.name = newTheme.toString()
	localStorage.setItem('themeString', newTheme)
}
</script>
