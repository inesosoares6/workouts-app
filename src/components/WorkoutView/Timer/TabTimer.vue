<template>
	<DisplayTime :time="timer" />
	<v-row
		align="center"
		justify="center"
		class="mt-1"
	>
		<ControlButtons
			:isRunning="isRunning.value"
			@play="timer.resume()"
			@pause="timer.pause()"
			@reload="restartTimer()"
		/>
	</v-row>
</template>

<script setup lang="ts">
import { useStoreTimer } from '@/stores/timer'
import { useTimer } from 'vue-timer-hook'
import audioFile from '@/assets/finish.mp3'

const storeTimer = useStoreTimer()
const seconds = computed(() => storeTimer.getTimer)
const isRunning = computed(() => timer.isRunning)

let time = new Date()
time.setSeconds(time.getSeconds() + seconds.value)
let timer = useTimer(+time)
timer.pause()

const restartTimer = () => {
	const time = new Date()
	time.setSeconds(time.getSeconds() + seconds.value)
	timer.restart(+time)
	timer.pause()
}

onMounted(() => {
	watchEffect(async () => {
		const audioFinish = new Audio(audioFile)
		if (timer.isExpired.value) {
			audioFinish.play()
		}
	})
})

defineExpose({ isRunning, restartTimer })
</script>
