<template>
	<DisplayTime :time="stopwatch" />
	<v-row
		align="center"
		justify="center"
		class="play-btns"
	>
		<ControlButtons
			:isRunning="isRunning.value"
			@play="stopwatch.start()"
			@pause="stopwatch.pause()"
			@reload="handleReload()"
		/>
	</v-row>
</template>

<script setup lang="ts">
import { useStopwatch } from 'vue-timer-hook'

const stopwatch = useStopwatch()
stopwatch.reset()
stopwatch.pause()

const isRunning = computed(() => stopwatch.isRunning)

const handleReload = () => {
	stopwatch.reset()
	stopwatch.pause()
}

defineExpose({ isRunning })
</script>

<style scoped lang="css">
.play-btns {
	margin-top: 22px;
}
</style>
