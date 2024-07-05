<template>
	<v-bottom-navigation
		app
		fixed
		grow
		v-model="activeItem"
		color="primary"
	>
		<v-btn
			v-for="(button, index) in buttons"
			:key="index"
			:value="button.value"
			:to="button.to"
		>
			<v-icon>{{ button.icon }}</v-icon>
			{{ button.title }}
		</v-btn>
	</v-bottom-navigation>
</template>

<script setup lang="ts">
const activeItem = ref('home')
const buttons = ref([
	{
		title: 'Home',
		icon: 'mdi-home',
		to: '/',
		value: 'home'
	},
	{
		title: 'WOD',
		icon: 'mdi-dumbbell',
		to: 'WorkoutView',
		value: 'wod'
	},
	{
		title: 'All',
		icon: 'mdi-format-list-bulleted',
		to: 'AllView',
		value: 'all'
	},
	{
		title: 'Personal',
		icon: 'mdi-account',
		to: 'PersonalView',
		value: 'personal'
	}
])
</script>

<style scoped>
.v-icon {
	font-size: 16px;
	margin-bottom: 5px;
}
</style>
