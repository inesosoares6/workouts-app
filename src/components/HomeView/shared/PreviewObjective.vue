<template>
	<v-list-item
		:value="objective"
		rounded="xl"
		:title="objective.text"
		:subtitle="`${formatDate(new Date(objective.dateDone ?? objective.date))}`"
	>
		<template v-slot:prepend>
			<v-avatar color="secondary">
				<v-icon>mdi-calendar-check</v-icon>
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
import { formatDate } from '@/helpers/utils'

const props = defineProps<{
	modelValue?: boolean
	objective: Objective
	index: Array<number | string>
}>()

const emit = defineEmits(['updateMainCheckbox'])

const selected = computed({
	get() {
		return props.modelValue
	},
	set(newValue) {
		emit('updateMainCheckbox', { value: newValue, index: props.index })
	}
})
</script>
