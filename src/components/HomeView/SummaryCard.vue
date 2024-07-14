<template>
	<v-card>
		<template v-slot:prepend>
			<v-icon color="secondary">mdi-clipboard-check-multiple-outline</v-icon>
		</template>

		<template v-slot:title>WODs Summary</template>

		<v-card-text class="mt-2">
			<v-row>
				<v-col
					v-for="(info, index) in summaryInfo"
					:key="index"
					class="d-flex flex-column ga-3 align-center font-weight-regular"
					style="font-size: 20px"
				>
					<v-avatar
						size="60"
						:color="info.color"
					>
						{{ info.data }}
					</v-avatar>
					{{ info.label }}
				</v-col>
			</v-row>
			<v-divider
				v-if="getWorkoutSummary.types.length"
				class="my-4"
			/>
			<v-slide-group>
				<v-slide-group-item
					v-for="(item, index) in getWorkoutSummary.types"
					:key="index"
				>
					<div class="d-flex flex-column ga-2 align-center mx-2">
						<v-avatar color="secondary">{{ item.value }}</v-avatar>
						{{ item.type }}
					</div>
				</v-slide-group-item>
			</v-slide-group>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'
import { storeToRefs } from 'pinia'

const storeWorkouts = useStoreWorkouts()
const { getWorkoutSummary } = storeToRefs(storeWorkouts)

const summaryInfo = computed(() => [
	{
		label: 'Done',
		data: getWorkoutSummary.value.done,
		color: 'secondary'
	},
	{
		label: 'To Do',
		data: getWorkoutSummary.value.todo,
		color: 'error'
	}
])
</script>

<style lang="css">
.v-slide-group__content {
	justify-content: center;
}
</style>
