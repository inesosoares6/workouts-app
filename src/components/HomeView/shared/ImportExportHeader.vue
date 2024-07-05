<template>
	<v-card-title>
		{{ title }}
		<v-btn-toggle border>
			<v-btn
				:active="file"
				@click="$emit('toggle-value', true)"
			>
				File
			</v-btn>
			<v-btn
				:active="!file"
				@click="$emit('toggle-value', false)"
			>
				QR Code
			</v-btn>
		</v-btn-toggle>
	</v-card-title>
</template>

<script setup lang="ts">
defineProps<{
	title: string
	file: boolean
}>()
</script>
