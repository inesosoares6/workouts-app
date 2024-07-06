<template>
	<v-card-title>Evolution</v-card-title>
	<v-card-subtitle>
		{{ personalValue.date.at(0) }} - {{ personalValue.date.at(-1) }}
	</v-card-subtitle>
	<VueApexCharts
		type="line"
		:options="
			input === 'measurement'
				? chartOptionsWithTarget
				: personalValue.value.length === 1
				? chartOptionsWithoutTarget
				: chartOptions
		"
		:series="series"
		width="100%"
		height="70px"
		style="margin-top: 15px"
	/>
</template>

<script setup lang="ts">
import { getRMEvolution } from '@/helpers/math'
import { Measurement, PersonalRecord } from '@/types/PersonalTypes'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps<{
	personalValue: PersonalRecord | Measurement
	input: string
	color: string
}>()

const getMinMax = (value: number[], target?: number) => {
	const targetValue = target ?? (value.at(-1) as number)
	const max = Math.max(...[Math.max(...[...value, targetValue])])
	const min = Math.min(...[Math.min(...[...value, targetValue])])
	return min === max ? [min - 10, max + 10] : [min, max]
}

const series = ref([
	{
		name: props.personalValue.name,
		data:
			props.input === 'measurement'
				? props.personalValue.value
				: getRMEvolution(props.personalValue as PersonalRecord)
	}
])

const chartOptions = ref({
	chart: {
		id: 'records-evolution',
		group: 'sparks',
		type: 'line',
		sparkline: {
			enabled: true
		},
		zoom: {
			enabled: false
		},
		toolbar: {
			show: false
		}
	},
	colors: [props.color],
	tooltip: {
		theme: 'dark'
	},
	stroke: {
		curve: 'smooth'
	},
	grid: {
		padding: {
			top: 10,
			bottom: 10,
			left: 10,
			right: 10
		}
	},
	xaxis: {
		categories: props.personalValue.date
	},
	dataLabels: {
		enabled: false
	},
	markers: {
		size: 6,
		strokeWidth: 0,
		hover: {
			size: 9
		}
	}
})

const chartOptionsWithoutTarget = ref({
	yaxis: {
		min: getMinMax(props.personalValue.value)[0],
		max: getMinMax(props.personalValue.value)[1]
	},
	...chartOptions.value
})

const chartOptionsWithTarget = ref({
	annotations: {
		yaxis: [
			{
				y: (props.personalValue as Measurement).target,
				borderColor: '#AFADAD'
			}
		]
	},
	yaxis: {
		min: getMinMax(
			props.personalValue.value,
			(props.personalValue as Measurement).target
		)[0],
		max: getMinMax(
			props.personalValue.value,
			(props.personalValue as Measurement).target
		)[1]
	},
	...chartOptions.value
})

watch(
	() => [props.color, props.personalValue],
	() => {
		if (props.input === 'measurement') {
			chartOptionsWithTarget.value.colors = [props.color]
		} else {
			chartOptions.value.colors = [props.color]
		}
	}
)
</script>
