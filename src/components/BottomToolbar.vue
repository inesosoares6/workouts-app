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
			:width="`${100 / buttons?.length}%`"
		>
			<v-icon>{{ button.icon }}</v-icon>
			{{ button.title }}
		</v-btn>
	</v-bottom-navigation>
</template>

<script setup lang="ts">
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
		title: 'User',
		icon: 'mdi-account',
		to: 'PersonalView',
		value: 'user'
	}
])
const activeItem = ref(buttons.value[0].value)
</script>
