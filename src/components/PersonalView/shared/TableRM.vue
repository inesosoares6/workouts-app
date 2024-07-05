<template>
	<v-table>
		<thead>
			<tr>
				<th
					class="text-center"
					v-for="k in headerArray"
					:key="k"
				>
					{{ k }} %
				</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td
					class="text-center"
					v-for="k in headerArray"
					:key="k"
				>
					{{ getRM(personalValue, k, -1) }}
				</td>
			</tr>
		</tbody>
	</v-table>
</template>

<script setup lang="ts">
import { getRM } from '@/helpers/math'
import { PersonalRecord } from '@/types/PersonalTypes'
defineProps<{
	headerArray: number[]
	personalValue: PersonalRecord
}>()
</script>
