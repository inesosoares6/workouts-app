<template>
	<v-expansion-panels>
		<v-expansion-panel
			v-for="(list, index) in groupWorkoutsByType"
			:key="index"
			:title="(index as string)"
		>
			<v-expansion-panel-text>
				<ListWorkouts :list="list" />
			</v-expansion-panel-text>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'
import { Workout } from '@/types/WorkoutsTypes'

const storeWorkouts = useStoreWorkouts()

interface ListByType {
	[key: string]: Workout[]
}

const groupWorkoutsByType = computed(() => {
	const returnList: ListByType = [...storeWorkouts.getTypes].reduce(
		(item, key) => ({ ...item, [key]: [] }),
		{}
	)
	storeWorkouts.allWorkouts.forEach(item => {
		returnList[item.type].push(item)
	})
	return returnList
})
</script>
