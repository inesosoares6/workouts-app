<template>
	<v-card>
		<v-card-title>{{ title }} Workout</v-card-title>
		<v-card-text>
			<v-form
				ref="formRef"
				v-model="valid"
				lazy-validation
			>
				<v-text-field
					v-model="workoutEdited.name"
					label="Name"
					required
					autofocus
				/>
				<v-row v-if="!showNewType && types.length">
					<v-col cols="10">
						<v-select
							v-model="workoutEdited.type"
							:items="types"
							label="Type"
							required
						/>
					</v-col>
					<v-col cols="2">
						<v-btn
							icon
							flat
							@click="showNewType = true"
						>
							<v-icon>mdi-plus</v-icon>
						</v-btn>
					</v-col>
				</v-row>
				<v-text-field
					v-else
					v-model="newType"
					label="Type"
					required
				/>
				<v-row>
					<v-col>
						<v-text-field
							v-model="workoutEdited.time"
							type="number"
							label="Time (min)"
							required
						/>
					</v-col>
					<v-col>
						<v-text-field
							v-model="workoutEdited.completions"
							type="number"
							label="Completions"
							required
						/>
					</v-col>
				</v-row>
				<v-textarea
					v-model="workoutEdited.exercises"
					label="Exercises"
					required
					hide-details
				/>
			</v-form>
		</v-card-text>
		<v-card-actions>
			<v-spacer />
			<v-btn
				color="error"
				@click="resetForm"
			>
				Reset
			</v-btn>
			<v-btn
				color="secondary"
				:disabled="checkFormValid"
				@click="submitWorkout"
			>
				{{ buttonText }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'
import { Workout } from '@/types/WorkoutsTypes'

const storeWorkouts = useStoreWorkouts()

const props = defineProps<{
	title: string
	workout?: Workout
	buttonText: string
}>()

const emit = defineEmits(['submit-workout'])

const workoutEdited = ref({
	name: '',
	type: '',
	time: 0,
	completions: 0,
	exercises: ''
})
const newType = ref('')
const valid = ref(true)
const formRef = ref(null)
const showNewType = ref(false)

const types = computed(() => storeWorkouts.getTypes)

const submitWorkout = () => {
	// @ts-ignore
	formRef.value.validate()
	if (valid.value) {
		workoutEdited.value.type = workoutEdited.value.type
			? workoutEdited.value.type
			: newType.value
		emit('submit-workout', workoutEdited.value)
	}
}

const checkFormValid = computed(
	() =>
		!(
			workoutEdited.value.name &&
			(workoutEdited.value.type || newType.value) &&
			workoutEdited.value.time >= 0 &&
			workoutEdited.value.completions >= 0 &&
			workoutEdited.value.exercises
		)
)

const resetForm = () => {
	// @ts-ignore
	formRef.value.reset()
}

onMounted(() => {
	if (props.workout) {
		workoutEdited.value = { ...props.workout }
	}
})
</script>

<style scoped>
.v-row {
	margin: -12px;
}
.v-text-field :deep(input::-webkit-outer-spin-button),
.v-text-field :deep(input::-webkit-inner-spin-button) {
	appearance: none !important;
	-webkit-appearance: none !important;
	-moz-appearance: none !important;
}
</style>
