<template>
	<v-table
		fixed-header
		height="200px"
	>
		<thead>
			<tr>
				<th class="text-center">Value</th>
				<th class="text-center">
					{{ personalValue?.reps ? 'Reps' : 'Date' }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="(item, index) in personalValue.value"
				:key="index"
			>
				<td class="text-center">{{ item }} kg</td>
				<td class="text-center">
					{{ secondColumn[index] }}
				</td>
			</tr>
		</tbody>
	</v-table>
</template>

<script setup lang="ts">
import { PersonalRecord } from '@/types/PersonalTypes'

const props = defineProps<{
	personalValue: PersonalRecord
}>()

const secondColumn = computed(
	() => props.personalValue?.reps ?? props.personalValue?.date
)
</script>
