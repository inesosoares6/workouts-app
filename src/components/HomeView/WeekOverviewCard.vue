<template>
	<v-card>
		<template v-slot:prepend>
			<v-icon color="secondary">mdi-checkbox-marked-circle-outline</v-icon>
		</template>
		<template v-slot:title>Week Overview</template>
		<template v-slot:append>
			<v-btn
				icon
				flat
				size="small"
			>
				<v-icon color="secondary">mdi-timeline-text-outline</v-icon>
				<WeeklyReport />
			</v-btn>
		</template>

		<v-card-text class="pa-0 mx-3 mb-1">
			<v-timeline
				direction="horizontal"
				line-inset="8"
				truncate-line="both"
			>
				<v-timeline-item
					v-for="(item, index) in timeline"
					size="x-small"
					:key="index"
					:dot-color="timeline[index].color"
					@click="handleTimelineItemClick(item)"
				>
					<template v-if="index % 2">
						{{ item.day[0] }}
					</template>
					<template
						v-if="!(index % 2)"
						v-slot:opposite
					>
						{{ item.day[0] }}
					</template>
				</v-timeline-item>
			</v-timeline>
		</v-card-text>
		<DailyReport
			v-if="showWorkoutDone"
			:selectedDay="selectedDay"
		/>
	</v-card>
</template>

<script setup lang="ts">
import { useStoreApp } from '@/stores/app'
import { DayData } from '@/types/GeneralTypes'

const selectedDay = ref()
const showWorkoutDone = ref(false)

const storeApp = useStoreApp()
const timeline = computed(() => storeApp.timeline)

const handleTimelineItemClick = (item: DayData) => {
	showWorkoutDone.value = true
	selectedDay.value = item
}
</script>
