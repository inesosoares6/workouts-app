<template>
	<div
		class="d-flex justify-center text-center pa-2 ga-4"
		style="font-size: 40px"
	>
		<span>{{ time.minutes }}</span>
		<span>:</span>
		<span>{{ time.seconds }}</span>
	</div>
</template>

<script setup lang="ts">
import { ResUseStopwatch, UseTimer } from 'vue-timer-hook'

defineProps<{
	time: ResUseStopwatch | UseTimer
}>()
</script>
