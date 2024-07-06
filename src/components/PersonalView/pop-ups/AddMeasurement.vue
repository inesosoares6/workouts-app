<template>
	<v-dialog
		v-model="addMeasurement"
		activator="parent"
	>
		<v-card>
			<template v-slot:title>Add Measurement</template>
			<v-card-text class="pb-0 mt-2">
				<v-form ref="form">
					<v-row>
						<v-col>
							<v-select
								v-model="measurement.name"
								:items="getTypes()"
								:rules="[(v: string) => !!v || 'Item is required']"
								label="Type"
								required
								hide-details
							/>
						</v-col>
						<v-col cols="4">
							<v-select
								v-model="measurement.unit"
								:items="getItems()"
								:rules="[(v: string) => !!v || 'Item is required']"
								label="Unit"
								required
							/>
						</v-col>
					</v-row>
					<v-row v-if="measurement.unit">
						<v-col>
							<v-text-field
								v-model="measurement.value[0]"
								:rules="[(v: number) => !!v || 'Field is required']"
								:suffix="measurement.unit"
								label="Value"
								type="number"
								required
							/>
						</v-col>
						<v-col cols="4">
							<v-text-field
								v-model="measurement.target"
								label="Target"
								:suffix="measurement.unit"
								type="number"
								required
							/>
						</v-col>
					</v-row>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					color="secondary"
					@click="addRecord"
					:disabled="
						!(measurement.name && measurement.unit && measurement.value[0])
					"
				>
					Add
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { Measures, Units } from '@/enums/PersonalEnums'
import { useStoreUser } from '@/stores/user'
import { Measurement } from '@/types/PersonalTypes'

const storeUser = useStoreUser()
const addMeasurement = ref(false)

const clearMeasurement = () => {
	return {
		id: '',
		name: '',
		value: [],
		unit: '',
		target: 0,
		date: []
	}
}

const measurement: Ref<Measurement> = ref(clearMeasurement())

const addRecord = () => {
	let date = new Date().toString().split(' ')
	measurement.value.date = [date[2] + ' ' + date[1] + ' ' + date[3]]
	if (!measurement.value.target)
		measurement.value.target = measurement.value.value[0]
	storeUser.addMeasurement(measurement.value)
	measurement.value = clearMeasurement()
	addMeasurement.value = false
}

const getItems = () => {
	if (
		measurement.value.name === Measures.WEIGHT ||
		measurement.value.name === Measures.MIG
	) {
		measurement.value.unit = Units.MASS
		return [Units.MASS]
	} else if (measurement.value.name === Measures.SKINFOLD) {
		measurement.value.unit = Units.SKINFOLD
		return [Units.SKINFOLD]
	} else if (measurement.value.name === Measures.WAIST_HEIGHT) {
		measurement.value.unit = Units.PERCENTAGE
		return [Units.PERCENTAGE]
	} else {
		return [Units.PERCENTAGE, Units.MASS]
	}
}

const getTypes = () => {
	let types = Object.values(Measures)
	if (!storeUser.measurements.length) return types
	storeUser.measurements.forEach(record => {
		types = types.filter(type => record.name !== type)
	})
	if (types.length === 1) {
		measurement.value.name = types[0]
	}
	return types
}
</script>

<style scoped lang="css">
.v-text-field :deep(input::-webkit-outer-spin-button),
.v-text-field :deep(input::-webkit-inner-spin-button) {
	appearance: none !important;
	-webkit-appearance: none !important;
	-moz-appearance: none !important;
}
</style>
