<template>
	<v-dialog
		v-model="addObjectiveModal"
		activator="parent"
	>
		<v-card>
			<template v-slot:title>Add Objective</template>
			<v-card-text class="pb-0 mt-2">
				<v-form ref="form">
					<v-text-field
						v-model="objective.text"
						:rules="[(v: string) => !!v || 'Field is required']"
						label="Objective"
						required
						autofocus
					/>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					color="secondary"
					@click="addObjective"
					:disabled="!objective.text"
				>
					Add
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useStoreUser } from '@/stores/user'
import { Objective } from '@/types/PersonalTypes'

const storeUser = useStoreUser()
const addObjectiveModal = ref(false)

const clearObjective = () => {
	return {
		id: '',
		text: '',
		date: '',
		dateDone: '',
		done: false
	}
}

const objective: Ref<Objective> = ref(clearObjective())

const addObjective = () => {
	objective.value.date = new Date()
	storeUser.addObjective(objective.value)
	objective.value = clearObjective()
	addObjectiveModal.value = false
}
</script>
