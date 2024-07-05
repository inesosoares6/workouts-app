<template>
	<v-card
		:color="getColor()"
		height="200px"
	>
		<v-card-title>
			<v-row class="timer-title">
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
				<v-spacer />
				<span
					class="tabata-text"
					v-if="mode === 2"
				>
					{{ tabataStatus }}
				</span>
				<v-spacer />
				<v-text-field
					v-if="mode === 1"
					v-model="seconds"
					class="centered-input"
					variant="underlined"
					theme="light"
					type="number"
					label="Timer"
					suffix="s"
				/>
				<v-btn
					v-if="mode === 2"
					size="small"
					icon
					flat
					color="transparent"
					style="margin-right: 5px"
				>
					<v-icon>mdi-cog</v-icon>
					<TabataSettings @updateTimes="tabataTabRef.resetTabata()" />
				</v-btn>
			</v-row>
		</v-card-title>
		<v-card-text>
			<TabStopwatch
				v-if="mode === 0"
				ref="stopwatchTabRef"
			/>
			<TabTimer
				v-else-if="mode === 1"
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
import { useStoreTimer } from '@/stores/timer'

const storeTimer = useStoreTimer()
const mode = ref(0)
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
		storeTimer.updateTimer(val)
		// @ts-ignore
		timerTabRef.value.restartTimer()
	}
})

const isRunning = computed(() => {
	if (mode.value === 0) {
		// @ts-ignore
		return stopwatchTabRef.value ? stopwatchTabRef.value.isRunning.value : false
	} else if (mode.value === 1) {
		// @ts-ignore
		return timerTabRef.value ? timerTabRef.value.isRunning.value : false
	} else {
		// @ts-ignore
		return tabataTabRef.value ? tabataTabRef.value.isRunning.value : false
	}
})

const tabataStatus = computed(() =>
	// @ts-ignore
	tabataTabRef.value ? tabataTabRef.value.tabataStatus : ''
)

const getColor = () => {
	if (isRunning.value && mode.value !== 2) {
		return 'error'
	} else if (isRunning.value && mode.value === 2) {
		switch (tabataStatus.value) {
			case 'PREPARE':
			case 'FINISHED':
			case 'REST':
				return 'warning'
			case 'WORK':
				return 'error'
		}
	} else {
		return 'secondary'
	}
}
</script>

<style scoped lang="css">
.v-text-field {
	width: 1% !important;
	margin-right: 5px;
}

.v-card-title {
	margin-bottom: 10px;
	margin-top: 0px;
}

.timer-title {
	margin-top: 5px;
	height: 55px;
}

.tabata-text {
	margin-top: 8px;
}

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
