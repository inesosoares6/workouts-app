<template>
	<v-list-item
		:value="objective"
		rounded="xl"
		:title="objective.text"
		:subtitle="`${objective.dateDone ?? objective.date}`"
	>
		<template v-slot:prepend>
			<v-avatar color="secondary">
				<v-icon>calendar-check</v-icon>
			</v-avatar>
		</template>
		<template v-slot:append>
			<v-checkbox
				v-model="selected"
				hide-details
				@change="$emit('updateMainCheckbox', { value: selected, index })"
			/>
		</template>
	</v-list-item>
</template>

<script setup lang="ts">
import { Objective } from '@/types/PersonalTypes'

defineProps<{
	objective: Objective
	index: Array<number | string>
}>()

const selected = ref(false)
</script>
