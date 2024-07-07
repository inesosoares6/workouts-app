<template>
	<v-card-title class="d-flex align-center ga-3">
		{{ title }}
		<v-btn-toggle border>
			<v-btn :active="true">File</v-btn>
		</v-btn-toggle>
	</v-card-title>
</template>

<script setup lang="ts">
defineProps<{
	title: string
}>()
</script>
