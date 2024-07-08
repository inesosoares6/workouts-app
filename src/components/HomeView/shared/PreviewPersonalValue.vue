<template>
	<v-list-item
		:value="personalValue"
		rounded="xl"
		:title="personalValue.name"
		:subtitle="`${personalValue.value.at(-1)} ${(personalValue as Measurement).unit ?? 'kg'}`"
	>
		<template v-slot:prepend>
			<v-avatar color="secondary">
				<v-icon>
					{{
						(personalValue as PersonalRecord).reps
							? 'mdi-weight-lifter'
							: 'mdi-scale-balance'
					}}
				</v-icon>
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
import { Measurement, PersonalRecord } from '@/types/PersonalTypes'

const props = defineProps<{
	modelValue?: boolean
	personalValue: Measurement | PersonalRecord
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
