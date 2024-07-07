<template>
	<v-card
		:color="getColor"
		height="200px"
	>
		<v-card-title>
			<v-row
				class="mt-1 d-flex align-center justify-space-between"
				style="height: 55px"
			>
				<v-btn-toggle
					v-model="toggle_exclusive"
					divided
					:disabled="isRunning"
				>
					<v-btn
						v-for="(button, index) in buttonTabs"
						:key="index"
						size="small"
						@click="mode = index"
					>
						<v-icon>mdi-{{ button }}</v-icon>
					</v-btn>
				</v-btn-toggle>
				<span v-if="mode === TimerMode.TABATA">
					{{ tabataStatus }}
				</span>
				<v-text-field
					v-if="mode === TimerMode.TIMER"
					v-model="seconds"
					class="centered-input mr-3"
					variant="underlined"
					theme="light"
					type="number"
					label="Timer"
					suffix="s"
					hide-details
					style="max-width: 60px"
				/>
				<v-btn
					v-if="mode === TimerMode.TABATA"
					size="small"
					icon
					flat
					color="transparent"
					class="mr-1"
				>
					<v-icon>mdi-cog</v-icon>
					<TabataSettings  />
				</v-btn>
			</v-row>
		</v-card-title>
		<v-card-text>
			<TabStopwatch
				v-if="mode === TimerMode.STOPWATCH"
				ref="stopwatchTabRef"
			/>
			<TabTimer
				v-else-if="mode === TimerMode.TIMER"
				ref="timerTabRef"
			/>
			<TabTabata
				v-else
				ref="tabataTabRef"
			/>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import { TabataStatus, TimerMode } from '@/enums/WorkoutEnums'
import { useStoreTimer } from '@/stores/timer'

const storeTimer = useStoreTimer()
const mode = ref(TimerMode.STOPWATCH)
const toggle_exclusive = ref(0)
const buttonTabs = ref(['timer', 'timer-sand', 'camera-timer'])

// Tab Refs
const stopwatchTabRef = ref(null)
const timerTabRef = ref(null)
const tabataTabRef = ref(null)

const seconds = computed({
	get() {
		return storeTimer.getTimer
	},
	set(val) {
		storeTimer.updateTimer(+val)
		// @ts-ignore
		timerTabRef.value.restartTimer()
	}
})

const isRunning = computed(() => {
	if (mode.value === TimerMode.STOPWATCH) {
		// @ts-ignore
		return stopwatchTabRef.value ? stopwatchTabRef.value.isRunning.value : false
	} else if (mode.value === TimerMode.TIMER) {
		// @ts-ignore
		return timerTabRef.value ? timerTabRef.value.isRunning.value : false
	} else {
		// @ts-ignore
		return tabataTabRef.value ? tabataTabRef.value.isRunning.value : false
	}
})

const tabataStatus = computed(
	() =>
		// @ts-ignore
		tabataTabRef.value?.tabataStatus
)

const getColor = computed(() => {
	if (isRunning.value && mode.value !== TimerMode.TABATA) {
		return 'error'
	} else if (isRunning.value) {
		return tabataStatus.value === TabataStatus.WORK ? 'error' : 'warning'
	} else {
		return 'secondary'
	}
})
</script>

<style scoped lang="css">
.v-text-field :deep(input::-webkit-outer-spin-button),
.v-text-field :deep(input::-webkit-inner-spin-button) {
	appearance: none !important;
	-webkit-appearance: none !important;
	-moz-appearance: none !important;
}

.centered-input >>> input {
	text-align: center;
}
</style>
