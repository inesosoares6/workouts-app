<template>
	<v-card title="Generate Random">
		<template v-slot:prepend>
			<v-icon
				class="title-icon"
				color="secondary"
			>
				mdi-dumbbell
			</v-icon>
		</template>

		<v-card-text>
			<v-row>
				<v-col>
					<v-text-field
						v-model="time"
						type="number"
						:rules="[(v: number) => v >= 0 || 'Time must be greater than 0']"
						label="Max time (min)"
						required
					/>
				</v-col>
				<v-col class="d-flex justify-center">
					<v-btn
						class="go-btn"
						prepend-icon="mdi-weight-lifter"
						color="secondary"
						@click="generateWorkout"
					>
						GO
					</v-btn>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'
import { Workout } from '@/types/WorkoutsTypes'
import { useRouter } from 'vue-router'

const storeWorkouts = useStoreWorkouts()
const router = useRouter()
const time = ref()

const emit = defineEmits(['show-snackbar'])

const getWODs = computed(() => storeWorkouts.getWODs)

const generateValidWorkoutsList = (): Workout[] => {
	return getWODs.value.filter(workout => workout.time <= time.value)
}

const generateWorkout = () => {
	if (!time.value) return getWODs.value
	const validList = generateValidWorkoutsList()
	if (validList.length > 0) {
		storeWorkouts.selectWorkout(
			validList[Math.floor(Math.random() * validList.length)].id
		)
		router.push({ name: 'WorkoutView' })
	} else {
		emit(
			'show-snackbar',
			'There is no workout with less than ' + time.value + ' minutes.'
		)
	}
}
</script>

<style scoped lang="css">
.go-btn {
	margin-top: 10px;
}

.v-text-field :deep(input::-webkit-outer-spin-button),
.v-text-field :deep(input::-webkit-inner-spin-button) {
	appearance: none !important;
	-webkit-appearance: none !important;
	-moz-appearance: none !important;
}
</style>
