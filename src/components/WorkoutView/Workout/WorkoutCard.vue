<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
	<v-card
		v-if="currentWorkout !== undefined"
		:title="currentWorkout.name"
	>
		<template v-slot:subtitle>
			{{ currentWorkout.type + ' - ' + currentWorkout.time + ' min' }}
			<EditWorkout
				v-bind:workout="currentWorkout"
				v-bind:id="storeWorkouts.currentWorkoutId"
			/>
		</template>
		<template v-slot:prepend>
			<v-icon
				size="small"
				color="secondary"
			>
				mdi-weight-lifter
			</v-icon>
		</template>
		<template v-slot:append>
			<v-checkbox
				v-model="checkbox"
				label="Done"
				hide-details
				@change="updateWorkout"
			/>
		</template>
		<v-divider />
		<v-col>
			<v-btn
				class="details-button"
				icon
				flat
				size="small"
			>
				<v-icon>mdi-dots-vertical</v-icon>
				<WorkoutDetails :workout="currentWorkout" />
			</v-btn>
		</v-col>
		<v-card-text
			class="text-center"
			style="font-size: 20px"
			v-html="currentWorkout.exercises.replaceAll('\n', '<br/>')"
		/>
		<v-col>
			<v-btn
				class="floating-button"
				flat
				icon
				size="small"
				@click="copyWorkout"
			>
				<v-icon color="secondary">mdi-content-copy</v-icon>
			</v-btn>
		</v-col>
	</v-card>

	<NotificationToast
		v-if="snackbar"
		:timeout="2000"
		:text="text"
		@close="snackbar = false"
	/>
</template>

<script setup lang="ts">
import { Clipboard } from '@capacitor/clipboard'
import { useStoreApp } from '@/stores/app'
import { useStoreWorkouts } from '@/stores/workouts'

const storeWorkouts = useStoreWorkouts()

const checkbox = ref(false)
const snackbar = ref(false)
const text = ref('')

const currentWorkout = computed(() => storeWorkouts.getCurrentWorkout)

const createStringWorkout = () => {
	return (
		currentWorkout.value.name +
		'\n' +
		currentWorkout.value.type +
		' - ' +
		currentWorkout.value.time +
		' min' +
		'\n-------------\n' +
		currentWorkout.value.exercises
	)
}

const copyWorkout = () => {
	Clipboard.write({
		string: createStringWorkout()
	})
	snackbar.value = true
	text.value = 'Copied workout to clipboard'
}

const updateWorkout = () => {
	if (checkbox.value) {
		storeWorkouts.updateWorkout({
			id: storeWorkouts.currentWorkoutId,
			updates: {
				completions: currentWorkout.value.completions + 1
			}
		})
		const storeApp = useStoreApp()
		storeApp.updateTimeline(
			new Date().toDateString().substring(0, 3),
			storeWorkouts.currentWorkoutId
		)
	}
}

onMounted(() => {
	snackbar.value = currentWorkout.value === undefined
	text.value = 'No workout selected'
})
</script>

<style scoped lang="css">
.floating-button {
	position: absolute;
	bottom: 5px;
	right: 5px;
}

.details-button {
	position: absolute;
	top: 100px;
	left: 5px;
}
</style>
