<template>
	<v-card>
		<template v-slot:prepend>
			<v-icon
				class="title-icon"
				color="secondary"
			>
				mdi-weight-lifter
			</v-icon>
		</template>
		<template v-slot:title>Personal Records</template>
		<template v-slot:append>
			<v-btn
				icon
				color="transparent"
				size="35"
				flat
			>
				<v-icon size="small">mdi-plus</v-icon>
				<AddPersonalRecord />
			</v-btn>
		</template>
		<div v-if="personalRecords.length">
			<v-divider />
			<v-card-text>
				<v-list>
					<v-list-item
						v-for="(record, index) in personalRecords"
						:key="index"
						:value="record"
						:title="`${record.name}: ${record.value.at(
							-1
						)} kg - ${record.reps.at(-1)} reps`"
						rounded="xl"
					>
						<template v-slot:prepend>
							<v-avatar
								size="25"
								:color="getColor(record, true)"
							>
								<v-icon size="small">mdi-dumbbell</v-icon>
							</v-avatar>
						</template>
						<template v-slot:append>
							<v-btn
								@click="storeUser.deletePR(record.id, false)"
								size="small"
								icon
								flat
							>
								<v-icon color="red">mdi-delete</v-icon>
							</v-btn>
						</template>
						<EditPersonalValue
							:personalValue="record"
							:input="PersonalValue.RECORD"
							:color="getColor(record, false)"
						/>
					</v-list-item>
				</v-list>
			</v-card-text>
		</div>
	</v-card>
</template>

<script setup lang="ts">
import { getRM } from '@/helpers/math'
import { useStoreUser } from '@/stores/user'
import { PersonalRecord } from '@/types/PersonalTypes'
import { PersonalValue } from '@/enums/PersonalEnums'

const storeUser = useStoreUser()

const personalRecords = computed(() => storeUser.personalRecords)

const getColor = (array: PersonalRecord, avatar: boolean) => {
	if (array.value.length === 1) return avatar ? 'secondary' : '#03dac5'
	return getRM(array, 100, -1) > getRM(array, 100, -2)
		? avatar
			? 'secondary'
			: '#03dac5'
		: avatar
		? 'error'
		: '#ffcc80'
}
</script>
