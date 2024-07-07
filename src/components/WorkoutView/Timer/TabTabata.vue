<template>
	<DisplayTime :time="tabataTimer" />
	<v-row
		align="center"
		justify="center"
	>
		<DisplaySetsCycles
			text="Sets"
			:currentValue="currentSet"
			:totalValue="tabata.sets.value"
		/>
		<v-col
			cols="6"
			class="d-flex justify-center"
		>
			<ControlButtons
				:isRunning="isRunning.value"
				@play="tabataTimer.resume()"
				@pause="tabataTimer.pause()"
				@reload="resetTabata()"
			/>
		</v-col>
		<DisplaySetsCycles
			text="Cycles"
			:currentValue="currentCycle"
			:totalValue="tabata.cycles.value"
		/>
	</v-row>
</template>

<script setup lang="ts">
import { useTimer } from 'vue-timer-hook'
import { useStoreTimer } from '@/stores/timer'
import audioFileFinish from '@/assets/finish.mp3'
import audioFileBuzzer from '@/assets/buzzer.mp3'
import { TabataMode, TabataStatus } from '@/enums/WorkoutEnums'

const storeTimer = useStoreTimer()

const currentSet = ref(0)
const currentCycle = ref(0)
const tabataMode = ref(0)
let tabataTime = new Date()

const tabata = computed(() => storeTimer.tabata)

const isRunning = computed(() => tabataTimer.isRunning)

const tabataStatus = computed(() => {
	switch (tabataMode.value) {
		case TabataMode.PREPARE:
			return TabataStatus.PREPARE
		case TabataMode.WORK:
			return TabataStatus.WORK
		case TabataMode.REST_BETWEEN_CYCLES:
		case TabataMode.REST_BETWEEN_SETS:
			return TabataStatus.REST
		case TabataMode.FINISHED:
			return TabataStatus.FINISHED
	}
	return null
})

tabataTime.setSeconds(tabataTime.getSeconds() + tabata.value.prepareTime.value)
let tabataTimer = useTimer(+tabataTime)
tabataTimer.pause()

const restartTabata = (time: number) => {
	tabataTime = new Date()
	tabataTime.setSeconds(tabataTime.getSeconds() + time)
	tabataTimer.restart(+tabataTime)
	tabataTimer.pause()
}
const resetTabata = () => {
	restartTabata(tabata.value.prepareTime.value)
	currentCycle.value = 0
	currentSet.value = 0
	tabataMode.value = 0
}
const goToState = (time: number, state: number) => {
	restartTabata(time)
	tabataTimer.resume()
	tabataMode.value = state
}

onMounted(() => {
	watchEffect(async () => {
		const audioFinish = new Audio(audioFileFinish)
		const audioBuzzer = new Audio(audioFileBuzzer)
		if (tabataTimer.isExpired.value) {
			switch (tabataMode.value) {
				case TabataMode.PREPARE:
					currentCycle.value = 1
					currentSet.value = 1
					goToState(tabata.value.workTime.value, TabataMode.WORK)
					audioBuzzer.play()
					break
				case TabataMode.WORK:
					if (
						currentCycle.value === tabata.value.cycles.value &&
						currentSet.value < tabata.value.sets.value
					) {
						audioBuzzer.play()
						goToState(
							tabata.value.restBetweenSets.value > 0
								? tabata.value.restBetweenSets.value
								: tabata.value.restTime.value,
							TabataMode.REST_BETWEEN_SETS
						)
					} else if (currentCycle.value < tabata.value.cycles.value) {
						audioBuzzer.play()
						goToState(
							tabata.value.restTime.value,
							TabataMode.REST_BETWEEN_CYCLES
						)
					} else {
						audioFinish.play()
						tabataMode.value = TabataMode.FINISHED
					}
					break
				case TabataMode.REST_BETWEEN_CYCLES:
					currentCycle.value++
					goToState(tabata.value.workTime.value, TabataMode.WORK)
					audioBuzzer.play()
					break
				case TabataMode.REST_BETWEEN_SETS:
					currentCycle.value = 1
					currentSet.value++
					goToState(tabata.value.workTime.value, TabataMode.WORK)
					audioBuzzer.play()
					break
			}
		}
	})
})

watch(
	tabata,
	() => {
		resetTabata()
	},
	{ deep: true }
)

defineExpose({ isRunning, tabataStatus, resetTabata })
</script>
