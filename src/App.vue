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
const toggleTheme = (newTheme: string) => {
	// @ts-ignore
	theme.value.global.name = newTheme.toString()
	localStorage.setItem('themeString', newTheme)
}
</script>
