<template>
	<v-card>
		<template v-slot:prepend>
			<v-icon color="secondary">mdi-scale-bathroom</v-icon>
		</template>
		<template v-slot:title>Measurements</template>
		<template v-slot:append>
			<v-btn
				v-show="measurements.length < 6"
				icon
				flat
				size="35"
			>
				<v-icon size="small">mdi-plus</v-icon>
				<AddMeasurement />
			</v-btn>
		</template>
		<div v-if="measurements.length">
			<v-divider />
			<v-card-text>
				<v-row>
					<v-col
						v-for="(record, index) in measurements"
						:key="index"
						class="d-flex flex-column ga-2 align-center text-center"
						cols="4"
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
							:input="PersonalValue.MEASUREMENT"
							:color="convertColor(getMeasurementColor(record))"
						/>
						<p
							class="mt-1"
							style="font-size: 105%"
						>
							{{ record.name }}
						</p>
						<div>
							<v-btn
								icon
								flat
								size="x-small"
							>
								<v-icon color="grey">mdi-pencil</v-icon>
								<EditPersonalValue
									:personalValue="record"
									:input="PersonalValue.MEASUREMENT"
									:color="convertColor(getMeasurementColor(record))"
								/>
							</v-btn>
							<v-btn
								icon
								flat
								size="x-small"
								@click="storeUser.deleteMeasurement(record.id, false)"
							>
								<v-icon color="red">mdi-delete</v-icon>
							</v-btn>
						</div>
					</v-col>
				</v-row>
			</v-card-text>
		</div>
	</v-card>
</template>

<script setup lang="ts">
import { useStoreUser } from '@/stores/user'
import { Measurement } from '@/types/PersonalTypes'
import { Measures, PersonalValue, Units } from '@/enums/PersonalEnums'

const storeUser = useStoreUser()
const measurements = computed(() => storeUser.measurements)

const calculatePercentage = (measurement: Measurement) => {
	if (measurement.unit === Units.PERCENTAGE) return measurement.value.at(-1)
	const lastValue = measurement.value.at(-1) as number

	if (
		measurement.name === Measures.WEIGHT ||
		measurement.name === Measures.SKINFOLD
	) {
		if (measurement.target > lastValue) {
			// Overweight
			return (lastValue / measurement.target) * 100
		} else {
			// Underweight
			return (measurement.target / lastValue) * 100
		}
	} else {
		// Muscle Mass, MIG or Body Fat (in kg)
		const totalWeight = measurements.value
			.find(item => item.name === Measures.WEIGHT)
			?.value.at(-1) as number
		return Math.round((lastValue / totalWeight) * 100)
	}
}

const getMeasurementColor = (measurement: Measurement) => {
	if (measurement.value.length < 2) return 'secondary'
	const lastValue = measurement.value.at(-1) as number
	const secondLastValue = measurement.value.at(-2) as number
	switch (measurement.name) {
		case Measures.WEIGHT:
			return Math.abs(lastValue - measurement.target) <=
				Math.abs(secondLastValue - measurement.target)
				? 'secondary'
				: 'error'
		case Measures.MIG:
		case Measures.MUSCLE_MASS:
			return lastValue > secondLastValue ? 'secondary' : 'error'
		default:
			return lastValue <= secondLastValue ? 'secondary' : 'error'
	}
}

const convertColor = (color: string) => {
	return color === 'secondary' ? '#03dac5' : '#cf6679'
}
</script>
