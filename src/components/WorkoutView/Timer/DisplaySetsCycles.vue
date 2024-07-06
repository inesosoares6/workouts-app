<template>
	<v-col cols="3">
		<p
			class="text-center font-weight-bold"
			style="font-size: 20px"
		>
			{{ currentValue }}/{{ totalValue }}
		</p>
		<p
			class="text-center text-grey-darken-1"
			style="font-size: 11px"
		>
			{{ text }}
		</p>
	</v-col>
</template>

<script setup lang="ts">
defineProps<{
	currentValue: number
	totalValue: number
	text: string
}>()
</script>
