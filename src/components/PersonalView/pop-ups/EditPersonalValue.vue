<template>
	<v-dialog
		v-model="editPersonalRecord"
		activator="parent"
	>
		<v-card :title="personalValue.name">
			<template v-slot:prepend>
				<v-icon
					v-if="isMeasurement"
					size="small"
					color="secondary"
				>
					mdi-scale-bathroom
				</v-icon>
				<v-icon
					v-else
					size="small"
					color="secondary"
				>
					mdi-clipboard-text
				</v-icon>
			</template>
			<v-card-text>
				<v-row>
					<v-col>
						<v-text-field
							v-model="newValue"
							label="New value"
							type="number"
							:suffix="(personalValue as Measurement)?.unit ?? 'kg'"
						/>
					</v-col>
					<v-col>
						<v-text-field
							v-model="newTargetValue"
							:label="isMeasurement ? 'New target' : 'Reps'"
							:suffix="(personalValue as Measurement)?.unit ?? ''"
							type="number"
						/>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card
				width="90%"
				style="margin: auto"
			>
				<v-tabs
					v-model="tab"
					color="secondary"
					align-tabs="center"
					fixed-tabs
				>
					<v-tab :value="1">
						{{ isMeasurement ? personalValue.name : 'RM' }} &nbsp;
						<v-icon>mdi-chart-timeline-variant</v-icon>
					</v-tab>
					<v-tab
						:value="2"
						v-if="!isMeasurement"
					>
						RM &nbsp;%
					</v-tab>
					<v-tab :value="3">
						Log &nbsp;
						<v-icon>mdi-history</v-icon>
					</v-tab>
				</v-tabs>
				<v-window v-model="tab">
					<v-window-item :value="1">
						<v-container
							fluid
							style="height: 232px"
						>
							<CardGraphs
								:personalValue="personalValue"
								:input="input"
								:color="color"
							/>
						</v-container>
					</v-window-item>
					<v-window-item
						:value="2"
						v-if="!isMeasurement"
					>
						<v-container fluid>
							<TableRM
								:personalValue="(personalValue as PersonalRecord)"
								:headerArray="[100, 90, 80, 70, 60]"
							/>
							<v-divider />
							<TableRM
								:personalValue="(personalValue as PersonalRecord)"
								:headerArray="[50, 40, 30, 20, 10]"
							/>
						</v-container>
					</v-window-item>
					<v-window-item :value="3">
						<v-container fluid>
							<TableLog :personalValue="personalValue" />
						</v-container>
					</v-window-item>
				</v-window>
			</v-card>
			<v-card-actions>
				<v-btn
					color="error"
					@click="deleteRecord(true)"
					:disabled="!personalValue.value"
				>
					Delete Last Entry
				</v-btn>
				<v-spacer />
				<v-btn
					color="secondary"
					@click="updateRecord"
					:disabled="!(newValue && newTargetValue)"
				>
					Update
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { PersonalValue } from '@/enums/PersonalEnums'
import { useStoreUser } from '@/stores/user'
import { Measurement, PersonalRecord } from '@/types/PersonalTypes'

const storeUser = useStoreUser()
const props = defineProps<{
	personalValue: PersonalRecord | Measurement
	input: PersonalValue
	color: string
}>()

const tab = ref(null)

const isMeasurement = computed(() => props.input === PersonalValue.MEASUREMENT)

const editPersonalRecord = ref(false)
const personalValueEdited = ref()
const newValue = ref(null)
const newTargetValue = ref(null)

const deleteRecord = (lastEntry: boolean) => {
	if (isMeasurement.value) {
		storeUser.deleteMeasurement(props.personalValue.id, lastEntry)
	} else {
		storeUser.deletePR(props.personalValue.id, lastEntry)
	}
}

const updateRecord = () => {
	personalValueEdited.value.value.push(newValue.value)
	let date = new Date().toString().split(' ')
	personalValueEdited.value.date.push(date[2] + ' ' + date[1] + ' ' + date[3])
	if (isMeasurement.value)
		personalValueEdited.value.target = newTargetValue.value
	else personalValueEdited.value.reps.push(newTargetValue.value)

	storeUser.updateValue(props.input, {
		id: props.personalValue.id,
		updates: personalValueEdited.value
	})
	newValue.value = null
	newTargetValue.value = null
	editPersonalRecord.value = false
}

onMounted(() => {
	personalValueEdited.value = { ...props.personalValue }
})
</script>

<style scoped lang="css">
.v-text-field :deep(input::-webkit-outer-spin-button),
.v-text-field :deep(input::-webkit-inner-spin-button) {
	appearance: none !important;
	-webkit-appearance: none !important;
	-moz-appearance: none !important;
}
</style>
