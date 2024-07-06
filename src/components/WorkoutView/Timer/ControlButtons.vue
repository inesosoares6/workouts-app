<template>
	<v-btn
		v-for="(button, index) in buttons"
		:key="index"
		class="mx-1 mb-3"
		size="x-small"
		color="grey"
		icon
		@click="handleAction(button)"
	>
		<v-icon>
			{{ button === TimerControls.RELOAD ? `mdi-${button}` : buttonIcon }}
		</v-icon>
	</v-btn>
</template>

<script setup lang="ts">
import { TimerControls } from '@/enums/WorkoutEnums'

const props = defineProps<{
	isRunning: boolean
}>()

const emit = defineEmits(Object.values(TimerControls))

const buttons: ComputedRef<TimerControls[]> = computed(() =>
	props.isRunning
		? [TimerControls.PAUSE, TimerControls.RELOAD]
		: [TimerControls.PLAY, TimerControls.RELOAD]
)

const buttonIcon = computed(
	() => `mdi-${props.isRunning ? TimerControls.PAUSE : TimerControls.PLAY}`
)

const handleAction = (button: TimerControls) => {
	emit(button)
}
</script>
