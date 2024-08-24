<template>
	<v-container class="d-flex flex-column ga-4">
		<WorkoutCard />
		<TimerCard />
	</v-container>
</template>

<script setup lang="ts">
onBeforeMount(() => {
	window.scrollTo(0, 0)
})
</script>
