<template>
	<v-app-bar
		app
		fixed
		dark
		color="primary"
	>
		<v-toolbar-title>Workouts App</v-toolbar-title>
		<!-- <v-btn icon>
        <v-icon>mdi-medal</v-icon>
      </v-btn> -->
		<v-btn icon>
			<v-icon>mdi-cog</v-icon>
			<SettingsMenu @toggle-theme="toggleTheme" />
		</v-btn>
	</v-app-bar>
</template>

<script setup lang="ts">
const emit = defineEmits(['toggle-theme'])

const toggleTheme = (theme: string) => {
	emit('toggle-theme', theme)
}
</script>
