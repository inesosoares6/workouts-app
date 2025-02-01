<template>
	<v-container>
		<v-text-field
			v-model="search"
			class="mb-4"
			label="Pesquisa"
			prepend-inner-icon="mdi-magnify"
			variant="outlined"
			clearable
			hide-details
			single-line
		/>
		<ListByTypes v-if="!search && storeApp.groupByType" />
		<ListWorkouts
			v-else
			:list="workoutsFiltered"
		/>

		<div class="floating-button">
			<v-btn
				style="pointer-events: all"
				icon
				size="small"
				color="primary"
			>
				<v-icon>mdi-plus</v-icon>
				<AddWorkout />
			</v-btn>
		</div>

		<NotificationToast
			v-if="snackbar"
			:timeout="2000"
			text="Add workouts"
			@close="snackbar = false"
		/>
	</v-container>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'
import { useStoreApp } from '@/stores/app'
import { Workout } from '@/types/WorkoutsTypes'

const storeApp = useStoreApp()
const storeWorkouts = useStoreWorkouts()

const snackbar = ref(false)
const search = ref('')

const allWorkouts = computed(() => storeWorkouts.allWorkouts)
const workoutsFiltered: ComputedRef<Workout[]> = computed(() => {
	if (!allWorkouts.value?.length) return []
	if (!search.value?.length) return allWorkouts.value

	let searchData = search.value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/ /g, ')(?=.*')
	searchData = '(?=.*' + searchData + ').*'
	const regexToSearch = new RegExp(searchData, 'gi')

	return allWorkouts.value?.filter((e: Workout) => {
		return (e.name + ' ' + e.type + ' ' + e.exercises)
			.toString()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.match(regexToSearch)
	})
})

onMounted(() => {
	snackbar.value = !storeWorkouts.allWorkouts.length
})

onBeforeMount(() => {
	window.scrollTo(0, 0)
})
</script>

<style scoped lang="css">
.floating-button {
	position: fixed;
	bottom: 75px;
	left: 50%;
	z-index: 10;
	pointer-events: none;
	transform: translate(-50%, 0%);
}
</style>
