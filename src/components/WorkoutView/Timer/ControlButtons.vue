<template>
	<v-btn
		v-for="(button, index) in buttons"
		:key="index"
		class="stopwatch-btns"
		size="x-small"
		color="grey"
		icon
		@click="$emit(button)"
	>
		<v-icon>{{ button === 'reload' ? `mdi-${button}` : buttonIcon }}</v-icon>
	</v-btn>
</template>

<script setup lang="ts">
const props = defineProps<{
	isRunning: boolean
}>()

defineEmits(['play', 'pause', 'reload'])

const buttons = computed(() =>
	props.isRunning ? ['pause', 'reload'] : ['play', 'reload']
)

const buttonIcon = computed(() => (props.isRunning ? 'mdi-pause' : 'mdi-play'))
</script>

<style scoped lang="css">
.stopwatch-btns {
	margin-left: 5px;
	margin-right: 5px;
	margin-bottom: 10px;
}
</style>
