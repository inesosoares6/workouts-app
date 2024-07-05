<template>
	<v-card title="Measurements">
		<template v-slot:prepend>
			<v-icon
				class="title-icon"
				color="secondary"
			>
				mdi-scale-bathroom
			</v-icon>
		</template>
		<template v-slot:append>
			<v-btn
				v-show="Object.keys(measurements).length < 6"
				icon
				flat
				size="35"
			>
				<v-icon size="small">mdi-plus</v-icon>
				<AddMeasurement />
			</v-btn>
		</template>
		<v-divider />
		<v-card-text>
			<div class="text-center">
				<v-row class="center-btns">
					<v-col
						class="measurements"
						v-for="(record, index) in measurements"
						:key="index"
					>
						<v-progress-circular
							:rotate="360"
							:size="80"
							:width="10"
							:model-value="calculatePercentage(record)"
							:color="getMeasurementColor(record)"
						>
							{{ record.value[record.value.length - 1] }}
							{{ record.unit }}
						</v-progress-circular>
						<EditPersonalValue
							:personalValue="record"
							:id="index"
							:input="'measurement'"
							:color="convertColor(getMeasurementColor(record))"
						/>
						<br />
						<v-divider thickness="0px" />
						<p style="font-size: 105%">{{ record.name }}</p>
						<v-btn
							icon
							flat
							size="x-small"
						>
							<v-icon color="grey">mdi-pencil</v-icon>
							<EditPersonalValue
								:personalValue="record"
								:id="index"
								:input="'measurement'"
								:color="convertColor(getMeasurementColor(record))"
							/>
						</v-btn>
						<v-btn
							icon
							flat
							size="x-small"
							@click="storeUser.deleteMeasurement(index, false)"
						>
							<v-icon color="red">mdi-delete</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</div>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import { useStoreUser } from '@/stores/user'
import { Measurement } from '@/types/PersonalTypes'

const storeUser = useStoreUser()
const measurements = computed(() => storeUser.measurements)

const calculatePercentage = (measurement: Measurement) => {
	if (measurement.unit === '%') return measurement.value[-1]

	if (measurement.name === 'Weight' || measurement.name === 'Skinfold') {
		if (measurement.target > measurement.value[-1]) {
			// Overweight
			return (measurement.value[-1] / measurement.target) * 100
		} else {
			// Underweight
			return (measurement.target / measurement.value[-1]) * 100
		}
	} else {
		// Muscle Mass, MIG or Body Fat (in kg)
		const totalWeight = measurements.value.find(
			item => item.name === 'Weight'
		)?.value
		return Math.round(
			(measurement.value[-1] / (totalWeight as number[])[-1]) * 100
		)
	}
}

const getMeasurementColor = (measurement: Measurement) => {
	if (measurement.value.length < 2) return 'secondary'
	switch (measurement.name) {
		case 'Weight':
			return Math.abs(measurement.value[-1] - measurement.target) <=
				Math.abs(measurement.value[-2] - measurement.target)
				? 'secondary'
				: 'error'
		case 'MIG':
		case 'Muscle Mass':
			return measurement.value[-1] > measurement.value[-2]
				? 'secondary'
				: 'error'
		default:
			return measurement.value[-1] <= measurement.value[-2]
				? 'secondary'
				: 'error'
	}
}

const convertColor = (color: string) => {
	return color === 'secondary' ? ['#03dac5'] : ['#cf6679']
}
</script>
