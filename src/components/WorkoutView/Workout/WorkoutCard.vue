<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
	<v-card v-if="currentWorkout">
		<template v-slot:title>
			{{ currentWorkout.name }}
		</template>
		<template v-slot:subtitle>
			{{ `${currentWorkout.type} - ${currentWorkout.time} min` }}
			<EditWorkout :workout="currentWorkout" />
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
				@change="updateWorkoutCompletions"
			/>
		</template>
		<v-divider />
		<v-col>
			<v-menu v-model="menu">
				<template v-slot:activator="{ props }">
					<v-btn
						style="position: absolute; top: 100px; left: 5px"
						icon
						flat
						size="small"
						v-bind="props"
					>
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item
						v-for="(item, index) in menuList"
						:key="index"
					>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
						<component
							:is="item.component"
							:workout="currentWorkout"
							@done="menu = false"
						/>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-col>
		<v-card-text
			class="text-center"
			style="font-size: 20px"
			v-html="currentWorkout.exercises.replaceAll('\n', '<br/>')"
		/>
		<v-col>
			<v-btn
				style="position: absolute; bottom: 5px; right: 5px"
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
import WorkoutDetails from '@/components/WorkoutView/pop-ups/WorkoutDetails.vue'
import EditWorkout from '@/components/AllView/pop-ups/EditWorkout.vue'
import MarkAsDone from '@/components/WorkoutView/pop-ups/MarkAsDone.vue'

const storeWorkouts = useStoreWorkouts()
const storeApp = useStoreApp()

const checkbox = ref(false)
const snackbar = ref(false)
const text = ref('')
const menu = ref(false)

const currentWorkout = computed(() => storeWorkouts.getCurrentWorkout)

const menuList = shallowRef([
	{
		title: 'Show Details',
		component: WorkoutDetails
	},
	{
		title: 'Edit Workout',
		component: EditWorkout
	},
	{
		title: 'Mark As Done',
		component: MarkAsDone
	}
])

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

const updateWorkoutCompletions = () => {
	if (checkbox.value) {
		storeWorkouts.updateWorkout({
			id: storeWorkouts.currentWorkoutId,
			updates: {
				completions: currentWorkout.value.completions + 1
			}
		})
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
