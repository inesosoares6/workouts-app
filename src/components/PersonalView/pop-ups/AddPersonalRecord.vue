<template>
	<v-dialog
		v-model="addPersonalRecord"
		activator="parent"
	>
		<v-card>
			<v-card-title>Add Personal Record</v-card-title>
			<v-card-text>
				<v-form ref="form">
					<v-text-field
						v-model="record.name"
						:rules="[(v: string) => !!v || 'Field is required']"
						label="Name"
						required
						autofocus
					/>
					<v-row>
						<v-col>
							<v-text-field
								v-model="record.value[0]"
								:rules="[(v: number) => !!v || 'Field is required']"
								label="Value"
								type="number"
								suffix="kg"
								required
							/>
						</v-col>
						<v-col>
							<v-text-field
								v-model="record.reps[0]"
								:rules="[(v: number) => !!v || 'Field is required']"
								label="Reps"
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
					:disabled="!(record.name && record.value[0] && record.reps[0])"
				>
					Add
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useStoreUser } from '@/stores/user'
import { PersonalRecord } from '@/types/PersonalTypes';

const storeUser = useStoreUser()
const addPersonalRecord = ref(false)
const clearRecord = () => {
	return {
    id: '',
		name: '',
		value: [],
		reps: [],
		date: []
	}
}

const record: Ref<PersonalRecord> = ref(clearRecord())

const addRecord = () => {
	let date = new Date().toString().split(' ')
	record.value.date = [date[2] + ' ' + date[1] + ' ' + date[3]]
	storeUser.addPR(record.value)
	record.value = clearRecord()
	addPersonalRecord.value = false
}
</script>

<style scoped lang="css">
.v-card-title {
	margin-top: 10px;
}

.v-text-field :deep(input::-webkit-outer-spin-button),
.v-text-field :deep(input::-webkit-inner-spin-button) {
	appearance: none !important;
	-webkit-appearance: none !important;
	-moz-appearance: none !important;
}
</style>
